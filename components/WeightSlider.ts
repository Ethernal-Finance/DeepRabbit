/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/** A modern slider for adjusting and visualizing prompt weight. */
@customElement('weight-slider')
export class WeightSlider extends LitElement {
  static override styles = css`
    :host {
      cursor: pointer;
      position: relative;
      width: 100%;
      height: 140px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      touch-action: none;
    }

    .slider-container {
      position: relative;
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .slider-track {
      position: relative;
      width: 100%;
      height: 14px;
      background: linear-gradient(to bottom, #2a2a2a 0%, #1a1a1a 50%, #0f0f0f 100%);
      border-radius: 7px;
      box-shadow: 
        inset 0 3px 6px rgba(0, 0, 0, 0.8), 
        0 2px 4px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      overflow: hidden;
      border: 2px solid #333;
      position: relative;
      z-index: 1;
    }

    .track-inner {
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0;
    }
    
    .slider-track::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, 
        rgba(0, 255, 136, 0.1) 0%, 
        transparent 20%, 
        transparent 80%, 
        rgba(0, 255, 136, 0.1) 100%);
      opacity: 0.3;
    }

    .slider-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0%;
      border-radius: 7px;
      transition: width 0.1s ease;
      box-shadow: 
        inset 0 2px 4px rgba(255, 255, 255, 0.2),
        0 0 20px currentColor;
      background: linear-gradient(135deg, currentColor 0%, rgba(255, 255, 255, 0.8) 100%);
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    
    .slider-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.3) 50%, 
        transparent 100%);
      animation: shimmer 2s ease-in-out infinite;
    }
    
    @keyframes shimmer {
      0%, 100% { transform: translateX(-100%); }
      50% { transform: translateX(100%); }
    }

    .slider-thumb {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #444 0%, #333 50%, #222 100%);
      border: 3px solid #555;
      border-radius: 50%;
      box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.8), 
        inset 0 2px 4px rgba(255, 255, 255, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.1);
      cursor: grab;
      transition: all 0.2s ease;
      z-index: 2;
      position: relative;
      display: none; /* hide thumb visually */
    }
    
    .slider-thumb::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: linear-gradient(135deg, #666 0%, #444 100%);
      border-radius: 50%;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .slider-thumb:hover {
      transform: translateY(-50%) scale(1.15);
      box-shadow: 
        0 6px 20px rgba(0, 0, 0, 0.9), 
        inset 0 2px 4px rgba(255, 255, 255, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.2);
      border-color: #777;
    }

    .slider-thumb:active {
      cursor: grabbing;
      transform: translateY(-50%) scale(1.05);
      box-shadow: 
        0 3px 10px rgba(0, 0, 0, 1), 
        inset 0 2px 4px rgba(255, 255, 255, 0.1);
    }

    .value-display {
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
      color: #00ff88;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      z-index: 20;
      border: 2px solid #333;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      letter-spacing: 0.5px;
    }
    
    .value-display::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #00ff88 50%, transparent 100%);
      opacity: 0.6;
    }

    .slider-container:hover .value-display {
      opacity: 1;
      transform: translateX(-50%) translateY(-5px);
    }

    .audio-visualizer {
      position: absolute;
      top: -52px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 30px;
      display: flex;
      align-items: end;
      justify-content: center;
      gap: 4px;
    }

    .audio-bar {
      width: 5px;
      background: currentColor;
      border-radius: 3px;
      transition: height 0.1s ease;
      box-shadow: 0 0 8px currentColor;
      position: relative;
    }
    
    .audio-bar::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(180deg, 
        rgba(255, 255, 255, 0.8) 0%, 
        currentColor 50%, 
        rgba(0, 0, 0, 0.3) 100%);
      border-radius: 3px;
    }

    

    .halo-effect {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 140px;
      height: 140px;
      border-radius: 50%;
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      z-index: -1;
      background: radial-gradient(circle, currentColor 0%, transparent 70%);
    }

    .halo-effect.active {
      opacity: 0.15;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.25; }
    }

    /* Professional DAW-style tick marks */
    .tick-marks {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
    }

    .tick-mark {
      position: absolute;
      top: 50%;
      width: 1px;
      height: 10px;
      background: #444;
      transform: translateY(-50%);
      transition: all 0.2s ease;
    }
    
    .tick-mark:hover {
      background: #666;
      height: 12px;
    }

    .tick-mark.major {
      height: 14px;
      background: #666;
      width: 2px;
    }
    
    .tick-mark.major:hover {
      background: #888;
      height: 16px;
    }

    /* Value markers */
    .value-marker {
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px;
      color: #666;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      transition: all 0.2s ease;
    }
    
    .value-marker:hover {
      color: #888;
      transform: translateX(-50%) scale(1.1);
    }

    @media (max-width: 768px) {
      :host {
        height: 120px;
      }
      
      .slider-container {
        height: 90px;
      }
      
      .slider-track {
        height: 12px;
        width: 100%;
      }
      
      .slider-thumb {
        width: 28px;
        height: 28px;
      }
      
      .value-display {
        font-size: 11px;
        padding: 6px 12px;
      }
      
      .audio-visualizer {
        width: 50px;
        height: 25px;
      }
      
      .audio-bar {
        width: 4px;
      }
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: String }) color = '#000';
  @property({ type: Number }) audioLevel = 0;

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      console.log('WeightSlider value updated to:', this.value);
    }
  }

  private isDragging = false;
  private dragStartX = 0;
  private dragStartValue = 0;

  constructor() {
    super();
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
  }

  private handlePointerDown(e: PointerEvent) {
    e.preventDefault();
    this.isDragging = true;
    this.dragStartX = e.clientX;
    this.dragStartValue = this.value;
    document.body.classList.add('dragging');
    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
  }

  private handlePointerMove(e: PointerEvent) {
    if (!this.isDragging) return;
    
    const delta = e.clientX - this.dragStartX;
    const newValue = this.dragStartValue + delta * 0.01;
    this.setValue(Math.max(0, Math.min(2, newValue)));
  }

  private handlePointerUp() {
    this.isDragging = false;
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    document.body.classList.remove('dragging');
  }

  private handleWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaX || e.deltaY;
    const newValue = this.value + delta * -0.0025;
    this.setValue(Math.max(0, Math.min(2, newValue)));
  }

  private setValue(newValue: number) {
    this.value = newValue;
    this.dispatchEvent(new CustomEvent<number>('input', { detail: this.value }));
  }

  private getSliderFillWidth(): string {
    return `${(this.value / 2) * 100}%`;
  }

  private getSliderThumbPosition(): string {
    // Keep the thumb centered over the track edges, compensating for half thumb width (16px)
    const percent = (this.value / 2) * 100;
    return `calc(${percent}% + 16px)`;
  }

  private getAudioBars(): number[] {
    if (this.audioLevel === 0) return [0, 0, 0, 0, 0];
    
    const maxHeight = 25;
    const baseHeight = Math.max(3, this.audioLevel * maxHeight);
    
    return [
      baseHeight * 0.6,
      baseHeight * 0.8,
      baseHeight,
      baseHeight * 0.7,
      baseHeight * 0.5
    ];
  }

  private getTickMarks() {
    const marks = [];
    for (let i = 0; i <= 10; i++) {
      const position = (i / 10) * 100;
      const isMajor = i % 2 === 0;
      marks.push(html`
        <div class="tick-mark ${isMajor ? 'major' : ''}" style="left: ${position}%"></div>
        ${isMajor ? html`<div class="value-marker" style="left: ${position}%">${(i / 10 * 2).toFixed(1)}</div>` : ''}
      `);
    }
    return marks;
  }

  override render() {
    const fillWidth = this.getSliderFillWidth();
    const thumbPosition = this.getSliderThumbPosition();
    const audioBars = this.getAudioBars();
    
    const fillStyle = styleMap({
      width: fillWidth,
      background: this.color,
    });

    const thumbStyle = styleMap({
      left: thumbPosition,
    });

    const haloStyle = styleMap({
      background: this.color,
      opacity: this.value > 0 ? '0.2' : '0',
    });

    return html`
      <div class="slider-container" 
           @pointerdown=${this.handlePointerDown}
           @wheel=${this.handleWheel}>
        
        <div class="value-display">
          ${this.value.toFixed(2)}
        </div>
        
        <div class="slider-track">
          <div class="track-inner">
            <div class="tick-marks">
              ${this.getTickMarks()}
            </div>
            <div class="slider-fill" style=${fillStyle}></div>
            <div class="slider-thumb" style=${thumbStyle}></div>
          </div>
        </div>
        
        <div class="audio-visualizer" style="color: ${this.color}">
          ${audioBars.map(height => html`
            <div class="audio-bar" style="height: ${height}px"></div>
          `)}
        </div>

        <div class="halo-effect ${this.value > 0 ? 'active' : ''}" style=${haloStyle}></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'weight-slider': WeightSlider;
  }
}
