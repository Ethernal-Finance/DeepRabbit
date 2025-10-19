/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class SessionRecorder {
  private readonly audioContext: AudioContext;
  private readonly tapNode: AudioNode;
  private mediaDest: MediaStreamAudioDestinationNode | null = null;
  private recorder: MediaRecorder | null = null;
  private chunks: BlobPart[] = [];
  private mimeType: string;
  private asMp3: boolean;
  private audioWorkletNode: AudioWorkletNode | null = null;
  private pcmLeft: Float32Array[] = [];
  private pcmRight: Float32Array[] = [];
  private wavBuffer: AudioBuffer | null = null;
  private workletLoaded: boolean = false;

  constructor(audioContext: AudioContext, tapNode: AudioNode, mimeType: string = 'audio/webm;codecs=opus', asMp3 = false) {
    this.audioContext = audioContext;
    this.tapNode = tapNode;
    this.mimeType = MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'audio/webm';
    this.asMp3 = asMp3;
  }

  private async loadAudioWorklet(): Promise<void> {
    if (this.workletLoaded) return;
    
    // Check if AudioWorklet is supported
    if (!this.audioContext.audioWorklet) {
      throw new Error('AudioWorklet not supported in this browser');
    }
    
    try {
      await this.audioContext.audioWorklet.addModule('/audio-recorder-processor.js');
      this.workletLoaded = true;
      console.log('AudioWorklet loaded successfully');
    } catch (error) {
      console.error('Failed to load AudioWorklet:', error);
      throw new Error(`AudioWorklet failed to load: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async start(): Promise<void> {
    if (this.asMp3) {
      if (this.audioWorkletNode) return;
      
      try {
        // Load AudioWorklet if not already loaded
        await this.loadAudioWorklet();
        
        // Create AudioWorkletNode
        this.audioWorkletNode = new AudioWorkletNode(this.audioContext, 'audio-recorder-processor');
        
        // Set up message handling from the worklet
        this.audioWorkletNode.port.onmessage = (event) => {
          const { type, leftChannel, rightChannel } = event.data;
          
          if (type === 'data') {
            this.pcmLeft = leftChannel || [];
            this.pcmRight = rightChannel || [];
          }
        };
        
        // Clear previous data
        this.pcmLeft = [];
        this.pcmRight = [];
        
        // Connect tap to worklet; connect worklet to destination to keep it alive
        this.tapNode.connect(this.audioWorkletNode);
        this.audioWorkletNode.connect(this.audioContext.destination);
        
        // Start recording
        this.audioWorkletNode.port.postMessage({ type: 'start' });
        
      } catch (error) {
        console.error('Failed to start AudioWorklet recording:', error);
        // Fallback to ScriptProcessorNode if AudioWorklet fails
        console.warn('Falling back to legacy ScriptProcessorNode recording');
        this.startLegacyRecording();
      }
      return;
    }
    
    // Default: record via MediaRecorder (WebM/Opus)
    if (this.recorder) return;
    this.mediaDest = this.audioContext.createMediaStreamDestination();
    this.tapNode.connect(this.mediaDest);
    this.recorder = new MediaRecorder(this.mediaDest.stream, { mimeType: this.mimeType });
    this.chunks = [];
    this.recorder.ondataavailable = (e) => { if (e.data && e.data.size > 0) this.chunks.push(e.data); };
    this.recorder.start();
  }

  private startLegacyRecording(): void {
    // Fallback to deprecated ScriptProcessorNode if AudioWorklet is not available
    console.warn('Using deprecated ScriptProcessorNode as fallback. AudioWorklet not available.');
    
    const bufferSize = 4096;
    const channels = 2;
    // @ts-ignore - deprecated in TS but still available in browsers
    const scriptNode = this.audioContext.createScriptProcessor(bufferSize, channels, channels);
    this.pcmLeft = [];
    this.pcmRight = [];
    
    scriptNode.onaudioprocess = (e: AudioProcessingEvent) => {
      const input = e.inputBuffer;
      const left = new Float32Array(input.getChannelData(0));
      const right = input.numberOfChannels > 1 ? new Float32Array(input.getChannelData(1)) : new Float32Array(left);
      this.pcmLeft.push(left);
      this.pcmRight.push(right);
      this.wavBuffer = input;
    };
    
    this.tapNode.connect(scriptNode);
    scriptNode.connect(this.audioContext.destination);
    
    // Store reference for cleanup
    (this as any).scriptNode = scriptNode;
  }

  public async stop(): Promise<Blob> {
    // MP3 path using PCM capture
    if (this.asMp3) {
      if (this.audioWorkletNode) {
        // Stop the worklet and get final data
        this.audioWorkletNode.port.postMessage({ type: 'stop' });
        
        // Wait a moment for the worklet to send the final data
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Clean up connections
        try { this.tapNode.disconnect(this.audioWorkletNode); } catch {}
        try { this.audioWorkletNode.disconnect(); } catch {}
        this.audioWorkletNode = null;
      } else if ((this as any).scriptNode) {
        // Legacy ScriptProcessorNode cleanup
        const scriptNode = (this as any).scriptNode;
        try { this.tapNode.disconnect(scriptNode); } catch {}
        try { scriptNode.disconnect(); } catch {}
        scriptNode.onaudioprocess = null as any;
        (this as any).scriptNode = null;
      } else {
        throw new Error('Recorder not started');
      }
      
      const left = concatFloat32(this.pcmLeft);
      const right = concatFloat32(this.pcmRight);
      this.pcmLeft = [];
      this.pcmRight = [];
      const lame = await loadLameLib();
      const mp3Blob = encodeStereoToMp3(left, right, this.audioContext.sampleRate, lame);
      return mp3Blob;
    }
    
    // WebM path
    if (!this.recorder) throw new Error('Recorder not started');
    const recorder = this.recorder;
    const dest = this.mediaDest;
    const finished = new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
    });
    recorder.stop();
    await finished;
    try { this.tapNode.disconnect(dest); } catch {}
    this.recorder = null;
    this.mediaDest = null;
    return new Blob(this.chunks, { type: this.mimeType });
  }
}

function concatFloat32(chunks: Float32Array[]): Float32Array {
  let total = 0; for (const c of chunks) total += c.length;
  const out = new Float32Array(total);
  let offset = 0; for (const c of chunks) { out.set(c, offset); offset += c.length; }
  return out;
}

function encodeStereoToMp3(left: Float32Array, right: Float32Array, sampleRate: number, lame: any): Blob {
  const Mp3Encoder = (lame as any).Mp3Encoder || (lame.default && (lame.default as any).Mp3Encoder);
  if (!Mp3Encoder) throw new Error('MP3 encoder not available');
  const mp3encoder = new Mp3Encoder(2, sampleRate, 128);
  const blockSize = 1152;
  const mp3Data: Uint8Array[] = [] as any;
  let i = 0;
  // Ensure equal lengths
  const len = Math.min(left.length, right.length);
  while (i < len) {
    const lChunk = floatTo16(left.subarray(i, i + blockSize));
    const rChunk = floatTo16(right.subarray(i, i + blockSize));
    const mp3buf = mp3encoder.encodeBuffer(lChunk, rChunk);
    if (mp3buf.length > 0) mp3Data.push(mp3buf);
    i += blockSize;
  }
  const end = mp3encoder.flush();
  if (end.length > 0) mp3Data.push(end);
  return new Blob(mp3Data, { type: 'audio/mpeg' });
}

function floatTo16(input: Float32Array): Int16Array {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    let s = Math.max(-1, Math.min(1, input[i]));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return out;
}

async function loadLameLib(): Promise<any> {
  const w = window as any;
  if (w.lamejs) return w.lamejs;
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/lamejs@1.2.0/lame.min.js';
    s.onload = () => resolve((window as any).lamejs);
    s.onerror = (e) => reject(new Error('Failed to load MP3 encoder'));
    document.head.appendChild(s);
  });
}

// Utility: Export a WebAudio AudioBuffer to 16-bit PCM WAV Blob
export function exportWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const numFrames = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = numFrames * blockAlign;
  const headerSize = 44;
  const totalSize = headerSize + dataSize;
  const ab = new ArrayBuffer(totalSize);
  const view = new DataView(ab);

  function writeString(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  }

  let offset = 0;
  writeString(offset, 'RIFF'); offset += 4;
  view.setUint32(offset, totalSize - 8, true); offset += 4;
  writeString(offset, 'WAVE'); offset += 4;
  writeString(offset, 'fmt '); offset += 4;
  view.setUint32(offset, 16, true); offset += 4; // Subchunk1Size
  view.setUint16(offset, 1, true); offset += 2;  // PCM
  view.setUint16(offset, numChannels, true); offset += 2;
  view.setUint32(offset, sampleRate, true); offset += 4;
  view.setUint32(offset, sampleRate * blockAlign, true); offset += 4; // byteRate
  view.setUint16(offset, blockAlign, true); offset += 2;
  view.setUint16(offset, bytesPerSample * 8, true); offset += 2;
  writeString(offset, 'data'); offset += 4;
  view.setUint32(offset, dataSize, true); offset += 4;

  // Interleave and write PCM16
  const channelData: Float32Array[] = [];
  for (let ch = 0; ch < numChannels; ch++) channelData[ch] = buffer.getChannelData(ch);
  let writePtr = headerSize;
  for (let i = 0; i < numFrames; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      let sample = channelData[ch][i];
      sample = Math.max(-1, Math.min(1, sample));
      view.setInt16(writePtr, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      writePtr += 2;
    }
  }
  return new Blob([ab], { type: 'audio/wav' });
}

export async function exportMp3(audioBuffer: AudioBuffer, kbps = 192): Promise<Blob> {
  const left = audioBuffer.getChannelData(0);
  const right = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : left;
  const lame = await loadLameLib();
  const Mp3Encoder = (lame as any).Mp3Encoder || (lame.default && (lame.default as any).Mp3Encoder);
  if (!Mp3Encoder) throw new Error('MP3 encoder not available');
  const mp3encoder = new Mp3Encoder(2, audioBuffer.sampleRate, kbps);
  const blockSize = 1152;
  const mp3Data: Uint8Array[] = [] as any;
  let i = 0;
  const len = Math.min(left.length, right.length);
  while (i < len) {
    const lChunk = floatTo16(new Float32Array(left.subarray(i, i + blockSize)));
    const rChunk = floatTo16(new Float32Array(right.subarray(i, i + blockSize)));
    const mp3buf = mp3encoder.encodeBuffer(lChunk, rChunk);
    if (mp3buf.length > 0) mp3Data.push(mp3buf);
    i += blockSize;
  }
  const end = mp3encoder.flush();
  if (end.length > 0) mp3Data.push(end);
  return new Blob(mp3Data, { type: 'audio/mpeg' });
}


