/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { svg, css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PlaybackState } from '../types';

@customElement('play-pause-button')
export class PlayPauseButton extends LitElement {

  @property({ type: String }) playbackState: PlaybackState = 'stopped';

  static override styles = css`
    :host {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 48px;
    }
    
    :host(:hover) .button-container {
      transform: scale(1.05);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
    }
    
    .button-container {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0;
      border: 3px solid #444;
      background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0f0f0f 100%);
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 1.56, 0.32, 0.99);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-shadow: 
        0 6px 20px rgba(0, 0, 0, 0.6), 
        inset 0 2px 4px rgba(255, 255, 255, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    }
    
    .button-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #29F2C6 0%, #0FC9A7 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .button-container:hover::before {
      opacity: 0.15;
    }
    
    .button-container.playing {
      border-color: #29F2C6;
      box-shadow: 
        0 6px 30px rgba(41, 242, 198, 0.4), 
        inset 0 2px 4px rgba(255, 255, 255, 0.2),
        0 0 0 1px rgba(41, 242, 198, 0.3);
      animation: playingPulse 2s ease-in-out infinite;
    }
    
    @keyframes playingPulse {
      0%, 100% { 
        box-shadow: 
          0 6px 30px rgba(41, 242, 198, 0.4), 
          inset 0 2px 4px rgba(255, 255, 255, 0.2),
          0 0 0 1px rgba(41, 242, 198, 0.3);
      }
      50% { 
        box-shadow: 
          0 8px 40px rgba(41, 242, 198, 0.6), 
          inset 0 2px 4px rgba(255, 255, 255, 0.3),
          0 0 0 2px rgba(41, 242, 198, 0.5);
      }
    }
    
    .button-container.playing::before {
      opacity: 0.25;
    }
    
    .icon-container {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 65%;
      height: 65%;
      color: #e0e0e0;
      transition: all 0.3s ease;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
    }
    
    .icon-container svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.8));
    }
    
    .button-container.playing .icon-container {
      color: #29F2C6;
      filter: drop-shadow(0 0 15px rgba(41, 242, 198, 0.8));
    }
    
    .loader {
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      animation: spin linear 1s infinite;
      transform-origin: center;
      transform-box: fill-box;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(359deg); }
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(41, 242, 198, 0.4);
      transform: scale(0);
      animation: ripple 0.8s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .status-indicator {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: linear-gradient(135deg, #29F2C6 0%, #0FC9A7 100%);
      border: 3px solid #1a1a1a;
      opacity: 0;
      transition: opacity 0.3s ease;
      box-shadow: 0 4px 15px rgba(41, 242, 198, 0.6);
    }
    
    .status-indicator.playing {
      opacity: 1;
      animation: statusPulse 2s ease-in-out infinite;
    }
    
    @keyframes statusPulse {
      0%, 100% { 
        transform: scale(1); 
        box-shadow: 0 4px 15px rgba(41, 242, 198, 0.6);
      }
      50% { 
        transform: scale(1.2); 
        box-shadow: 0 6px 25px rgba(41, 242, 198, 0.8);
      }
    }
    
    /* Professional DAW-style button states */
    .button-container:active {
      transform: scale(0.98);
      box-shadow: 
        0 3px 12px rgba(0, 0, 0, 0.8), 
        inset 0 2px 4px rgba(255, 255, 255, 0.05);
    }
    
    .button-container:focus {
      outline: none;
      border-color: #29F2C6;
      box-shadow: 
        0 0 0 4px rgba(41, 242, 198, 0.3),
        0 6px 20px rgba(0, 0, 0, 0.6);
    }
    
    /* Enhanced hover effects */
    .button-container::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.1) 50%, 
        transparent 100%);
      transition: left 0.6s ease;
    }
    
    .button-container:hover::after {
      left: 100%;
    }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
      :host {
        width: 44px;
        height: 44px;
        touch-action: manipulation;
      }
      
      .button-container {
        border-width: 2px;
        border-radius: 8px;
      }
      
      .button-container:active {
        transform: scale(0.95);
      }
      
      .status-indicator {
        width: 16px;
        height: 16px;
        top: -8px;
        right: -8px;
        border-width: 2px;
      }
    }
    
    @media (max-width: 480px) {
      :host {
        width: 40px;
        height: 40px;
      }
      
      .status-indicator {
        width: 14px;
        height: 14px;
        top: -7px;
        right: -7px;
      }
    }
  `;

  private renderIcon() {
    const iconSize = 24;
    const viewBox = `0 0 ${iconSize} ${iconSize}`;
    
    if (this.playbackState === 'playing') {
      return svg`<svg viewBox=${viewBox} fill="currentColor">
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
      </svg>`;
    } else if (this.playbackState === 'loading') {
      return svg`<svg viewBox=${viewBox} fill="none" stroke="currentColor">
        <circle class="loader" cx="12" cy="12" r="10" stroke-width="2"/>
      </svg>`;
    } else {
      return svg`<svg viewBox=${viewBox} fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>`;
    }
  }

  override render() {
    const buttonClass = this.playbackState === 'playing' ? 'playing' : '';
    
    const ariaLabel = this.playbackState === 'playing' ? 'Pause' : 'Play';
    return html`
      <button
        class="button-container ${buttonClass}"
        type="button"
        aria-label="${ariaLabel}"
        aria-pressed="${this.playbackState === 'playing'}">
        <div class="icon-container">
          ${this.renderIcon()}
        </div>
        <div class="status-indicator ${this.playbackState === 'playing' ? 'playing' : ''}"></div>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'play-pause-button': PlayPauseButton
  }
}
