import React, { useEffect, useRef } from 'react';
import { GoogleGenAI, LiveMusicFilteredPrompt } from '@google/genai';
import type { PlaybackState, Prompt, GeneratorSettings } from '../../types';
import { PromptDjMidi } from '../../components/PromptDjMidi';
import { ToastMessage } from '../../components/ToastMessage';
import { LiveMusicHelper } from '../../utils/LiveMusicHelper';
import { AudioAnalyser } from '../../utils/AudioAnalyser';
import { SessionRecorder, exportMp3, exportWav } from '../../utils/SessionRecorder';
import { authService, type User } from '../../utils/AuthService';
import '../../components/AuthModal';
import '../../components/UserProfile';

import { DEFAULT_STYLES } from '../data/defaultStyles';

const DEFAULT_PROMPTS = DEFAULT_STYLES;

export const AppPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initApp = async () => {
      // Use hardcoded Gemini API key
      const ai = new GoogleGenAI({ apiKey: "AIzaSyBhSTd6I9FPus_va06FjeC9N6gaDSanwMQ", apiVersion: 'v1alpha' });

      const model = 'lyria-realtime-exp';

      // Initialize main app
      let userId = '';
      let userEmail = '';
      let currentUser: User | null = null;
      let showAuthOnLoad = false;

      // Check URL parameters for auth trigger
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('auth') === 'true' || urlParams.get('login') === 'true') {
        showAuthOnLoad = true;
      }

      try {
        const isAuth = await authService.isAuthenticated();
        if (isAuth) {
          const userResponse = await authService.getCurrentUser();
          currentUser = userResponse.user;
          userId = currentUser.id.toString();
          userEmail = currentUser.email;
        }
      } catch (error) {
        console.log('User not authenticated:', error);
      }

      const initialPrompts = buildInitialPrompts();
      const pdjMidi = new PromptDjMidi(initialPrompts);
      pdjMidi.userId = userId;
      pdjMidi.userEmail = userEmail;
      pdjMidi.currentUser = currentUser;

      if (showAuthOnLoad && !currentUser) {
        pdjMidi.showAuthModal = true;
      }

      if (containerRef.current) {
        containerRef.current.appendChild(pdjMidi);
      }

      const toastMessage = new ToastMessage();
      if (containerRef.current) {
        containerRef.current.appendChild(toastMessage);
      }

      const liveMusicHelper = new LiveMusicHelper(ai, model);
      liveMusicHelper.setWeightedPrompts(initialPrompts);

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
        liveMusicHelper.setWeightedPrompts(prompts);
      }) as EventListener);

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
          toastMessage.show(e.message || 'Recording error');
        }
      });

      pdjMidi.addEventListener('export-audio', async (e: Event) => {
        const detail = (e as CustomEvent<{ kind: 'wav' | 'mp3' }>).detail;
        try {
          const ts = new Date().toISOString().replace(/[:.]/g, '-');
          if (lastRecordingBlob) {
            if (detail.kind === 'mp3') {
              const url = URL.createObjectURL(lastRecordingBlob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `deeprabbit-${ts}.mp3`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            } else {
              const arrayBuf = await lastRecordingBlob.arrayBuffer();
              const audioBuf = await liveMusicHelper.audioContext.decodeAudioData(arrayBuf.slice(0));
              const wav = exportWav(audioBuf);
              const url = URL.createObjectURL(wav);
              const a = document.createElement('a');
              a.href = url;
              a.download = `deeprabbit-${ts}.wav`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
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
            const a = document.createElement('a');
            a.href = url;
            a.download = `deeprabbit-${ts}.mp3`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          } else {
            const arrayBuf = await mp3Blob.arrayBuffer();
            const audioBuf = await liveMusicHelper.audioContext.decodeAudioData(arrayBuf.slice(0));
            const wav = exportWav(audioBuf);
            const url = URL.createObjectURL(wav);
            const a = document.createElement('a');
            a.href = url;
            a.download = `deeprabbit-${ts}.wav`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        } catch (err: any) {
          toastMessage.show(err?.message || 'Export failed');
        }
      });

      liveMusicHelper.addEventListener('playback-state-changed', ((e: Event) => {
        const customEvent = e as CustomEvent<PlaybackState>;
        const playbackState = customEvent.detail;
        pdjMidi.playbackState = playbackState;
        playbackState === 'playing' ? audioAnalyser.start() : audioAnalyser.stop();
      }) as EventListener);

      pdjMidi.addEventListener('generator-settings-changed', ((e: Event) => {
        const settings = (e as CustomEvent<GeneratorSettings>).detail;
        liveMusicHelper.setGeneratorSettings(settings);
      }) as EventListener);

      liveMusicHelper.addEventListener('filtered-prompt', ((e: Event) => {
        const customEvent = e as CustomEvent<LiveMusicFilteredPrompt>;
        const filteredPrompt = customEvent.detail;
        toastMessage.show(filteredPrompt.filteredReason!)
        pdjMidi.addFilteredPrompt(filteredPrompt.text!);
      }) as EventListener);

      const errorToast = ((e: Event) => {
        const customEvent = e as CustomEvent<string>;
        const error = customEvent.detail;
        toastMessage.show(error);
      }) as EventListener;

      liveMusicHelper.addEventListener('error', errorToast);
      pdjMidi.addEventListener('error', errorToast);

      audioAnalyser.addEventListener('audio-level-changed', ((e: Event) => {
        const customEvent = e as CustomEvent<number>;
        const level = customEvent.detail;
        pdjMidi.audioLevel = level;
      }) as EventListener);
    };

    initApp();
  }, []);

  const renderCriticalError = (error: Error | null) => {
    const supportMessage = 'DeepRabbit is tuning up. Please reload in a moment or reach out to support@deeprabbit.net.';
    const detailMessage = error?.message && !/Missing GEMINI_API_KEY/.test(error.message)
      ? `${supportMessage} (${error.message})`
      : supportMessage;

    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div style="
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 3rem 1.5rem;
          background: radial-gradient(circle at top, rgba(41, 242, 198, 0.12), rgba(17, 24, 39, 0.92));
          color: #f8fafc;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          gap: 1.5rem;
        ">
          <h1 style="font-size: clamp(2rem, 4vw, 3rem); margin: 0;">DeepRabbit is warming up</h1>
          <p style="max-width: 32rem; line-height: 1.6; margin: 0; color: rgba(248, 250, 252, 0.85);">
            ${detailMessage}
          </p>
          <code style="
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(148, 163, 184, 0.2);
            border-radius: 8px;
            padding: 0.5rem 0.75rem;
            font-size: 0.9rem;
            color: #38bdf8;
          ">
            ${error?.message ?? 'Missing GEMINI_API_KEY'}
          </code>
        </div>
      `;
    }
  };

  const buildInitialPrompts = () => {
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
  };

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

