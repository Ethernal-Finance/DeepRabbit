/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * AudioWorklet processor for recording PCM audio data
 * Replaces the deprecated ScriptProcessorNode
 */

class AudioRecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 4096;
    this.leftChannel = [];
    this.rightChannel = [];
    this.isRecording = false;
    
    // Listen for messages from the main thread
    this.port.onmessage = (event) => {
      const { type, data } = event.data;
      
      switch (type) {
        case 'start':
          this.isRecording = true;
          this.leftChannel = [];
          this.rightChannel = [];
          break;
          
        case 'stop':
          this.isRecording = false;
          // Send accumulated data back to main thread
          // Note: In a real implementation, you might want to send data in chunks
          // to avoid memory issues with very long recordings
          this.port.postMessage({
            type: 'data',
            leftChannel: this.leftChannel,
            rightChannel: this.rightChannel
          });
          // Clear buffers after sending
          this.leftChannel = [];
          this.rightChannel = [];
          break;
          
        case 'pause':
          this.isRecording = false;
          break;
          
        case 'resume':
          this.isRecording = true;
          break;
      }
    };
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    
    if (input && input.length > 0 && this.isRecording) {
      const left = input[0]; // Left channel
      const right = input[1] || left; // Right channel (mono fallback)
      
      // Copy audio data to our buffers
      this.leftChannel.push(new Float32Array(left));
      this.rightChannel.push(new Float32Array(right));
    }
    
    // Always pass through the audio (don't modify it)
    if (outputs[0]) {
      for (let channel = 0; channel < input.length; channel++) {
        if (outputs[0][channel]) {
          outputs[0][channel].set(input[channel]);
        }
      }
    }
    
    return true; // Keep the processor alive
  }
}

registerProcessor('audio-recorder-processor', AudioRecorderProcessor);
