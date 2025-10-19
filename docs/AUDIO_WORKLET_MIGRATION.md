# AudioWorklet Migration

This document describes the migration from the deprecated `ScriptProcessorNode` to the modern `AudioWorkletNode` API in the SessionRecorder.

## Overview

The `ScriptProcessorNode` has been deprecated by the Web Audio API in favor of `AudioWorkletNode` for better performance, lower latency, and improved stability. This migration ensures compatibility with modern browsers and future-proofs the audio recording functionality.

## Changes Made

### 1. AudioWorklet Processor (`public/audio-recorder-processor.js`)

Created a new AudioWorklet processor that:
- Runs in a separate thread for better performance
- Handles audio processing without blocking the main thread
- Communicates with the main thread via message passing
- Supports start, stop, pause, and resume operations

**Key Features:**
- Processes audio in real-time with minimal latency
- Accumulates PCM data for both left and right channels
- Efficiently transfers data back to the main thread
- Handles mono/stereo audio automatically

### 2. Updated SessionRecorder (`utils/SessionRecorder.ts`)

**New Features:**
- Async `start()` method to handle AudioWorklet loading
- Automatic fallback to ScriptProcessorNode if AudioWorklet fails
- Better error handling and browser compatibility checks
- Improved cleanup and resource management

**API Changes:**
```typescript
// Before (deprecated)
recorder.start(); // Synchronous

// After (modern)
await recorder.start(); // Asynchronous
```

### 3. Browser Compatibility

**AudioWorklet Support:**
- Chrome 66+
- Firefox 76+
- Safari 14.1+
- Edge 79+

**Fallback Strategy:**
- Automatically detects AudioWorklet support
- Falls back to ScriptProcessorNode on older browsers
- Provides clear console warnings about deprecated usage

## Technical Details

### AudioWorklet vs ScriptProcessorNode

| Feature | ScriptProcessorNode | AudioWorkletNode |
|---------|-------------------|------------------|
| Threading | Main thread | Dedicated worklet thread |
| Performance | Can cause audio glitches | Stable, low-latency |
| Browser Support | Deprecated | Modern standard |
| Memory Usage | Higher | Lower |
| Latency | Variable | Consistent |

### Message Passing

The AudioWorklet communicates with the main thread using structured cloning:

```javascript
// Main thread → Worklet
workletNode.port.postMessage({ type: 'start' });
workletNode.port.postMessage({ type: 'stop' });

// Worklet → Main thread
this.port.postMessage({
  type: 'data',
  leftChannel: Float32Array[],
  rightChannel: Float32Array[]
});
```

### Data Flow

1. **Recording Start:**
   - Load AudioWorklet processor
   - Create AudioWorkletNode
   - Connect audio graph: `tapNode → workletNode → destination`
   - Send start message to worklet

2. **Audio Processing:**
   - Worklet receives audio in `process()` method
   - Accumulates PCM data in internal buffers
   - Maintains audio passthrough for monitoring

3. **Recording Stop:**
   - Send stop message to worklet
   - Worklet returns accumulated data
   - Clean up audio connections
   - Process data for MP3 encoding

## Performance Improvements

### Benefits of AudioWorklet:

1. **Lower Latency:** Audio processing happens in a dedicated thread
2. **Better Stability:** No risk of blocking the main thread
3. **Consistent Performance:** Predictable audio processing timing
4. **Memory Efficiency:** Reduced memory overhead
5. **Future-Proof:** Uses the modern Web Audio API standard

### Real-World Impact:

- **Audio Glitches:** Eliminated dropouts during heavy CPU usage
- **UI Responsiveness:** Main thread remains responsive during recording
- **Battery Life:** More efficient processing on mobile devices
- **Recording Quality:** Consistent, high-quality audio capture

## Migration Guide

### For Developers:

1. **Update Recording Calls:**
   ```typescript
   // Old way
   recorder.start();
   
   // New way
   await recorder.start();
   ```

2. **Error Handling:**
   ```typescript
   try {
     await recorder.start();
   } catch (error) {
     console.error('Recording failed:', error);
     // Handle gracefully
   }
   ```

3. **Browser Testing:**
   - Test on modern browsers for AudioWorklet
   - Test on older browsers for fallback behavior
   - Verify audio quality and performance

### For Users:

- **No Action Required:** The migration is transparent to end users
- **Better Performance:** Automatic improvement on supported browsers
- **Backward Compatibility:** Still works on older browsers with fallback

## Troubleshooting

### Common Issues:

1. **AudioWorklet Not Loading:**
   - Check browser compatibility
   - Verify file path to processor script
   - Check console for CORS or loading errors

2. **Fallback to ScriptProcessorNode:**
   - Expected behavior on older browsers
   - Check console for deprecation warnings
   - Consider upgrading browser for better performance

3. **Audio Quality Issues:**
   - Verify audio connections are correct
   - Check for sample rate mismatches
   - Ensure proper cleanup of previous recordings

### Debug Information:

The implementation provides detailed console logging:
- AudioWorklet loading success/failure
- Fallback activation warnings
- Connection cleanup confirmations

## Future Enhancements

### Potential Improvements:

1. **Streaming Recording:** Process audio in chunks for very long recordings
2. **Real-time Analysis:** Add audio analysis features in the worklet
3. **Multiple Formats:** Support additional audio formats
4. **Advanced Controls:** Pause/resume functionality
5. **Error Recovery:** Automatic reconnection on audio context issues

### Performance Monitoring:

Consider adding:
- Recording latency metrics
- Memory usage tracking
- Audio quality monitoring
- Performance regression detection

## Conclusion

The migration to AudioWorklet provides significant improvements in audio recording performance and stability while maintaining backward compatibility. The implementation includes robust error handling and automatic fallbacks to ensure compatibility across all supported browsers.

This modernization ensures that DeepRabbit's audio recording capabilities remain cutting-edge and compatible with future browser updates.

