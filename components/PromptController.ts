/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import './WeightSlider';
import type { WeightSlider } from './WeightSlider';

import type { MidiDispatcher } from '../utils/MidiDispatcher';
import type { Prompt, ControlChange } from '../types';

/** A single prompt input associated with a MIDI CC. */
@customElement('prompt-controller')
export class PromptController extends LitElement {
  static override styles = css`
    .prompt {
      width: 95%;
      height: 95%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 0.6rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      margin: auto;
    }
    
    .prompt::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    .prompt:hover::before {
      opacity: 1;
    }
    
    .prompt:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    weight-slider {
      width: 80%;
      flex-shrink: 0;
      margin-bottom: 0.5rem;
    }
    
    #midi {
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      text-align: center;
      font-size: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      padding: 0.25rem 0.5rem;
      color: rgba(255, 255, 255, 0.8);
      background: rgba(0, 0, 0, 0.3);
      cursor: pointer;
      visibility: hidden;
      user-select: none;
      margin-top: 0.5rem;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
      font-weight: 500;
      
      .learn-mode & {
        color: #fbbf24;
        border-color: #fbbf24;
        background: rgba(251, 191, 36, 0.1);
        animation: pulse 1.5s ease-in-out infinite;
      }
      
      .show-cc & {
        visibility: visible;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-1px);
      }
    }
    
    #text {
      font-weight: 600;
      font-size: 0.9rem;
      max-width: 100%;
      min-width: 60px;
      padding: 0.5rem 0.75rem;
      margin: 0.5rem 0;
      flex-shrink: 0;
      border-radius: 8px;
      text-align: center;
      white-space: pre;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      outline: none;
      -webkit-font-smoothing: antialiased;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
      
      &:not(:focus) {
        text-overflow: ellipsis;
      }
      
      &:focus {
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(0, 0, 0, 0.6);
        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
      }
    }
    
    :host([filtered]) {
      weight-slider { 
        opacity: 0.5;
      }
      
      #text {
        background: rgba(220, 38, 38, 0.8);
        border-color: rgba(220, 38, 38, 0.6);
        color: #fff;
        position: relative;
        z-index: 1;
      }
      
      .prompt::after {
        content: 'FILTERED';
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(220, 38, 38, 0.9);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.6rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
    
    .prompt-indicator {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
    }
    
    .prompt-indicator.active {
      background: currentColor;
      box-shadow: 0 0 10px currentColor;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.1); }
    }
    
    @media only screen and (max-width: 768px) {
      .prompt {
        width: 92%;
        height: 92%;
        padding: 0.5rem;
        border-radius: 12px;
      }
      
      #text {
        font-size: 0.8rem;
        padding: 0.4rem 0.6rem;
      }
      
      #midi {
        font-size: 0.7rem;
        padding: 0.2rem 0.4rem;
      }
      
      weight-slider {
        width: 70%;
      }
    }
  `;

  @property({ type: String }) promptId = '';
  @property({ type: String }) text = '';
  @property({ type: Number }) weight = 0;
  @property({ type: String }) color = '';
  @property({ type: Boolean, reflect: true }) filtered = false;

  @property({ type: Number }) cc = 0;
  @property({ type: Number }) channel = 0; // Not currently used

  @property({ type: Boolean }) learnMode = false;
  @property({ type: Boolean }) showCC = false;

  @query('weight-slider') private weightInput!: WeightSlider;
  @query('#text') private textInput!: HTMLInputElement;

  @property({ type: Object })
  midiDispatcher: MidiDispatcher | null = null;

  @property({ type: Number }) audioLevel = 0;

  private lastValidText!: string;

  override connectedCallback() {
    super.connectedCallback();
    this.midiDispatcher?.addEventListener('cc-message', (e: Event) => {
      const customEvent = e as CustomEvent<ControlChange>;
      const { channel, cc, value } = customEvent.detail;
      if (this.learnMode) {
        this.cc = cc;
        this.channel = channel;
        this.learnMode = false;
        this.dispatchPromptChange();
      } else if (cc === this.cc) {
        this.weight = (value / 127) * 2;
        this.dispatchPromptChange();
      }
    });
  }

  override firstUpdated() {
    // contenteditable is applied to textInput so we can "shrink-wrap" to text width
    // It's set here and not render() because Lit doesn't believe it's a valid attribute.
    this.textInput.setAttribute('contenteditable', 'plaintext-only');

    // contenteditable will do weird things if this is part of the template.
    this.textInput.textContent = this.text;
    this.lastValidText = this.text;
  }

  update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('showCC') && !this.showCC) {
      this.learnMode = false;
    }
    if (changedProperties.has('text') && this.textInput) {
      this.textInput.textContent = this.text;
    }
    super.update(changedProperties);
  }

  private dispatchPromptChange() {
    this.dispatchEvent(
      new CustomEvent<Prompt>('prompt-changed', {
        detail: {
          promptId: this.promptId,
          text: this.text,
          weight: this.weight,
          cc: this.cc,
          color: this.color,
        },
      }),
    );
  }

  private onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.textInput.blur();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      this.resetText();
      this.textInput.blur();
    }
  }

  private resetText() {
    this.text = this.lastValidText;
    this.textInput.textContent = this.lastValidText;
  }

  private async updateText() {
    const newText = this.textInput.textContent?.trim();
    if (!newText) {
      this.resetText();
    } else {
      this.text = newText;
      this.lastValidText = newText;
    }
    this.dispatchPromptChange();
    // Show the prompt from the beginning if it's cropped
    this.textInput.scrollLeft = 0;
  }

  private onFocus() {
    // .select() for contenteditable doesn't work.
    const selection = window.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(this.textInput);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  private updateWeight() {
    this.weight = this.weightInput.value;
    this.dispatchPromptChange();
  }

  private toggleLearnMode() {
    this.learnMode = !this.learnMode;
  }

  override render() {
    const classes = classMap({
      'prompt': true,
      'learn-mode': this.learnMode,
      'show-cc': this.showCC,
    });
    
    return html`<div class=${classes}>
      <div class="prompt-indicator ${this.weight > 0 ? 'active' : ''}" style="color: ${this.color}"></div>
      
      <weight-slider
        id="weight"
        value=${this.weight}
        color=${this.filtered ? '#888' : this.color}
        audioLevel=${this.filtered ? 0 : this.audioLevel}
        @input=${this.updateWeight}></weight-slider>
      
      <span
        id="text"
        spellcheck="false"
        @focus=${this.onFocus}
        @keydown=${this.onKeyDown}
        @blur=${this.updateText}></span>
      
      <div id="midi" @click=${this.toggleLearnMode}>
        ${this.learnMode ? 'Learn' : `CC:${this.cc}`}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'prompt-controller': PromptController;
  }
} 
