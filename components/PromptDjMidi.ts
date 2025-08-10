/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { throttle } from '../utils/throttle';

import './PromptController';
import './PlayPauseButton';
import './TimelineRuler';
import type { PlaybackState, Prompt, ControlChange } from '../types';
import './HelpPanel';
import './OnboardingTutorial';
import { MidiDispatcher } from '../utils/MidiDispatcher';
import { SessionRecorder } from '../utils/SessionRecorder';

/** The grid of prompt inputs. */
@customElement('prompt-dj-midi')
export class PromptDjMidi extends LitElement {
  static override styles = css`
    :host {
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: #0f0f0f;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      color: #e0e0e0;
      overflow: hidden;
      user-select: none;
    }
    
    /* Professional DAW Header */
    .daw-header {
      height: 70px;
      background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
      border-bottom: 2px solid #2a2a2a;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 25px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      z-index: 1000;
      position: relative;
    }
    
    .daw-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #29F2C6 50%, transparent 100%);
      opacity: 0.6;
    }
    
    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 25px;
    }
    
    .app-title {
      color: #29F2C6;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 0 0 20px rgba(41, 242, 198, 0.5);
      position: relative;
    }
    
    .app-title::after {
      content: 'PRO';
      position: absolute;
      top: -8px;
      right: -25px;
      font-size: 10px;
      background: #29F2C6;
      color: #000;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: 900;
      letter-spacing: 1px;
    }
    
    .transport-controls {
      display: flex;
      align-items: center;
      gap: 20px;
      background: #1a1a1a;
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid #333;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: #aaa;
      font-weight: 500;
    }
    
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #555;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .status-dot.playing {
      background: #29F2C6;
      box-shadow: 0 0 15px rgba(41, 242, 198, 0.8);
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.8; }
    }
    
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .toolbar-btn {
      background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
      border: 1px solid #444;
      color: #e0e0e0;
      padding: 10px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      position: relative;
      overflow: hidden;
    }
    
    .toolbar-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }
    
    .toolbar-btn:hover::before {
      left: 100%;
    }
    
    .toolbar-btn:hover {
      background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
      border-color: #555;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    }
    
    .toolbar-btn.active {
      background: linear-gradient(135deg, #29F2C6 0%, #0FC9A7 100%);
      color: #000;
      border-color: #29F2C6;
      box-shadow: 0 0 20px rgba(41, 242, 198, 0.4);
    }
    
    .midi-select {
      background: #1a1a1a;
      border: 1px solid #444;
      color: #e0e0e0;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 12px;
      outline: none;
      font-weight: 500;
      transition: all 0.2s ease;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .midi-select:focus {
      border-color: #29F2C6;
      box-shadow: 0 0 0 3px rgba(41, 242, 198, 0.2);
    }
    
    /* Main DAW Layout */
    .daw-layout {
      display: flex;
      flex: 1;
      height: calc(100vh - 70px); /* ensure fixed vertical space below header */
      min-height: 0; /* allow children to shrink and enable inner scroll areas */
      align-items: stretch; /* ensure children fill height */
      overflow: hidden;
      background: #0f0f0f;
    }
    
    /* Left Panel - Style List */
    .style-panel {
      width: 300px;
      background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
      border-right: 2px solid #2a2a2a;
      display: flex;
      flex-direction: column;
      min-height: 0; /* critical for nested flex scroll */
      height: 100%; /* take full height of layout */
      flex: 0 0 300px; /* fix width in flex row */
      overflow: hidden;
      position: relative;
    }
    
    .style-panel::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background: linear-gradient(180deg, transparent 0%, #29F2C6 50%, transparent 100%);
      opacity: 0.3;
    }
    
    .panel-header {
      background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
      padding: 18px 25px;
      border-bottom: 2px solid #333;
      position: relative;
      flex-shrink: 0; /* prevent header from stealing space */
    }
    
    .panel-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #29F2C6 50%, transparent 100%);
      opacity: 0.4;
    }
    
    .panel-header h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #29F2C6;
      text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
    }
    
    .style-list {
      flex: 1 1 0;
      min-height: 0; /* ensure list can become scroll container */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      padding: 15px 0;
    }
    
    .style-item {
      display: flex;
      align-items: center;
      padding: 15px 25px;
      border-bottom: 1px solid #222;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .style-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: transparent;
      transition: all 0.2s ease;
    }
    
    .style-item:hover {
      background: linear-gradient(90deg, rgba(41, 242, 198, 0.1) 0%, transparent 100%);
      border-left: 3px solid #29F2C6;
    }
    
    .style-item:hover::before {
      background: #29F2C6;
      box-shadow: 0 0 10px rgba(41, 242, 198, 0.5);
    }
    
    .style-item.filtered {
      opacity: 0.4;
      background: rgba(255, 0, 0, 0.1);
    }
    .style-item.active {
      background: linear-gradient(90deg, rgba(41, 242, 198, 0.12) 0%, transparent 100%);
      border-left: 3px solid #29F2C6;
    }
    
    .style-color {
      width: 14px;
      height: 14px;
      border-radius: 3px;
      margin-right: 15px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .style-name {
      flex: 1;
      font-size: 12px;
      font-weight: 600;
      color: #e0e0e0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .style-mute {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s ease;
      background: #333;
      border: 1px solid #555;
      font-size: 12px;
    }
    
    .style-mute:hover {
      background: #444;
      border-color: #666;
      transform: scale(1.1);
    }
    
    /* Center Workspace */
    .workspace {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #0f0f0f;
      min-height: 0; /* enable inner scroll */
      overflow: hidden;
      position: relative;
    }
    
    .workspace::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(41, 242, 198, 0.02) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(41, 242, 198, 0.02) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .timeline-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0; /* enable grid-container to scroll */
      overflow: hidden;
    }
    
    .timeline-header {
      background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
      padding: 18px 25px;
      border-bottom: 2px solid #333;
      position: relative;
    }
    
    .timeline-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #29F2C6 50%, transparent 100%);
      opacity: 0.4;
    }
    
    .timeline-header h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #29F2C6;
      text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
    }
    
    .grid-container {
      flex: 1;
      padding: 25px;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(4, minmax(220px, 1fr));
      gap: 25px;
      align-content: start;
    }
    
    .slider-row {
      background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
      border: 2px solid #2a2a2a;
      border-radius: 8px;
      padding: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      transition: all 0.3s ease;
      position: relative;
      overflow: visible;
    }

    .slider-row.blending {
      border-color: #29F2C6;
      box-shadow: 0 0 20px rgba(41, 242, 198, 0.3);
    }

    .slot-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1px solid #444;
      background: #222;
      color: #aaa;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.2s ease;
    }

    .slot-close:hover {
      background: #333;
      color: #fff;
      border-color: #666;
      transform: scale(1.05);
    }
    
    .slider-row::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, #29F2C6 50%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .slider-row:hover {
      border-color: #29F2C6;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(41, 242, 198, 0.1);
      transform: translateY(-2px);
    }
    
    .slider-row:hover::before {
      opacity: 1;
    }
    
    .slider-label {
      color: #e0e0e0;
      font-weight: 700;
      font-size: 14px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .slider-control {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
      /* Provide space for slider overlays (labels/visualizer) */
      padding-bottom: 40px;
    }
    
    weight-slider {
      width: 100%;
      max-width: 200px;
    }
    
    .midi-info {
      background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
      border: 1px solid #555;
      border-radius: 6px;
      padding: 10px 18px;
      font-size: 11px;
      color: #aaa;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: center;
      min-width: 90px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    }
    
    .midi-info:hover {
      background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
      border-color: #29F2C6;
      color: #29F2C6;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    }

    .midi-info.active {
      background: linear-gradient(135deg, #072a25 0%, #05211d 100%);
      border-color: #29F2C6;
      color: #29F2C6;
      box-shadow: 0 0 0 3px rgba(41, 242, 198, 0.15), 0 0 20px rgba(41, 242, 198, 0.15);
    }
    
    /* Right Panel - Mixer */
    
    .instruments-list {
      border-top: 2px solid #333;
      padding: 15px 0;
    }
    
    .instrument-slider {
      padding: 18px 25px;
      border-bottom: 1px solid #222;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      transition: all 0.2s ease;
    }
    
    .instrument-slider:hover {
      background: rgba(41, 242, 198, 0.05);
    }
    
    .instrument-slider.filtered {
      opacity: 0.4;
      background: rgba(255, 0, 0, 0.1);
    }
    .instrument-slider.active {
      background: linear-gradient(90deg, rgba(41, 242, 198, 0.08) 0%, transparent 100%);
      border-left: 3px solid #29F2C6;
    }
    
    .instrument-label {
      font-size: 12px;
      color: #e0e0e0;
      font-weight: 600;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    /* Professional Scrollbars */
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    
    ::-webkit-scrollbar-track {
      background: #0f0f0f;
      border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #333 0%, #222 100%);
      border-radius: 5px;
      border: 1px solid #444;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #444 0%, #333 100%);
    }
    
    ::-webkit-scrollbar-corner {
      background: #0f0f0f;
    }
    
    /* Responsive Design */
    @media (max-width: 1400px) {
      .style-panel {
        width: 260px;
      }
      
      .mixer-panel {
        width: 300px;
      }
      
      .grid-container {
        grid-template-columns: repeat(4, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
      }
    }
    
    @media (max-width: 768px) {
      .daw-layout {
        flex-direction: column;
      }
      
      .style-panel,
      .mixer-panel {
        width: 100%;
        height: auto;
        max-height: 250px;
      }
      
      .grid-container {
        grid-template-columns: repeat(2, minmax(160px, 1fr));
        gap: 15px;
        padding: 15px;
      }
      
      .slider-row {
        padding: 20px;
      }
      
      .daw-header {
        height: auto;
        padding: 20px 25px;
        flex-direction: column;
        gap: 20px;
      }
      
      .toolbar-left,
      .toolbar-right {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .grid-container {
        grid-template-columns: repeat(1, minmax(160px, 1fr));
        gap: 10px;
        padding: 10px;
      }

      .style-panel,
      .mixer-panel {
        max-height: 200px;
      }

      .slider-row {
        padding: 15px;
      }
    }
  `;

  private prompts: Map<string, Prompt>;
  private instruments: Map<string, Prompt>;
  private midiDispatcher: MidiDispatcher;
  @state() private maxSelectedPrompts = 8;
  private recorder: SessionRecorder | null = null;
  @state() private showExportMenu = false;
  @state() private showTutorial = false;
  @state() private isRecording = false;
  @state() private autoEvolveEnabled = false;
  @state() private autoEvolveRateSec = 16; // how often to evolve
  @state() private autoEvolveDepth = 0.15; // 0..1 range scales the delta
  private evolveTimer: number | null = null;
  @state() private styleSearchQuery: string = '';
  @state() private selectedOrder: string[] = [];
  private readonly SELECTED_ORDER_STORAGE_KEY = 'pdjmidi_selected_order';
  private readonly PROMPT_WEIGHTS_STORAGE_KEY = 'pdjmidi_prompt_weights';
  private readonly STYLE_COUNT_STORAGE_KEY = 'pdjmidi_style_count';

  @property({ type: Boolean }) private showMidi = false;
  @property({ type: String }) public playbackState: PlaybackState = 'stopped';
  @state() public audioLevel = 0;
  @state() public currentTime = 0;
  @state() private midiInputIds: string[] = [];
  @state() private activeMidiInputId: string | null = null;
  @state() private learningPromptId: string | null = null;
  @state() private learningInstrumentId: string | null = null;
  @state() private selectedPromptIds: Set<string> = new Set();
  @state() private selectedInstrumentId: string | null = null;
  @state() private learningSlotIndex: number | null = null;
  @state() private slotCcMap: Map<number, number> = new Map();
  private readonly SLOT_CC_STORAGE_KEY = 'pdjmidi_slot_cc_mappings';
  
  private readonly PROMPT_CC_STORAGE_KEY = 'pdjmidi_prompt_cc_mappings';
  private readonly INSTR_CC_STORAGE_KEY = 'pdjmidi_instrument_cc_mappings';

  override firstUpdated() {
    try {
      const done = localStorage.getItem('deeprabbit_onboarded');
      if (!done) this.showTutorial = true;
    } catch {}
  }

  private handleTutorialFinish() {
    this.showTutorial = false;
    try { localStorage.setItem('deeprabbit_onboarded', '1'); } catch {}
  }
  @state() private showHelp = false;

  @property({ type: Object })
  private filteredPrompts = new Set<string>();
  
  @property({ type: Object })
  private filteredInstruments = new Set<string>();

  constructor(
    initialPrompts: Map<string, Prompt>,
  ) {
    super();
    this.prompts = initialPrompts;
    
    // Initialize instruments with common musical instruments
    this.instruments = new Map([
      ['piano', { promptId: 'piano', text: 'Piano', weight: 0, color: '#FF6B6B', cc: 0 }],
      ['guitar', { promptId: 'guitar', text: 'Guitar', weight: 0, color: '#4ECDC4', cc: 0 }],
      ['drums', { promptId: 'drums', text: 'Drums', weight: 0, color: '#45B7D1', cc: 0 }],
      ['bass', { promptId: 'bass', text: 'Bass', weight: 0, color: '#96CEB4', cc: 0 }],
      ['strings', { promptId: 'strings', text: 'Strings', weight: 0, color: '#FFEAA7', cc: 0 }],
      ['synth', { promptId: 'synth', text: 'Synth', weight: 0, color: '#DDA0DD', cc: 0 }],
      ['brass', { promptId: 'brass', text: 'Brass', weight: 0, color: '#FFB347', cc: 0 }],
      ['woodwind', { promptId: 'woodwind', text: 'Woodwind', weight: 0, color: '#98D8C8', cc: 0 }]
    ]);
    
    this.midiDispatcher = new MidiDispatcher();
    this.midiDispatcher.addEventListener('cc-message', (e: Event) => {
      const customEvent = e as CustomEvent<ControlChange>;
      const { cc, value } = customEvent.detail;
      // Slot-level learn: map CC to visible slot index (container binding)
      if (this.learningSlotIndex !== null) {
        this.slotCcMap = new Map(this.slotCcMap.set(this.learningSlotIndex, cc));
        this.learningSlotIndex = null;
        this.saveSlotMappings();
        this.requestUpdate();
        return;
      }

      // If a CC is bound to a slot, apply it to the prompt currently occupying that slot
      if (this.slotCcMap.size > 0) {
        const promptsToShow = this.selectedOrder
          .map((id) => this.prompts.get(id))
          .filter((p): p is Prompt => !!p)
          .slice(0, this.maxSelectedPrompts);
        for (let i = 0; i < promptsToShow.length; i++) {
          const boundCc = this.slotCcMap.get(i);
          if (boundCc && boundCc === cc) {
            const newWeight = (value / 127) * 2;
            this.handleSliderChange(promptsToShow[i].promptId, newWeight);
            // Do not return; allow prompt/instrument-level mappings to also respond if desired
          }
        }
      }
      if (this.learningPromptId) {
        const prompt = this.prompts.get(this.learningPromptId);
        if (prompt) {
          prompt.cc = cc;
          const newPrompts = new Map(this.prompts);
          newPrompts.set(this.learningPromptId, prompt);
          this.prompts = newPrompts;
          this.learningPromptId = null;
          this.requestUpdate();
          this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
          this.saveMidiMappings();
        }
      } else if (this.learningInstrumentId) {
        const instrument = this.instruments.get(this.learningInstrumentId);
        if (instrument) {
          instrument.cc = cc;
          const newInstruments = new Map(this.instruments);
          newInstruments.set(this.learningInstrumentId, instrument);
          this.instruments = newInstruments;
          this.learningInstrumentId = null;
          this.requestUpdate();
          this.dispatchEvent(new CustomEvent('instrument-changed', { detail: instrument }));
          this.saveMidiMappings();
        }
      } else {
        // Not in learn mode: adjust mapped prompt/instrument weights by incoming CC
        const newWeight = (value / 127) * 2;
        // Update prompts with matching CC (> 0)
        let updatedPrompts = false;
        this.prompts.forEach((p) => {
          if (p.cc > 0 && p.cc === cc) {
            this.handleSliderChange(p.promptId, newWeight);
            updatedPrompts = true;
          }
        });
        // Update instruments with matching CC (> 0)
        this.instruments.forEach((inst) => {
          if (inst.cc > 0 && inst.cc === cc) {
            this.handleInstrumentChange(inst.promptId, newWeight);
          }
        });
        if (updatedPrompts) {
          this.requestUpdate();
        }
      }
    });
    // Load persisted prompt weights and selected order
    this.loadPromptWeights();
    this.loadStyleCount?.();
    this.loadSelectedOrder();
    if (this.selectedOrder.length === 0) {
      // Initialize selected prompts from current weights (up to MAX)
      const sorted = [...this.prompts.values()].sort((a, b) => (b.weight || 0) - (a.weight || 0));
      for (const p of sorted) {
        if (this.selectedOrder.length >= this.maxSelectedPrompts) break;
        this.selectedOrder.push(p.promptId);
      }
    }
    // Sync Set for quick membership checks
    this.selectedPromptIds = new Set(this.selectedOrder);

    // Load saved MIDI CC mappings (if any)
    this.loadMidiMappings();
    this.loadSlotMappings();
  }

  override connectedCallback() {
    super.connectedCallback();
    this._onKeyDown = this._onKeyDown.bind(this);
    window.addEventListener('keydown', this._onKeyDown);
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', this._onKeyDown);
    super.disconnectedCallback();
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === '?' || e.key === '/') {
      e.preventDefault();
      this.toggleHelp();
    }
  }

  private saveSlotMappings() {
    try {
      const obj: Record<string, number> = {};
      this.slotCcMap.forEach((cc, idx) => { obj[idx.toString()] = cc; });
      localStorage.setItem(this.SLOT_CC_STORAGE_KEY, JSON.stringify(obj));
    } catch {}
  }

  private loadSlotMappings() {
    try {
      const str = localStorage.getItem(this.SLOT_CC_STORAGE_KEY);
      if (!str) return;
      const obj = JSON.parse(str) as Record<string, number>;
      const map = new Map<number, number>();
      Object.entries(obj).forEach(([k, v]) => map.set(Number(k), v));
      this.slotCcMap = map;
    } catch {}
  }

  private saveMidiMappings() {
    try {
      const promptMappings: Record<string, number> = {};
      this.prompts.forEach((p) => { if (p.cc && p.cc > 0) { promptMappings[p.promptId] = p.cc; } });
      localStorage.setItem(this.PROMPT_CC_STORAGE_KEY, JSON.stringify(promptMappings));

      const instrumentMappings: Record<string, number> = {};
      this.instruments.forEach((i) => { if (i.cc && i.cc > 0) { instrumentMappings[i.promptId] = i.cc; } });
      localStorage.setItem(this.INSTR_CC_STORAGE_KEY, JSON.stringify(instrumentMappings));
    } catch (e) {
      // ignore storage errors
    }
  }

  private loadMidiMappings() {
    try {
      const promptStr = localStorage.getItem(this.PROMPT_CC_STORAGE_KEY);
      if (promptStr) {
        const map = JSON.parse(promptStr) as Record<string, number>;
        const updated = new Map(this.prompts);
        Object.entries(map).forEach(([promptId, cc]) => {
          const p = updated.get(promptId);
          if (p) { p.cc = cc; updated.set(promptId, p); }
        });
        this.prompts = updated;
      }

      const instrStr = localStorage.getItem(this.INSTR_CC_STORAGE_KEY);
      if (instrStr) {
        const map = JSON.parse(instrStr) as Record<string, number>;
        const updated = new Map(this.instruments);
        Object.entries(map).forEach(([instrumentId, cc]) => {
          const i = updated.get(instrumentId);
          if (i) { i.cc = cc; updated.set(instrumentId, i); }
        });
        this.instruments = updated;
      }
    } catch (e) {
      // ignore storage errors
    }
  }

  private goHome() {
    this.dispatchEvent(new CustomEvent('go-home'));
  }

  private toggleHelp() { this.showHelp = !this.showHelp; }
  private toggleExportMenu() { this.showExportMenu = !this.showExportMenu; }

  private async exportWavOrMp3(kind: 'wav' | 'mp3') {
    this.dispatchEvent(new CustomEvent('export-audio', { detail: { kind } }));
  }

  private handlePromptChanged(e: CustomEvent<Prompt>) {
    const { promptId, text, weight, cc } = e.detail;
    const prompt = this.prompts.get(promptId);

    if (!prompt) {
      console.error('prompt not found', promptId);
      return;
    }

    prompt.text = text;
    prompt.weight = weight;
    prompt.cc = cc;

    const newPrompts = new Map(this.prompts);
    newPrompts.set(promptId, prompt);

    this.prompts = newPrompts;
    this.requestUpdate();

    this.dispatchEvent(
      new CustomEvent('prompts-changed', { detail: this.prompts }),
    );
  }

  /** Generates radial gradients for each prompt based on weight and color. */
  private readonly makeBackground = throttle(
    () => {
      const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

      const MAX_WEIGHT = 0.5;
      const MAX_ALPHA = 0.6;

      const bg: string[] = [];

      [...this.prompts.values()].forEach((p, i) => {
        const alphaPct = clamp01(p.weight / MAX_WEIGHT) * MAX_ALPHA;
        const alpha = Math.round(alphaPct * 0xff)
          .toString(16)
          .padStart(2, '0');

        const stop = p.weight / 2;
        const x = (i % 4) / 3;
        const y = Math.floor(i / 4) / 3;
        const s = `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${p.color}${alpha} 0px, ${p.color}00 ${stop * 100}%)`;

        bg.push(s);
      });

      return bg.join(', ');
    },
    30, // don't re-render more than once every XXms
  );

  private toggleShowMidi() {
    return this.setShowMidi(!this.showMidi);
  }

  public async setShowMidi(show: boolean) {
    this.showMidi = show;
    if (!this.showMidi) return;
    try {
      const inputIds = await this.midiDispatcher.getMidiAccess();
      this.midiInputIds = inputIds;
      this.activeMidiInputId = this.midiDispatcher.activeMidiInputId;
    } catch (e) {
      this.showMidi = false;
      this.dispatchEvent(new CustomEvent('error', {detail: e.message}));
    }
  }

  private handleMidiInputChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newMidiId = selectElement.value;
    this.activeMidiInputId = newMidiId;
    this.midiDispatcher.activeMidiInputId = newMidiId;
  }

  private playPause() {
    this.dispatchEvent(new CustomEvent('play-pause'));
  }

  private toggleRecording() {
    this.dispatchEvent(new CustomEvent('toggle-recording'));
  }

  private toggleAutoEvolve() {
    this.autoEvolveEnabled = !this.autoEvolveEnabled;
    if (this.autoEvolveEnabled) {
      this.startAutoEvolve();
    } else {
      this.stopAutoEvolve();
    }
  }

  private startAutoEvolve() {
    this.stopAutoEvolve();
    const run = () => this.runAutoEvolveOnce();
    run();
    this.evolveTimer = window.setInterval(run, this.autoEvolveRateSec * 1000);
  }

  private stopAutoEvolve() {
    if (this.evolveTimer !== null) {
      clearInterval(this.evolveTimer);
      this.evolveTimer = null;
    }
  }

  private runAutoEvolveOnce() {
    // Subtle random walk on active prompts
    const activePrompts: Prompt[] = this.selectedOrder
      .map((id) => this.prompts.get(id))
      .filter((p): p is Prompt => !!p)
      .slice(0, this.maxSelectedPrompts);
    if (activePrompts.length === 0) return;

    const updated = new Map(this.prompts);
    let changed = false;
    for (const p of activePrompts) {
      const scale = Math.max(0, Math.min(1, this.autoEvolveDepth));
      const delta = (Math.random() - 0.5) * 0.2 * scale; // ±0.1 at depth=1
      const newW = Math.max(0, Math.min(2, (p.weight || 0) + delta));
      if (Math.abs(newW - p.weight) > 0.001) {
        p.weight = newW;
        updated.set(p.promptId, p);
        changed = true;
      }
    }

    // Occasionally rotate one prompt to introduce new material
    if (Math.random() < 0.2) {
      const pool = [...this.prompts.keys()].filter((id) => !this.selectedOrder.includes(id));
      if (pool.length > 0) {
        const swapIn = pool[Math.floor(Math.random() * pool.length)];
        const idxOut = Math.floor(Math.random() * this.selectedOrder.length);
        const newOrder = [...this.selectedOrder];
        newOrder[idxOut] = swapIn;
        this.selectedOrder = newOrder;
        this.selectedPromptIds = new Set(this.selectedOrder);
        this.resetWeightsForNonDisplayedPrompts();
      }
    }

    if (changed) {
      this.prompts = updated;
      this.savePromptWeights();
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
    }
  }

  public addFilteredPrompt(prompt: string) {
    this.filteredPrompts = new Set([...this.filteredPrompts, prompt]);
  }

  private handleSliderChange(promptId: string, value: number) {
    console.log('handleSliderChange called with promptId:', promptId, 'value:', value);
    const prompt = this.prompts.get(promptId);
    if (prompt) {
      prompt.weight = value;
      // Update the prompts map and dispatch the prompts-changed event
      const newPrompts = new Map(this.prompts);
      newPrompts.set(promptId, prompt);
      this.prompts = newPrompts;
      
      console.log('Slider changed for prompt:', promptId, 'new weight:', value);
      console.log('Dispatching prompts-changed event with prompts:', this.prompts);
      
      // Force a re-render and dispatch the event
      this.requestUpdate();
      this.dispatchEvent(
        new CustomEvent('prompts-changed', { detail: this.prompts }),
      );
      this.savePromptWeights();

      // If the prompt is not currently selected/displayed, ensure it remains at 0
      if (!this.selectedPromptIds.has(promptId) && prompt.weight !== 0) {
        prompt.weight = 0;
        const updated = new Map(this.prompts);
        updated.set(promptId, prompt);
        this.prompts = updated;
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
      }
    } else {
      console.error('Prompt not found for ID:', promptId);
    }
  }

  private handleInstrumentChange(instrumentId: string, value: number) {
    const instrument = this.instruments.get(instrumentId);
    if (instrument) {
      instrument.weight = value;
      // Update the instruments map
      const newInstruments = new Map(this.instruments);
      newInstruments.set(instrumentId, instrument);
      this.instruments = newInstruments;
      this.requestUpdate();
      
      // Dispatch instrument change event
      this.dispatchEvent(new CustomEvent('instrument-changed', { detail: instrument }));

      // Selecting logic: enforce only one instrument active at a time
      if (value > 0) {
        // Deselect previous selection and zero out its weight
        if (this.selectedInstrumentId && this.selectedInstrumentId !== instrumentId) {
          const prev = this.instruments.get(this.selectedInstrumentId);
          if (prev) {
            prev.weight = 0;
            const map2 = new Map(this.instruments);
            map2.set(prev.promptId, prev);
            this.instruments = map2;
            this.dispatchEvent(new CustomEvent('instrument-changed', { detail: prev }));
          }
        }
        this.selectedInstrumentId = instrumentId;
      } else if (this.selectedInstrumentId === instrumentId && value === 0) {
        this.selectedInstrumentId = null;
      }
    }
  }

  private toggleStyleSelected(promptId: string) {
    const isSelected = this.selectedPromptIds.has(promptId);
    if (!isSelected) {
      if (this.selectedPromptIds.size >= this.maxSelectedPrompts) {
        this.dispatchEvent(new CustomEvent('error', { detail: `You can select up to ${this.maxSelectedPrompts} styles.` }));
        return;
      }
      // Append to order and set
      this.selectedOrder = [...this.selectedOrder, promptId];
      this.selectedPromptIds = new Set(this.selectedOrder);
    } else {
      // Remove from order and set
      this.selectedOrder = this.selectedOrder.filter((id) => id !== promptId);
      this.selectedPromptIds = new Set(this.selectedOrder);
    }

    // Ensure prompts not displayed in grid are not active: zero their weights
    this.resetWeightsForNonDisplayedPrompts();
    this.saveSelectedOrder();
  }

  /** Zero-out weights for prompts that are not currently selected/displayed. */
  private resetWeightsForNonDisplayedPrompts() {
    let changed = false;
    const updated = new Map(this.prompts);
    updated.forEach((p, id) => {
      if (!this.selectedPromptIds.has(id) && p.weight !== 0) {
        p.weight = 0;
        updated.set(id, p);
        changed = true;
      }
    });
    if (changed) {
      this.prompts = updated;
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
    }
  }

  private async ensureMidiAccess(): Promise<boolean> {
    try {
      const inputIds = await this.midiDispatcher.getMidiAccess();
      this.midiInputIds = inputIds;
      this.activeMidiInputId = this.midiDispatcher.activeMidiInputId;
      if (inputIds.length === 0) {
        this.dispatchEvent(new CustomEvent('error', { detail: 'No MIDI devices found.' }));
        return false;
      }
      return true;
    } catch (e: any) {
      this.dispatchEvent(new CustomEvent('error', { detail: e.message }));
      return false;
    }
  }

  private async toggleLearnMode(promptId: string) {
    if (this.learningPromptId === promptId) {
      this.learningPromptId = null;
      return;
    }
    const ok = await this.ensureMidiAccess();
    if (!ok) return;
    this.learningInstrumentId = null; // only one learn target at a time
    this.learningPromptId = promptId;
  }

  private async toggleSlotLearn(slotIndex: number) {
    if (this.learningSlotIndex === slotIndex) {
      this.learningSlotIndex = null;
      return;
    }
    const ok = await this.ensureMidiAccess();
    if (!ok) return;
    this.learningPromptId = null;
    this.learningInstrumentId = null;
    this.learningSlotIndex = slotIndex;
  }

  private async toggleInstrumentLearnMode(instrumentId: string) {
    if (this.learningInstrumentId === instrumentId) {
      this.learningInstrumentId = null;
      return;
    }
    const ok = await this.ensureMidiAccess();
    if (!ok) return;
    this.learningPromptId = null; // only one learn target at a time
    this.learningInstrumentId = instrumentId;
    // Auto-assign a default MIDI note range to this instrument if none set: map CC 0-7 to keys C4-B4
    // For now, we keep CC learn only; note mapping could be implemented here later.
  }

  private handleStyleSlotChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const value = Number(select.value);
    if (![2,4,6,8,16].includes(value)) return;
    this.maxSelectedPrompts = value;
    // Trim order if necessary
    if (this.selectedOrder.length > value) {
      this.selectedOrder = this.selectedOrder.slice(0, value);
      this.selectedPromptIds = new Set(this.selectedOrder);
      this.resetWeightsForNonDisplayedPrompts();
    }
    this.saveStyleCount();
  }

  private saveStyleCount() {
    try { localStorage.setItem(this.STYLE_COUNT_STORAGE_KEY, String(this.maxSelectedPrompts)); } catch {}
  }

  private loadStyleCount() {
    try {
      const raw = localStorage.getItem(this.STYLE_COUNT_STORAGE_KEY);
      if (!raw) return;
      const n = Number(raw);
      if ([2,4,6,8,16].includes(n)) this.maxSelectedPrompts = n;
    } catch {}
  }

  private toggleStyleMute(styleId: string) {
    // TODO: Implement style muting
    console.log('Toggle mute for style:', styleId);
  }

  private isStyleMuted(styleId: string): boolean {
    // TODO: Implement style mute state
    return false;
  }

  private resetAll = () => {
    this.selectedOrder = [];
    this.selectedPromptIds = new Set();
    const updated = new Map(this.prompts);
    updated.forEach((p) => { if (p.weight !== 0) { p.weight = 0; } });
    this.prompts = updated;
    this.saveSelectedOrder();
    this.savePromptWeights();
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
  }

  private randomizeGrid = () => {
    const allIds = [...this.prompts.keys()];
    const k = Math.min(this.maxSelectedPrompts, allIds.length);
    for (let i = allIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIds[i], allIds[j]] = [allIds[j], allIds[i]];
    }
    const chosen = allIds.slice(0, k);
    this.selectedOrder = chosen;
    this.selectedPromptIds = new Set(this.selectedOrder);
    this.resetWeightsForNonDisplayedPrompts();
    this.saveSelectedOrder();
    this.requestUpdate();
  }

  override render() {
    return html`
      <!-- DAW Header -->
      <header class="daw-header">
        <div class="toolbar-left">
          <gf-brand></gf-brand>
          <div class="transport-controls">
            <play-pause-button .playbackState=${this.playbackState} @click=${this.playPause}></play-pause-button>
            <div class="status-indicator">
              <div class="status-dot ${this.playbackState === 'playing' ? 'playing' : ''}"></div>
              <span>${this.playbackState === 'playing' ? 'Playing' : 'Stopped'}</span>
            </div>
          </div>
        </div>
        
        <div class="toolbar-right">
          <button class="toolbar-btn" @click=${this.randomizeGrid} title="Fill grid randomly">🎲</button>
          <button class="toolbar-btn" @click=${this.resetAll} title="Reset all">♻</button>
          <button class="toolbar-btn" @click=${this.goHome} title="Return to Home">🏠</button>
          <button class="toolbar-btn ${this.isRecording ? 'active' : ''}" @click=${this.toggleRecording} title="Record / Stop">⏺</button>
          <button class="toolbar-btn" @click=${this.toggleHelp} title="How to use">❓</button>
          <div style="position: relative;">
            <button class="toolbar-btn" @click=${this.toggleExportMenu} title="Export">⬇ Export</button>
            ${this.showExportMenu ? html`
              <div style="position:absolute; right:0; top:110%; background:#1a1a1a; border:1px solid #333; border-radius:6px; padding:6px; z-index: 1001;">
                <button class="toolbar-btn" style="display:block; width:100%; margin:4px 0;" @click=${() => this.exportWavOrMp3('wav')}>Export WAV</button>
                <button class="toolbar-btn" style="display:block; width:100%; margin:4px 0;" @click=${() => this.exportWavOrMp3('mp3')}>Export MP3</button>
              </div>` : ''}
          </div>
          <button class="toolbar-btn ${this.autoEvolveEnabled ? 'active' : ''}" @click=${this.toggleAutoEvolve} title="Auto‑evolve">EVOLVE</button>
          <select class="midi-select" title="Evolve rate" @change=${(e: Event) => { this.autoEvolveRateSec = Number((e.target as HTMLSelectElement).value); if (this.autoEvolveEnabled) this.startAutoEvolve(); }} .value=${String(this.autoEvolveRateSec)}>
            ${[8,16,32,64].map(s => html`<option value=${s}>${s}s</option>`)}
          </select>
          <select class="midi-select" title="Evolve depth" @change=${(e: Event) => { this.autoEvolveDepth = Number((e.target as HTMLSelectElement).value); }} .value=${String(this.autoEvolveDepth)}>
            <option value="0.1">Subtle</option>
            <option value="0.15">Light</option>
            <option value="0.25">Medium</option>
            <option value="0.4">Bold</option>
          </select>
          <select class="midi-select" title="Style slots" @change=${this.handleStyleSlotChange} .value=${String(this.maxSelectedPrompts)}>
            ${[2,4,6,8,16].map(n => html`<option value=${n}>${n} styles</option>`)}
          </select>
          <button class="toolbar-btn ${this.showMidi ? 'active' : ''}" @click=${this.toggleShowMidi}>MIDI</button>
          ${this.showMidi ? html`
            <select class="midi-select" @change=${this.handleMidiInputChange} .value=${this.activeMidiInputId || ''}>
              <option value="">MIDI Input</option>
              ${this.midiInputIds.length > 0
                ? this.midiInputIds.map(
                    (id) => html`<option value=${id}>${this.midiDispatcher.getDeviceName(id)}</option>`
                  )
                : html`<option value="">No devices found</option>`}
            </select>
          ` : ''}
        </div>
      </header>

      <!-- Main DAW Layout -->
      <div class="daw-layout">
        <!-- Left Panel: Track List -->
        <aside class="style-panel">
          <div class="panel-header">
            <h3>Styles</h3>
            <input class="midi-select" style="width: 100%; margin-top: 8px;" type="text" placeholder="Search styles..." aria-label="Search styles" @input=${(e: Event) => { this.styleSearchQuery = (e.target as HTMLInputElement).value.toLowerCase(); }} .value=${this.styleSearchQuery} />
          </div>
          <div class="style-list" role="listbox" aria-multiselectable="true">
            ${this.renderStyleList()}
          </div>
        </aside>

        <!-- Center: Main Workspace -->
        <main class="workspace">
          <!-- Timeline Ruler -->
          <timeline-ruler 
            .currentTime=${this.currentTime || 0}
            .duration=${120}
            .bpm=${120}
            .timeSignature=${4}
            .isPlaying=${this.playbackState === 'playing'}>
          </timeline-ruler>
          
          <!-- Timeline/Grid Area -->
          <div class="timeline-area">
           <div class="timeline-header">
              <h3>deeprabbit — Fresh tracks. Forged by AI.</h3>
            </div>
            <div class="grid-container">
              ${this.renderPrompts()}
            </div>
          </div>
        </main>

        
      </div>
      ${this.showHelp ? html`<help-panel open @close=${this.toggleHelp}></help-panel>` : ''}
      ${this.showTutorial ? html`<onboarding-tutorial @finish=${this.handleTutorialFinish}></onboarding-tutorial>` : ''}
    `;
  }

  private renderPrompts() {
    const promptsToShow: Prompt[] = this.selectedOrder
      .map((id) => this.prompts.get(id))
      .filter((p): p is Prompt => !!p)
      .slice(0, this.maxSelectedPrompts);
    // Ensure any prompts not in the visible set have zero weight
    const visibleIds = new Set(promptsToShow.map(p => p.promptId));
    const updated = new Map(this.prompts);
    let changed = false;
    updated.forEach((p, id) => {
      if (!visibleIds.has(id) && p.weight !== 0) {
        p.weight = 0;
        updated.set(id, p);
        changed = true;
      }
    });
    if (changed) {
      this.prompts = updated;
      this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
    }
    return promptsToShow.map((prompt, index) => {
      const isFiltered = this.filteredPrompts.has(prompt.text);
      const blending = prompt.weight > 0;
      return html`<div class="slider-row ${blending ? 'blending' : ''}">
        <button class="slot-close" title="Remove from grid" aria-label="Remove ${prompt.text} from grid" @click=${(e: Event) => { e.stopPropagation(); this.removePromptFromGrid(prompt.promptId); }}>✕</button>
        <div class="slider-label">${prompt.text}</div>
        <div class="slider-control">
          <weight-slider
            .value=${prompt.weight}
            color=${isFiltered ? '#888' : prompt.color}
            audioLevel=${isFiltered ? 0 : this.audioLevel}
            @input=${(e: CustomEvent) => this.handleSliderChange(prompt.promptId, e.detail)}></weight-slider>
          <button type="button" class="midi-info ${this.learningSlotIndex === index ? 'active' : ''}"
            @click=${() => this.toggleSlotLearn(index)}
            aria-label=${this.learningSlotIndex === index
              ? 'Mapping in progress, turn a knob'
              : (this.slotCcMap.has(index) ? `Mapped to CC ${this.slotCcMap.get(index)}. Click to remap` : 'Click to learn MIDI mapping')}>
            ${this.learningSlotIndex === index
              ? 'Learning… turn a knob'
              : (this.slotCcMap.has(index) ? `CC:${this.slotCcMap.get(index)}` : 'Click to learn')}
          </button>
        </div>
      </div>`;
    });
  }

  private removePromptFromGrid(promptId: string) {
    // Remove from grid selection
    this.selectedOrder = this.selectedOrder.filter(id => id !== promptId);
    this.selectedPromptIds = new Set(this.selectedOrder);
    // Zero its weight
    const p = this.prompts.get(promptId);
    if (p && p.weight !== 0) {
      p.weight = 0;
      const updated = new Map(this.prompts);
      updated.set(promptId, p);
      this.prompts = updated;
      this.dispatchEvent(new CustomEvent('prompts-changed', { detail: this.prompts }));
      this.savePromptWeights();
    }
    this.saveSelectedOrder();
    this.requestUpdate();
  }

  private saveSelectedOrder() {
    try {
      localStorage.setItem(this.SELECTED_ORDER_STORAGE_KEY, JSON.stringify(this.selectedOrder));
    } catch {}
  }

  private loadSelectedOrder() {
    try {
      const raw = localStorage.getItem(this.SELECTED_ORDER_STORAGE_KEY);
      if (!raw) return;
      const arr = JSON.parse(raw) as string[];
      // Keep only ids that still exist
      this.selectedOrder = arr.filter((id) => this.prompts.has(id));
    } catch {}
  }

  private savePromptWeights() {
    try {
      const obj: Record<string, number> = {};
      this.prompts.forEach((p, id) => { obj[id] = p.weight || 0; });
      localStorage.setItem(this.PROMPT_WEIGHTS_STORAGE_KEY, JSON.stringify(obj));
    } catch {}
  }

  private loadPromptWeights() {
    try {
      const raw = localStorage.getItem(this.PROMPT_WEIGHTS_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Record<string, number>;
      const updated = new Map(this.prompts);
      Object.entries(saved).forEach(([id, w]) => {
        const p = updated.get(id);
        if (p) { p.weight = w; updated.set(id, p); }
      });
      this.prompts = updated;
    } catch {}
  }

  private renderInstruments() {
    return [...this.instruments.values()].map((instrument) => {
      const isFiltered = this.filteredInstruments.has(instrument.text);
      const isActive = this.selectedInstrumentId === instrument.promptId;
      return html`<div class="instrument-slider ${isActive ? 'active' : ''}">
        <div class="instrument-label">${instrument.text}</div>
        <weight-slider
          .value=${instrument.weight}
          color=${isFiltered ? '#888' : instrument.color}
          audioLevel=${isFiltered ? 0 : this.audioLevel}
          @input=${(e: CustomEvent) => this.handleInstrumentChange(instrument.promptId, e.detail)}></weight-slider>
        <button type="button" class="midi-info ${this.learningInstrumentId === instrument.promptId ? 'active' : ''}"
          @click=${() => this.toggleInstrumentLearnMode(instrument.promptId)}
          aria-label=${this.learningInstrumentId === instrument.promptId
            ? 'Mapping in progress, turn a knob'
            : (instrument.cc > 0 ? `Mapped to CC ${instrument.cc}. Click to remap` : 'Click to learn MIDI mapping')}>
          ${this.learningInstrumentId === instrument.promptId
            ? 'Learning… turn a knob'
            : (instrument.cc > 0 ? `CC:${instrument.cc}` : 'Click to learn')}
        </button>
      </div>`;
    });
  }

  private renderStyleList() {
    const q = this.styleSearchQuery.trim();
    const items = [...this.prompts.values()].filter(p => !q || p.text.toLowerCase().includes(q));
    return items.map((prompt) => {
      const isFiltered = this.filteredPrompts.has(prompt.text);
      const isActive = this.selectedPromptIds.has(prompt.promptId);
      return html`<div class="style-item ${isFiltered ? 'filtered' : ''} ${isActive ? 'active' : ''}"
        role="option"
        tabindex="0"
        aria-selected=${isActive}
        aria-label="${isActive ? 'Deselect' : 'Select'} style ${prompt.text}"
        @click=${() => this.toggleStyleSelected(prompt.promptId)}
        @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleStyleSelected(prompt.promptId); } }}>
        <div class="style-color" style="background-color: ${prompt.color}"></div>
        <div class="style-name">${prompt.text}</div>
        <button type="button" class="style-mute" @click=${(e: Event) => { e.stopPropagation(); this.toggleStyleMute(prompt.promptId); }} aria-label="${this.isStyleMuted(prompt.promptId) ? 'Unmute style' : 'Mute style'} ${prompt.text}">
          ${this.isStyleMuted(prompt.promptId) ? '🔇' : '🔊'}
        </button>
      </div>`;
    });
  }

  private renderMixerTracks() { return null; }
}
