/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import {Blob} from '@google/genai';

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(audioData: Uint8Array, audioContext: AudioContext, sampleRate: number = 48000, channels: number = 2): Promise<AudioBuffer> {
  try {
    // Ensure audio context is running
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    
    // Debug: Log audio data info
    console.log('Audio data info:', {
      length: audioData.length,
      byteOffset: audioData.byteOffset,
      byteLength: audioData.byteLength,
      firstBytes: Array.from(audioData.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' '),
      audioContextState: audioContext.state
    });
    
    // Check if data looks like valid audio (has common audio file headers)
    const firstBytes = Array.from(audioData.slice(0, 4));
    const isLikelyAudio = firstBytes[0] === 0x52 && firstBytes[1] === 0x49 && firstBytes[2] === 0x46 && firstBytes[3] === 0x46 || // RIFF
                         firstBytes[0] === 0xFF && (firstBytes[1] === 0xFB || firstBytes[1] === 0xFA) || // MP3
                         firstBytes[0] === 0x4F && firstBytes[1] === 0x67 && firstBytes[2] === 0x67 && firstBytes[3] === 0x53; // OggS
    
    if (!isLikelyAudio && audioData.length > 0) {
      console.log('Raw PCM audio data detected, creating AudioBuffer directly');
      
      // This is raw PCM data from Google GenAI - create AudioBuffer directly
      const samplesPerChannel = audioData.length / (channels * 2); // 16-bit samples (2 bytes per sample)
      const buffer = audioContext.createBuffer(channels, samplesPerChannel, sampleRate);
      
      // Convert raw bytes to float32 samples
      const dataView = new DataView(audioData.buffer, audioData.byteOffset, audioData.byteLength);
      for (let channel = 0; channel < channels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < samplesPerChannel; i++) {
          // Read 16-bit signed integer and convert to float32 (-1.0 to 1.0)
          const sample = dataView.getInt16((i * channels + channel) * 2, true); // little-endian
          channelData[i] = sample / 32768.0; // Convert to float32 range
        }
      }
      
      console.log('Successfully created AudioBuffer from raw PCM data:', {
        channels: buffer.numberOfChannels,
        length: buffer.length,
        sampleRate: buffer.sampleRate,
        duration: buffer.duration
      });
      
      return buffer;
    }
    
    // Try to decode as audio file (WAV, MP3, etc.)
    return await audioContext.decodeAudioData(audioData.buffer.slice(audioData.byteOffset, audioData.byteOffset + audioData.byteLength));
  } catch (error) {
    console.warn('Failed to decode audio data:', error);
    console.warn('Audio data length:', audioData.length, 'bytes');
    // Create a silent buffer as fallback
    const buffer = audioContext.createBuffer(channels, sampleRate * 0.1, sampleRate); // 100ms of silence
    return buffer;
  }
}

export function createMasterLimiter(audioContext: AudioContext): DynamicsCompressorNode {
  const limiter = audioContext.createDynamicsCompressor();
  limiter.threshold.value = -3;
  limiter.knee.value = 0;
  limiter.ratio.value = 20;
  limiter.attack.value = 0.003;
  limiter.release.value = 0.1;
  return limiter;
}

export { decode };
