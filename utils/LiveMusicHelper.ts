/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import type { PlaybackState, Prompt } from '../types';
import type { AudioChunk, GoogleGenAI, LiveMusicFilteredPrompt, LiveMusicServerMessage, LiveMusicSession } from '@google/genai';
import { decode, decodeAudioData, createMasterLimiter } from './audio';
import { throttle } from './throttle';

export class LiveMusicHelper extends EventTarget {

  private ai: GoogleGenAI;
  private model: string;

  private session: LiveMusicSession | null = null;
  private sessionPromise: Promise<LiveMusicSession> | null = null;

  private connectionError = true;

  private filteredPrompts = new Set<string>();
  private nextStartTime = 0;
  private bufferTime = 2;

  public readonly audioContext: AudioContext;
  public extraDestination: AudioNode | null = null;

  private outputNode: GainNode;
  /**
   * Expose a tap node that carries the mixed output for recording.
   * Connects in parallel to destination(s) to avoid altering output.
   */
  public readonly recordTap: GainNode;
  private masterLimiter: DynamicsCompressorNode | null = null;
  private playbackState: PlaybackState = 'stopped';

  private prompts: Map<string, Prompt>;
  
  // Resilience / auto-reconnect
  private reconnecting = false;
  private retryAttempt = 0;
  private reconnectTimer: number | null = null;
  private shouldAutoResume = false; // true when user initiated play; false after pause/stop

  // Interstitial (ad/bumper) during reconnects
  private interstitialActive = false;
  private adGain: GainNode | null = null;
  private adOscillators: OscillatorNode[] = [];
  private ttsUtterance: SpeechSynthesisUtterance | null = null;

  constructor(ai: GoogleGenAI, model: string) {
    super();
    this.ai = ai;
    this.model = model;
    this.prompts = new Map();
    this.audioContext = new AudioContext({ sampleRate: 48000 });
    this.outputNode = this.audioContext.createGain();
    this.recordTap = this.audioContext.createGain();
  }

  private getSession(): Promise<LiveMusicSession> {
    if (!this.sessionPromise) this.sessionPromise = this.connect();
    return this.sessionPromise;
  }

  private async connect(): Promise<LiveMusicSession> {
    this.sessionPromise = this.ai.live.music.connect({
      model: this.model,
      callbacks: {
        onmessage: async (e: LiveMusicServerMessage) => {
          if (e.setupComplete) {
            this.connectionError = false;
          }
          if (e.filteredPrompt) {
            this.filteredPrompts = new Set([...this.filteredPrompts, e.filteredPrompt.text!])
            this.dispatchEvent(new CustomEvent<LiveMusicFilteredPrompt>('filtered-prompt', { detail: e.filteredPrompt }));
          }
          if (e.serverContent?.audioChunks) {
            await this.processAudioChunks(e.serverContent.audioChunks);
          }
        },
        onerror: () => {
          this.handleTransportClosed('error');
        },
        onclose: () => {
          this.handleTransportClosed('closed');
        },
      },
    });
    return this.sessionPromise;
  }

  private handleTransportClosed(reason: 'error' | 'closed') {
    this.connectionError = true;
    // If user had not requested playback, do not auto-reconnect
    if (!this.shouldAutoResume) {
      this.setPlaybackState('paused');
      return;
    }
    // Enter loading state and try to recover seamlessly
    this.setPlaybackState('loading');
    this.nextStartTime = 0; // force rebuffer on resume
    this.session = null;
    this.sessionPromise = null;
    this.beginReconnect();
    // Start an interstitial bumper (TTS + short synth bed)
    this.playInterstitial();
    // Optional: surface a soft message once (not on every retry)
    if (this.retryAttempt === 0) {
      this.dispatchEvent(new CustomEvent('error', { detail: 'Connection lost. Reconnecting…' }));
    }
  }

  private beginReconnect() {
    if (this.reconnecting) return;
    this.reconnecting = true;
    this.retryAttempt = 0;
    const attempt = async () => {
      try {
        await this.connect();
        // Connected: set session and resume playback
        this.session = await this.sessionPromise!;
        // Ensure audio context is running and chain is in place
        await this.audioContext.resume();
        if (!this.masterLimiter) {
          this.masterLimiter = createMasterLimiter(this.audioContext);
          this.outputNode.connect(this.masterLimiter);
          this.masterLimiter.connect(this.audioContext.destination);
          if (this.extraDestination) this.outputNode.connect(this.extraDestination);
          this.outputNode.connect(this.recordTap);
        }
        await this.setWeightedPrompts(this.prompts);
        this.session!.play();
        this.stopInterstitial();
        this.reconnecting = false;
        if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
        // processAudioChunks will flip to 'playing' once buffered
        return;
      } catch (e) {
        this.retryAttempt += 1;
        const delays = [500, 1000, 2000, 4000, 8000, 8000];
        const delay = delays[Math.min(this.retryAttempt, delays.length - 1)];
        this.reconnectTimer = window.setTimeout(attempt, delay);
      }
    };
    attempt();
  }

  private setPlaybackState(state: PlaybackState) {
    this.playbackState = state;
    this.dispatchEvent(new CustomEvent('playback-state-changed', { detail: state }));
  }

  private async processAudioChunks(audioChunks: AudioChunk[]) {
    if (this.playbackState === 'paused' || this.playbackState === 'stopped') return;
    const audioBuffer = await decodeAudioData(
      decode(audioChunks[0].data!),
      this.audioContext,
      48000,
      2,
    );
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.outputNode);
    if (this.nextStartTime === 0) {
      this.nextStartTime = this.audioContext.currentTime + this.bufferTime;
      setTimeout(() => {
        this.setPlaybackState('playing');
      }, this.bufferTime * 1000);
    }
    if (this.nextStartTime < this.audioContext.currentTime) {
      this.setPlaybackState('loading');
      this.nextStartTime = 0;
      return;
    }
    source.start(this.nextStartTime);
    this.nextStartTime += audioBuffer.duration;
  }

  public get activePrompts() {
    return Array.from(this.prompts.values())
      .filter((p) => {
        return !this.filteredPrompts.has(p.text) && p.weight !== 0;
      })
  }

  public readonly setWeightedPrompts = throttle(async (prompts: Map<string, Prompt>) => {
    console.log('LiveMusicHelper.setWeightedPrompts called with:', prompts);
    this.prompts = prompts;

    if (this.activePrompts.length === 0) {
      console.log('No active prompts, pausing');
      this.dispatchEvent(new CustomEvent('error', { detail: 'There needs to be one active prompt to play.' }));
      this.pause();
      return;
    }

    console.log('Active prompts:', this.activePrompts);

    // store the prompts to set later if we haven't connected yet
    // there should be a user interaction before calling setWeightedPrompts
    if (!this.session) {
      console.log('No session yet, storing prompts for later');
      return;
    }

    try {
      console.log('Setting weighted prompts on session:', this.activePrompts);
      await this.session.setWeightedPrompts({
        weightedPrompts: this.activePrompts,
      });
      console.log('Successfully set weighted prompts on session');
    } catch (e: any) {
      console.error('Error setting weighted prompts:', e);
      this.dispatchEvent(new CustomEvent('error', { detail: e.message }));
      this.pause();
    }
  }, 200);

  public async play() {
    this.setPlaybackState('loading');
    this.shouldAutoResume = true;
    this.session = await this.getSession();
    await this.setWeightedPrompts(this.prompts);
    this.audioContext.resume();
    this.session.play();
    // Master limiter safety before destination
    this.masterLimiter = createMasterLimiter(this.audioContext);
    this.outputNode.connect(this.masterLimiter);
    this.masterLimiter.connect(this.audioContext.destination);
    if (this.extraDestination) this.outputNode.connect(this.extraDestination);
    // Feed record tap in parallel
    this.outputNode.connect(this.recordTap);
    this.outputNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.outputNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.1);
  }

  public pause() {
    if (this.session) this.session.pause();
    this.setPlaybackState('paused');
    this.shouldAutoResume = false;
    this.outputNode.gain.setValueAtTime(1, this.audioContext.currentTime);
    this.outputNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.1);
    this.nextStartTime = 0;
    this.outputNode = this.audioContext.createGain();
    // Reconnect record tap on next play
    this.stopInterstitial();
  }

  public stop() {
    if (this.session) this.session.stop();
    this.setPlaybackState('stopped');
    this.shouldAutoResume = false;
    this.outputNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.outputNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.1);
    this.nextStartTime = 0;
    this.session = null;
    this.sessionPromise = null;
    this.stopInterstitial();
  }

  // --- Interstitial helpers ---
  private playInterstitial() {
    if (this.interstitialActive) return;
    this.interstitialActive = true;

    // Create a soft synth bed (short arpeggio loop) while reconnecting
    this.adGain = this.audioContext.createGain();
    this.adGain.gain.setValueAtTime(0.0, this.audioContext.currentTime);
    this.adGain.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.15);
    const target = this.masterLimiter ?? this.audioContext.destination;
    this.adGain.connect(target);

    // Schedule a simple arpeggio over ~6 seconds
    const baseTime = this.audioContext.currentTime;
    const env = (osc: OscillatorNode, t0: number, dur: number) => {
      const g = this.audioContext.createGain();
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(0.35, t0 + 0.03);
      g.gain.linearRampToValueAtTime(0.0, t0 + dur);
      osc.connect(g).connect(this.adGain!);
    };
    const schedule = (freq: number, offset: number, dur: number) => {
      const osc = this.audioContext.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, baseTime + offset);
      env(osc, baseTime + offset, dur);
      osc.start(baseTime + offset);
      osc.stop(baseTime + offset + dur + 0.05);
      this.adOscillators.push(osc);
    };
    // C minor arpeggio pattern
    const notes = [261.63, 311.13, 392.00, 523.25];
    for (let i = 0; i < 16; i++) {
      const n = notes[i % notes.length] * (i % 8 === 0 ? 0.5 : 1);
      schedule(n, i * 0.35, 0.28);
    }

    // TTS announcement (if available)
    const phraseOptions = [
      'Thanks for listening to deeprabbit dot net.',
      'DeepRabbit: fresh tracks, forged by A I. Thanks for tuning in.',
      'We\'ll be back in a beat. Thanks for listening to deeprabbit dot net.',
    ];
    const phrase = phraseOptions[Math.floor(Math.random() * phraseOptions.length)];
    try {
      const synth = (window as any)?.speechSynthesis as SpeechSynthesis | undefined;
      if (synth) {
        this.ttsUtterance = new SpeechSynthesisUtterance(phrase);
        // Prefer a random non-default voice if available
        const voices = synth.getVoices();
        if (voices && voices.length > 0) {
          const altVoices = voices.filter(v => !/default/i.test(v.name));
          const pick = (altVoices.length ? altVoices : voices)[Math.floor(Math.random() * (altVoices.length ? altVoices.length : voices.length))];
          this.ttsUtterance.voice = pick;
        }
        this.ttsUtterance.rate = 1.0;
        this.ttsUtterance.pitch = 1.0;
        synth.speak(this.ttsUtterance);
      }
    } catch {}
  }

  private stopInterstitial() {
    if (!this.interstitialActive) return;
    this.interstitialActive = false;
    try {
      // Stop TTS if speaking
      const synth = (window as any)?.speechSynthesis as SpeechSynthesis | undefined;
      if (synth && synth.speaking) synth.cancel();
      this.ttsUtterance = null;
    } catch {}
    // Stop oscillators and fade out
    const now = this.audioContext.currentTime;
    if (this.adGain) {
      try { this.adGain.gain.cancelScheduledValues(now); } catch {}
      this.adGain.gain.setValueAtTime(this.adGain.gain.value, now);
      this.adGain.gain.linearRampToValueAtTime(0, now + 0.15);
      setTimeout(() => {
        try { this.adGain?.disconnect(); } catch {}
        this.adGain = null;
      }, 200);
    }
    this.adOscillators.forEach(o => { try { o.stop(); o.disconnect(); } catch {} });
    this.adOscillators = [];
  }

  public async playPause() {
    switch (this.playbackState) {
      case 'playing':
        return this.pause();
      case 'paused':
      case 'stopped':
        return this.play();
      case 'loading':
        return this.stop();
    }
  }

}
