/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/** A professional DAW-style timeline ruler component */
@customElement('timeline-ruler')
export class TimelineRuler extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      height: 50px;
      background: linear-gradient(180deg, var(--panel-2) 0%, var(--bg) 100%);
      border-bottom: 2px solid var(--border);
      position: relative;
      overflow: hidden;
    }
    
    .timeline-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .measure-ruler {
      height: 25px;
      background: linear-gradient(180deg, var(--panel) 0%, var(--panel-2) 100%);
      border-bottom: 2px solid var(--border);
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 25px;
    }
    
    .beat-ruler {
      height: 25px;
      background: linear-gradient(180deg, #222 0%, var(--panel-2) 100%);
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 25px;
    }
    
    .measure-marker {
      position: absolute;
      height: 100%;
      width: 1px;
      background: #555;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 3px;
      transition: all 0.2s ease;
    }
    
    .measure-marker:hover {
      background: #777;
      width: 2px;
    }
    
    .measure-marker.major {
      background: #777;
      width: 2px;
    }
    
    .measure-marker.major:hover {
      background: #999;
      width: 3px;
    }
    
    .measure-label {
      font-size: 11px;
      color: var(--muted);
      font-weight: 700;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      transform: rotate(-45deg);
      transform-origin: center;
      white-space: nowrap;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      transition: all 0.2s ease;
    }
    
    .measure-marker:hover .measure-label {
      color: #ccc;
      transform: rotate(-45deg) scale(1.1);
    }
    
    .beat-marker {
      position: absolute;
      height: 100%;
      width: 1px;
      background: #333;
      transition: all 0.2s ease;
    }
    
    .beat-marker:hover {
      background: #555;
      width: 2px;
    }
    
    .beat-marker.strong {
      background: #555;
      width: 1px;
    }
    
    .beat-marker.strong:hover {
      background: #777;
      width: 2px;
    }
    
    .beat-marker.weak {
      background: #222;
      width: 1px;
    }
    
    .beat-marker.weak:hover {
      background: #444;
      width: 2px;
    }
    
    .playhead {
      position: absolute;
      top: 0;
      width: 3px;
      height: 100%;
      background: linear-gradient(180deg, var(--brand) 0%, var(--brand-2) 100%);
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.8);
      z-index: 10;
      transition: left 0.1s ease;
      position: relative;
    }
    
    .playhead::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(0, 255, 136, 0.3) 50%, 
        transparent 100%);
      animation: playheadGlow 2s ease-in-out infinite;
    }
    
    @keyframes playheadGlow {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }
    
    .playhead::after {
      content: '';
      position: absolute;
      top: 0;
      left: -4px;
      width: 10px;
      height: 10px;
      background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.9);
      border: 2px solid #0f0f0f;
    }
    
    .time-display {
      position: absolute;
      top: 3px;
      right: 25px;
      background: linear-gradient(135deg, var(--panel-2) 0%, var(--bg) 100%);
      color: var(--brand);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      border: 2px solid var(--border);
      z-index: 20;
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      letter-spacing: 0.5px;
    }
    
    .time-display::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #00ff88 50%, transparent 100%);
      opacity: 0.6;
    }
    
    .tempo-display {
      position: absolute;
      top: 3px;
      left: 25px;
      background: linear-gradient(135deg, var(--panel-2) 0%, var(--bg) 100%);
      color: var(--muted);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      border: 2px solid var(--border);
      z-index: 20;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      letter-spacing: 0.5px;
    }
    
    .tempo-display::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #aaa 50%, transparent 100%);
      opacity: 0.4;
    }
    
    .grid-snap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .snap-line {
      position: absolute;
      height: 100%;
      width: 1px;
      background: rgba(0, 255, 136, 0.15);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .snap-line.active {
      opacity: 1;
      background: rgba(0, 255, 136, 0.25);
      box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    }
    
    /* Grid overlay for better visual reference */
    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-image: 
        linear-gradient(90deg, rgba(0, 255, 136, 0.02) 1px, transparent 1px),
        linear-gradient(180deg, rgba(0, 255, 136, 0.02) 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0.3;
    }
  `;

  @property({ type: Number }) currentTime = 0;
  @property({ type: Number }) duration = 120; // seconds
  @property({ type: Number }) bpm = 120;
  @property({ type: Number }) timeSignature = 4; // 4/4 time
  @property({ type: Number }) zoom = 1;
  @property({ type: Boolean }) isPlaying = false;

  private getMeasures(): Array<{position: number, number: number, isMajor: boolean}> {
    const measures = [];
    const beatsPerMeasure = this.timeSignature;
    const secondsPerBeat = 60 / this.bpm;
    const secondsPerMeasure = beatsPerMeasure * secondsPerBeat;
    
    for (let i = 0; i <= Math.ceil(this.duration / secondsPerMeasure); i++) {
      const position = (i * secondsPerMeasure / this.duration) * 100;
      measures.push({
        position,
        number: i + 1,
        isMajor: i % 4 === 0
      });
    }
    
    return measures;
  }

  private getBeats(): Array<{position: number, isStrong: boolean}> {
    const beats = [];
    const secondsPerBeat = 60 / this.bpm;
    
    for (let i = 0; i <= Math.ceil(this.duration / secondsPerBeat); i++) {
      const position = (i * secondsPerBeat / this.duration) * 100;
      beats.push({
        position,
        isStrong: i % this.timeSignature === 0
      });
    }
    
    return beats;
  }

  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 30); // 30 fps
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  }

  private getPlayheadPosition(): string {
    return `${(this.currentTime / this.duration) * 100}%`;
  }

  override render() {
    const measures = this.getMeasures();
    const beats = this.getBeats();
    const playheadPosition = this.getPlayheadPosition();
    
    return html`
      <div class="timeline-container">
        <!-- Measure Ruler -->
        <div class="measure-ruler">
          ${measures.map(measure => html`
            <div class="measure-marker ${measure.isMajor ? 'major' : ''}" style="left: ${measure.position}%">
              ${measure.isMajor ? html`<span class="measure-label">${measure.number}</span>` : ''}
            </div>
          `)}
        </div>
        
        <!-- Beat Ruler -->
        <div class="beat-ruler">
          ${beats.map(beat => html`
            <div class="beat-marker ${beat.isStrong ? 'strong' : 'weak'}" style="left: ${beat.position}%"></div>
          `)}
        </div>
        
        <!-- Playhead -->
        <div class="playhead" style="left: ${playheadPosition}"></div>
        
        <!-- Grid Snap Lines -->
        <div class="grid-snap">
          ${beats.map(beat => html`
            <div class="snap-line ${beat.isStrong ? 'active' : ''}" style="left: ${beat.position}%"></div>
          `)}
        </div>
        
        <!-- Time Display -->
        <div class="time-display">
          ${this.formatTime(this.currentTime)}
        </div>
        
        <!-- Tempo Display -->
        <div class="tempo-display">
          ${this.bpm} BPM
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'timeline-ruler': TimelineRuler;
  }
}
