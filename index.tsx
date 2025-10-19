/**
 * @fileoverview deeprabbit — AI-driven live music performance with MIDI control
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { PlaybackState, Prompt, GeneratorSettings } from './types';
import { GoogleGenAI, LiveMusicFilteredPrompt } from '@google/genai';
import { PromptDjMidi } from './components/PromptDjMidi';
import { ToastMessage } from './components/ToastMessage';
import { LiveMusicHelper } from './utils/LiveMusicHelper';
import { AudioAnalyser } from './utils/AudioAnalyser';
import { SessionRecorder, exportMp3, exportWav } from './utils/SessionRecorder';
import { createClient } from '@supabase/supabase-js';
// Subscription gating removed

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, apiVersion: 'v1alpha' });
const model = 'lyria-realtime-exp';
const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = (VITE_SUPABASE_URL && VITE_SUPABASE_ANON_KEY)
  ? createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
  : null as any;

function main() {
  // Start directly in the core app
  initializeMainApp();
}

async function initializeMainApp() {
  let userId = '';
  let userEmail = '';
  try {
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id ?? '';
      userEmail = user?.email ?? '';
    }
  } catch {}
  const initialPrompts = buildInitialPrompts();

  const pdjMidi = new PromptDjMidi(initialPrompts);
  pdjMidi.userId = userId;
  pdjMidi.userEmail = userEmail;
  document.body.appendChild(pdjMidi);

  const toastMessage = new ToastMessage();
  document.body.appendChild(toastMessage);

  const liveMusicHelper = new LiveMusicHelper(ai, model);
  liveMusicHelper.setWeightedPrompts(initialPrompts);
  // Default generator tuning to reduce repetitiveness and improve loops
  const defaultSettings: GeneratorSettings = {
    loopBars: 8,
    variation: 1.2,
    genreContrast: 1.2,
    mix: 'balanced',
  };
  liveMusicHelper.setGeneratorSettings(defaultSettings);
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
        await recorder.start();
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
      await tempRecorder.start();
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

  pdjMidi.addEventListener('generator-settings-changed', ((e: Event) => {
    const settings = (e as CustomEvent<GeneratorSettings>).detail;
    liveMusicHelper.setGeneratorSettings(settings);
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
  { color: '#d8ff3e', text: 'Sparkling Arpeggios' },
  { color: '#d9b2ff', text: 'Staccato Rhythms' },
  { color: '#3dffab', text: 'Punchy Kick' },
  { color: '#ffdd28', text: 'Dubstep' },
  { color: '#ff25f6', text: 'K Pop' },
  { color: '#d8ff3e', text: 'Neo Soul' },
  { color: '#5200ff', text: 'Trip Hop' },
  { color: '#d9b2ff', text: 'Thrash' },

  // Rock & Organic Styles
  { color: '#ff6b6b', text: 'Rock' },
  { color: '#4ecdc4', text: 'Classic Rock' },
  { color: '#45b7d1', text: 'Alternative Rock' },
  { color: '#96ceb4', text: 'Indie Rock' },
  { color: '#ffeaa7', text: 'Blues Rock' },
  { color: '#dda0dd', text: 'Folk Rock' },
  { color: '#ffb347', text: 'Acoustic Rock' },
  
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
  
  // Additional modern/trending styles
  { color: '#ff6b6b', text: 'Phonk' },
  { color: '#4ecdc4', text: 'Jersey Club' },
  { color: '#45b7d1', text: 'Baile Funk' },
  { color: '#96ceb4', text: 'UK Drill' },
  { color: '#ffeaa7', text: 'Footwork' },
  { color: '#dda0dd', text: 'Juke' },
  { color: '#ffb347', text: 'Future Rave' },
  { color: '#98d8c8', text: 'Afro Tech' },
  { color: '#9900ff', text: 'French House' },
  { color: '#5200ff', text: 'Nu Disco' },
  { color: '#ff25f6', text: 'Italo Disco' },
  { color: '#2af6de', text: 'G-House' },
  { color: '#ffdd28', text: 'Hardwave' },
  { color: '#3dffab', text: 'Eurodance' },
  { color: '#d8ff3e', text: 'Liquid Funk' },
  { color: '#d9b2ff', text: 'Dub Techno' },
  { color: '#ff6b6b', text: 'Breakcore' },
  { color: '#4ecdc4', text: 'Drill & Bass' },
  { color: '#45b7d1', text: 'Organic House' },
  { color: '#96ceb4', text: 'Melodic House' },
  { color: '#ffeaa7', text: 'Detroit Techno' },
  { color: '#dda0dd', text: 'Minimal Techno' },
  { color: '#ffb347', text: 'Lo-Fi House' },
  { color: '#98d8c8', text: 'Ambient Dub' },
  { color: '#9900ff', text: 'Vapor Trap' },
  { color: '#5200ff', text: 'Dream Pop' },
  { color: '#ff25f6', text: 'Indie Pop' },
  { color: '#2af6de', text: 'Midwest Emo' },
  { color: '#ffdd28', text: 'Kawaii Future Bass' },
  { color: '#3dffab', text: 'UK Funky' },
  { color: '#d8ff3e', text: 'Kuduro' },
  { color: '#d9b2ff', text: 'Batida' },
  { color: '#c19a6b', text: 'Neoclassical' },
  { color: '#ff6b6b', text: 'Dark Trap' },
  { color: '#4ecdc4', text: 'Afro Trap' },
  { color: '#DC143C', text: 'Crack Music' },
  { color: '#FFD700', text: 'Quacking Synth Stabs' },
  { color: '#45b7d1', text: 'Dungeon Synth' },
  
  // Horror & Halloween
  { color: '#8B0000', text: 'Horror Score' },
  { color: '#4A0E4E', text: 'Gothic Horror' },
  { color: '#2F1B14', text: 'Haunted House' },
  { color: '#8B4513', text: 'Witchcraft' },
  { color: '#2F4F4F', text: 'Zombie Apocalypse' },
  { color: '#800080', text: 'Vampire Ball' },
  { color: '#556B2F', text: 'Werewolf Howl' },
  { color: '#DC143C', text: 'Slasher Film' },
  { color: '#483D8B', text: 'Ghostly Whispers' },
  { color: '#8B008B', text: 'Dark Ritual' },
  { color: '#B22222', text: 'Demonic Chant' },
  { color: '#2E8B57', text: 'Cursed Forest' },
  { color: '#FF6347', text: 'Pumpkin Patch' },
  { color: '#FF8C00', text: 'Halloween Party' },
  { color: '#9932CC', text: 'Witch\'s Brew' },
  { color: '#8B0000', text: 'Blood Moon' },
  { color: '#696969', text: 'Graveyard Shift' },
  { color: '#FFD700', text: 'Spooky Jazz' },
  
  // Seasonal
  { color: '#e84a5f', text: 'Christmas' },
];

main();
