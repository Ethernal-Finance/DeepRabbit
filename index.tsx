/**
 * @fileoverview deeprabbit — AI-driven live music performance with MIDI control
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { PlaybackState, Prompt } from './types';
import { GoogleGenAI, LiveMusicFilteredPrompt } from '@google/genai';
import { PromptDjMidi } from './components/PromptDjMidi';
import { ToastMessage } from './components/ToastMessage';
import { LiveMusicHelper } from './utils/LiveMusicHelper';
import { AudioAnalyser } from './utils/AudioAnalyser';
import { SessionRecorder, exportMp3, exportWav } from './utils/SessionRecorder';
// Subscription gating removed

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, apiVersion: 'v1alpha' });
const model = 'lyria-realtime-exp';

function main() {
  // Start directly in the core app
  initializeMainApp();
}

async function initializeMainApp() {
  const initialPrompts = buildInitialPrompts();

  const pdjMidi = new PromptDjMidi(initialPrompts);
  document.body.appendChild(pdjMidi);

  const toastMessage = new ToastMessage();
  document.body.appendChild(toastMessage);

  // Subscription gating removed: app loads immediately

  const liveMusicHelper = new LiveMusicHelper(ai, model);
  liveMusicHelper.setWeightedPrompts(initialPrompts);
  let recorder: SessionRecorder | null = null;
  let lastRecordingBlob: Blob | null = null;

  const audioAnalyser = new AudioAnalyser(liveMusicHelper.audioContext);
  liveMusicHelper.extraDestination = audioAnalyser.node;

  pdjMidi.addEventListener('prompts-changed', ((e: Event) => {
    const customEvent = e as CustomEvent<Map<string, Prompt>>;
    const prompts = customEvent.detail;
    console.log('Main app received prompts-changed event:', prompts);
    liveMusicHelper.setWeightedPrompts(prompts);
  }));

  pdjMidi.addEventListener('play-pause', () => {
    liveMusicHelper.playPause();
  });

  pdjMidi.addEventListener('toggle-recording', async () => {
    try {
      if (!recorder) {
        recorder = new SessionRecorder(liveMusicHelper.audioContext, liveMusicHelper.recordTap, 'audio/webm;codecs=opus', true);
        recorder.start();
        (pdjMidi as any).isRecording = true;
      } else {
        const blob = await recorder.stop();
        recorder = null;
        (pdjMidi as any).isRecording = false;
        lastRecordingBlob = blob;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        const isMp3 = blob.type === 'audio/mpeg';
        a.download = `deeprabbit-${ts}.${isMp3 ? 'mp3' : 'webm'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (e: any) {
      console.error(e);
      const toast = new ToastMessage();
      document.body.appendChild(toast);
      toast.show(e.message || 'Recording error');
    }
  });

  // Export menu handling: render download based on current output tap
  pdjMidi.addEventListener('export-audio', async (e: Event) => {
    const detail = (e as CustomEvent<{ kind: 'wav' | 'mp3' }>).detail;
    try {
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      // Prefer exporting the last finished recording if available
      if (lastRecordingBlob) {
        if (detail.kind === 'mp3') {
          const url = URL.createObjectURL(lastRecordingBlob);
          const a = document.createElement('a'); a.href = url; a.download = `deeprabbit-${ts}.mp3`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        } else {
          const arrayBuf = await lastRecordingBlob.arrayBuffer();
          const audioBuf = await liveMusicHelper.audioContext.decodeAudioData(arrayBuf.slice(0));
          const wav = exportWav(audioBuf);
          const url = URL.createObjectURL(wav);
          const a = document.createElement('a'); a.href = url; a.download = `deeprabbit-${ts}.wav`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        }
        return;
      }

      // Fallback: capture a short live segment
      const tempRecorder = new SessionRecorder(liveMusicHelper.audioContext, liveMusicHelper.recordTap, 'audio/webm;codecs=opus', true);
      tempRecorder.start();
      await new Promise(r => setTimeout(r, 1500));
      const mp3Blob = await tempRecorder.stop();
      if (detail.kind === 'mp3') {
        const url = URL.createObjectURL(mp3Blob);
        const a = document.createElement('a'); a.href = url; a.download = `deeprabbit-${ts}.mp3`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      } else {
        // Convert MP3 blob to AudioBuffer is non-trivial in browser without decoder; instead, capture PCM via ScriptProcessor during recording path.
        // Fallback: decode via AudioContext
        const arrayBuf = await mp3Blob.arrayBuffer();
        const audioBuf = await liveMusicHelper.audioContext.decodeAudioData(arrayBuf.slice(0));
        const wav = exportWav(audioBuf);
        const url = URL.createObjectURL(wav);
        const a = document.createElement('a'); a.href = url; a.download = `deeprabbit-${ts}.wav`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      }
    } catch (err: any) {
      const toast = new ToastMessage();
      document.body.appendChild(toast);
      toast.show(err?.message || 'Export failed');
    }
  });

  liveMusicHelper.addEventListener('playback-state-changed', ((e: Event) => {
    const customEvent = e as CustomEvent<PlaybackState>;
    const playbackState = customEvent.detail;
    pdjMidi.playbackState = playbackState;
    playbackState === 'playing' ? audioAnalyser.start() : audioAnalyser.stop();
  }));

  liveMusicHelper.addEventListener('filtered-prompt', ((e: Event) => {
    const customEvent = e as CustomEvent<LiveMusicFilteredPrompt>;
    const filteredPrompt = customEvent.detail;
    toastMessage.show(filteredPrompt.filteredReason!)
    pdjMidi.addFilteredPrompt(filteredPrompt.text!);
  }));

  const errorToast = ((e: Event) => {
    const customEvent = e as CustomEvent<string>;
    const error = customEvent.detail;
    toastMessage.show(error);
  });

  liveMusicHelper.addEventListener('error', errorToast);
  pdjMidi.addEventListener('error', errorToast);

  audioAnalyser.addEventListener('audio-level-changed', ((e: Event) => {
    const customEvent = e as CustomEvent<number>;
    const level = customEvent.detail;
    pdjMidi.audioLevel = level;
  }));
}

function buildInitialPrompts() {
  const prompts = new Map<string, Prompt>();

  for (let i = 0; i < DEFAULT_PROMPTS.length; i++) {
    const promptId = `prompt-${i}`;
    const prompt = DEFAULT_PROMPTS[i];
    const { text, color } = prompt;
    prompts.set(promptId, {
      promptId,
      text,
      weight: 0,
      cc: 0,
      color,
    });
  }

  return prompts;
}

const DEFAULT_PROMPTS = [
  // Existing presets
  { color: '#9900ff', text: 'Bossa Nova' },
  { color: '#5200ff', text: 'Chillwave' },
  { color: '#ff25f6', text: 'Drum and Bass' },
  { color: '#2af6de', text: 'Post Punk' },
  { color: '#ffdd28', text: 'Shoegaze' },
  { color: '#2af6de', text: 'Funk' },
  { color: '#9900ff', text: 'Chiptune' },
  { color: '#3dffab', text: 'Lush Strings' },
  { color: '#d8ff3e', text: 'Sparkling Arpeggios' },
  { color: '#d9b2ff', text: 'Staccato Rhythms' },
  { color: '#3dffab', text: 'Punchy Kick' },
  { color: '#ffdd28', text: 'Dubstep' },
  { color: '#ff25f6', text: 'K Pop' },
  { color: '#d8ff3e', text: 'Neo Soul' },
  { color: '#5200ff', text: 'Trip Hop' },
  { color: '#d9b2ff', text: 'Thrash' },

  // New style prompts
  { color: '#ff6b6b', text: 'Jazz' },
  { color: '#4ecdc4', text: 'R&B' },
  { color: '#45b7d1', text: 'Hip Hop' },
  { color: '#96ceb4', text: 'House' },
  { color: '#ffeaa7', text: 'Techno' },
  { color: '#dda0dd', text: 'Ambient' },
  { color: '#ffb347', text: 'Classical' },
  { color: '#98d8c8', text: 'Reggae' },
  { color: '#9900ff', text: 'Afrobeat' },
  { color: '#5200ff', text: 'Lo-Fi' },
  { color: '#ff25f6', text: 'Trap' },
  { color: '#2af6de', text: 'Blues' },
  { color: '#ffdd28', text: 'Country' },
  { color: '#3dffab', text: 'Latin Pop' },
  { color: '#d8ff3e', text: 'Salsa' },
  { color: '#d9b2ff', text: 'Samba' },
  { color: '#ff6b6b', text: 'Trance' },
  { color: '#4ecdc4', text: 'Future Bass' },
  { color: '#45b7d1', text: 'Melodic Techno' },
  { color: '#96ceb4', text: 'Progressive House' },
  { color: '#ffeaa7', text: 'UK Garage' },
  { color: '#dda0dd', text: 'Psytrance' },
  { color: '#ffb347', text: 'Hardstyle' },
  { color: '#98d8c8', text: 'Vaporwave' },
  { color: '#9900ff', text: 'Synthwave' },
  { color: '#5200ff', text: 'City Pop' },
  { color: '#ff25f6', text: 'Disco' },
  { color: '#2af6de', text: 'Soul' },
  { color: '#ffdd28', text: 'Motown' },
  { color: '#3dffab', text: 'Bluegrass' },
  { color: '#d8ff3e', text: 'Flamenco' },
  { color: '#d9b2ff', text: 'Reggaeton' },
  { color: '#ff6b6b', text: 'Drill' },
  { color: '#4ecdc4', text: 'Grime' },
  { color: '#45b7d1', text: 'Industrial' },
  { color: '#96ceb4', text: 'IDM' },
  { color: '#ffeaa7', text: 'Glitch' },
  { color: '#dda0dd', text: 'Minimal' },
  // Additional styles
  { color: '#ffb347', text: 'Electro' },
  { color: '#98d8c8', text: 'Breakbeat' },
  { color: '#9900ff', text: 'Jungle' },
  { color: '#5200ff', text: 'Liquid DnB' },
  { color: '#ff25f6', text: 'Neurofunk' },
  { color: '#2af6de', text: 'Future Garage' },
  { color: '#ffdd28', text: 'Chillstep' },
  { color: '#3dffab', text: 'Synth Pop' },
  { color: '#d8ff3e', text: 'Indie Rock' },
  { color: '#d9b2ff', text: 'Alternative Rock' },
  { color: '#ff6b6b', text: 'Progressive Rock' },
  { color: '#4ecdc4', text: 'Math Rock' },
  { color: '#45b7d1', text: 'Post Rock' },
  { color: '#96ceb4', text: 'Cinematic' },
  { color: '#ffeaa7', text: 'Trailer Music' },
  { color: '#dda0dd', text: 'Epic Orchestral' },
  { color: '#ffb347', text: 'Dark Ambient' },
  { color: '#98d8c8', text: 'Drone' },
  { color: '#9900ff', text: 'Hyperpop' },
  { color: '#5200ff', text: 'Glitch Hop' },
  { color: '#ff25f6', text: 'Boom Bap' },
  { color: '#2af6de', text: 'Trap Soul' },
  { color: '#ffdd28', text: 'Cloud Rap' },
  { color: '#3dffab', text: 'Afro House' },
  { color: '#d8ff3e', text: 'Amapiano' },
  { color: '#d9b2ff', text: 'Gqom' },
  { color: '#ff6b6b', text: 'Dancehall' },
  { color: '#4ecdc4', text: 'Ska' },
  { color: '#45b7d1', text: 'Dub' },
  { color: '#96ceb4', text: 'Moombahton' },
  { color: '#ffeaa7', text: 'Cumbia' },
  { color: '#dda0dd', text: 'Bachata' },
  { color: '#ffb347', text: 'Merengue' },
  { color: '#98d8c8', text: 'Zouk' },
  { color: '#9900ff', text: 'Kizomba' },
  { color: '#5200ff', text: 'Uplifting Trance' },
  { color: '#ff25f6', text: 'Tech Trance' },
  { color: '#2af6de', text: 'Hard Trance' },
  { color: '#ffdd28', text: 'Big Room' },
  { color: '#3dffab', text: 'Deep House' },
  { color: '#d8ff3e', text: 'Tech House' },
  { color: '#d9b2ff', text: 'Hard Techno' },
  { color: '#ff6b6b', text: 'Microhouse' },
  { color: '#4ecdc4', text: 'Electro Swing' },
  { color: '#45b7d1', text: 'Bollywood' },
  { color: '#96ceb4', text: 'Celtic Folk' },
  { color: '#ffeaa7', text: 'Americana' },
  { color: '#c19a6b', text: 'Western' },
  { color: '#dda0dd', text: 'Delta Blues' },
  { color: '#ffb347', text: 'Chicago Blues' },
  { color: '#98d8c8', text: 'Smooth Jazz' },
  { color: '#9900ff', text: 'Bebop' },
  { color: '#5200ff', text: 'Swing' },
  { color: '#ff25f6', text: 'Latin Jazz' },
  { color: '#2af6de', text: 'Baroque' },
  { color: '#ffdd28', text: 'Orchestral Suite' },
  { color: '#3dffab', text: 'Choir' },
  { color: '#d8ff3e', text: 'Gregorian' },
  { color: '#d9b2ff', text: 'Middle Eastern' },
  { color: '#ff6b6b', text: 'Japanese Instrumental' },
];

main();
