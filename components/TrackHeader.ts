/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/** A professional DAW-style track header component */
@customElement('track-header')
export class TrackHeader extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      height: 60px;
      background: var(--panel);
      border-bottom: 1px solid var(--border);
      position: relative;
    }
    
    .track-header-container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 20px;
      gap: 15px;
    }
    
    .track-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }
    
    .track-color {
      width: 16px;
      height: 16px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    
    .track-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    }
    
    .track-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .control-button {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid var(--border);
      background: var(--panel-2);
      color: var(--muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.2s ease;
      position: relative;
    }
    
    .control-button:hover {
      background: #444;
      border-color: #666;
      color: #e0e0e0;
    }
    
    .control-button.active {
      background: var(--brand);
      color: #000;
      border-color: var(--brand);
    }
    
    .control-button.recording {
      background: #ff4444;
      color: #fff;
      border-color: #ff4444;
      animation: pulse 1s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    .control-button.solo {
      background: #ffaa00;
      color: #000;
      border-color: #ffaa00;
    }
    
    .control-button.muted {
      background: #666;
      color: #fff;
      border-color: #666;
    }
    
    .control-button.record {
      background: #ff4444;
      color: #fff;
      border-color: #ff4444;
    }
    
    .control-button.record:hover {
      background: #ff6666;
      border-color: #ff6666;
    }
    
    .control-button.record.active {
      background: #ff0000;
      border-color: #ff0000;
      animation: pulse 1s ease-in-out infinite;
    }
    
    .track-level {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }
    
    .level-meter {
      width: 8px;
      height: 40px;
      background: #222;
      border: 1px solid #555;
      border-radius: 2px;
      position: relative;
      overflow: hidden;
    }
    
    .level-fill {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #00ff88;
      transition: height 0.1s ease;
      border-radius: 1px;
    }
    
    .level-fill.warning {
      background: #ffaa00;
    }
    
    .level-fill.clipping {
      background: #ff4444;
    }
    
    .level-value {
      font-size: 10px;
      color: #888;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      min-width: 30px;
      text-align: right;
    }
    
    .track-pan {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: 15px;
    }
    
    .pan-label {
      font-size: 10px;
      color: #888;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    }
    
    .pan-value {
      font-size: 10px;
      color: #e0e0e0;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      background: #333;
      padding: 2px 6px;
      border-radius: 2px;
      border: 1px solid #555;
      min-width: 25px;
      text-align: center;
    }
    
    .track-settings {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: 15px;
    }
    
    .settings-button {
      width: 20px;
      height: 20px;
      border-radius: 3px;
      border: 1px solid #555;
      background: #333;
      color: #888;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      transition: all 0.2s ease;
    }
    
    .settings-button:hover {
      background: #444;
      border-color: #666;
      color: #e0e0e0;
    }
  `;

  @property({ type: String }) trackName = 'Track';
  @property({ type: String }) trackColor = '#666';
  @property({ type: Boolean }) isRecording = false;
  @property({ type: Boolean }) isSolo = false;
  @property({ type: Boolean }) isMuted = false;
  @property({ type: Number }) level = 0;
  @property({ type: Number }) pan = 0;
  @property({ type: Boolean }) isSelected = false;

  private toggleRecord() {
    this.isRecording = !this.isRecording;
    this.dispatchEvent(new CustomEvent('record-toggled', { detail: this.isRecording }));
  }

  private toggleSolo() {
    this.isSolo = !this.isSolo;
    this.dispatchEvent(new CustomEvent('solo-toggled', { detail: this.isSolo }));
  }

  private toggleMute() {
    this.isMuted = !this.isMuted;
    this.dispatchEvent(new CustomEvent('mute-toggled', { detail: this.isMuted }));
  }

  private getLevelClass(): string {
    if (this.level > 0.9) return 'clipping';
    if (this.level > 0.7) return 'warning';
    return '';
  }

  private getLevelHeight(): string {
    return `${this.level * 100}%`;
  }

  private formatLevel(): string {
    return `${Math.round(this.level * 100)}%`;
  }

  private formatPan(): string {
    if (this.pan === 0) return 'C';
    if (this.pan > 0) return `R${this.pan}`;
    return `L${Math.abs(this.pan)}`;
  }

  override render() {
    return html`
      <div class="track-header-container">
        <div class="track-info">
          <div class="track-color" style="background-color: ${this.trackColor}"></div>
          <div class="track-name">${this.trackName}</div>
        </div>
        
        <div class="track-controls">
          <button class="control-button record ${this.isRecording ? 'active' : ''}" 
                  @click=${this.toggleRecord} 
                  title="Record">
            ●
          </button>
          <button class="control-button solo ${this.isSolo ? 'active' : ''}" 
                  @click=${this.toggleSolo} 
                  title="Solo">
            S
          </button>
          <button class="control-button muted ${this.isMuted ? 'active' : ''}" 
                  @click=${this.toggleMute} 
                  title="Mute">
            M
          </button>
        </div>
        
        <div class="track-level">
          <div class="level-meter">
            <div class="level-fill ${this.getLevelClass()}" style="height: ${this.getLevelHeight()}"></div>
          </div>
          <div class="level-value">${this.formatLevel()}</div>
        </div>
        
        <div class="track-pan">
          <span class="pan-label">PAN</span>
          <div class="pan-value">${this.formatPan()}</div>
        </div>
        
        <div class="track-settings">
          <button class="settings-button" title="Track Settings">⚙</button>
          <button class="settings-button" title="Track Effects">FX</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'track-header': TrackHeader;
  }
}
