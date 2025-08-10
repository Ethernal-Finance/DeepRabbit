/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('toast-message')
export class ToastMessage extends LitElement {
  static override styles = css`
    .toast {
      line-height: 1.6;
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      width: min(500px, 90vw);
      transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      text-wrap: pretty;
      backdrop-filter: blur(12px);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      z-index: 1000;
    }
    
    .toast::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .toast:hover::before {
      opacity: 1;
    }
    
    .message {
      flex: 1;
      font-weight: 500;
    }
    
    button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    
    button:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      transform: scale(1.1);
    }
    
    .toast:not(.showing) {
      transition-duration: 0.6s;
      transform: translateY(200%);
      opacity: 0;
    }
    
    .toast.showing {
      animation: slideIn 0.4s ease-out;
    }
    
    @keyframes slideIn {
      from {
        transform: translate(-50%, -100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
    
    a {
      color: #60a5fa;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }
    
    a:hover {
      color: #93c5fd;
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      .toast {
        bottom: 10px;
        right: 10px;
        padding: 0.875rem 1rem;
        border-radius: 10px;
        width: calc(100vw - 20px);
      }
      .toast:not(.showing) { transform: translateY(100%); }
      .toast.showing { animation: slideInMobile 0.4s ease-out; }
      @keyframes slideInMobile {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    }
  `;

  @property({ type: String }) message = '';
  @property({ type: Boolean }) showing = false;
  private hideTimer: number | null = null;

  private renderMessageWithLinks() {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = this.message.split( urlRegex );
    return parts.map( ( part, i ) => {
      if ( i % 2 === 0 ) return part;
      return html`<a href=${part} target="_blank" rel="noopener">${part}</a>`;
    } );
  }

  override render() {
    if (!this.showing) return html``;
    return html`<div class=${classMap({ showing: this.showing, toast: true })}>
      <div class="message">${this.renderMessageWithLinks()}</div>
      <button @click=${this.hide}>✕</button>
    </div>`;
  }

  show(message: string) {
    this.showing = true;
    this.message = message;
    if (this.hideTimer) { clearTimeout(this.hideTimer); this.hideTimer = null; }
    this.hideTimer = window.setTimeout(() => this.hide(), 4000);
  }

  hide() {
    this.showing = false;
    if (this.hideTimer) { clearTimeout(this.hideTimer); this.hideTimer = null; }
    setTimeout(() => { this.message = ''; }, 300);
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'toast-message': ToastMessage
  }
}
