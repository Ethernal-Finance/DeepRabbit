/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gf-brand')
export class Branding extends LitElement {
  static override styles = css`
    :host { display: inline-flex; align-items: center; gap: 10px; }
    .logo { width: 20px; height: 20px; }
    .name { color: #29F2C6; font-weight: 900; letter-spacing: 1px; }
  `;

  @property({ type: String }) name = 'deeprabbit';

  private logo() {
    return html`
      <svg class="logo" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${this.name}">
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#29F2C6"/>
            <stop offset="100%" stop-color="#0FC9A7"/>
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="56" height="56" rx="12" fill="#111" stroke="url(#g2)" stroke-width="3"/>
        <path d="M20,32c0,-8 6,-14 14,-14c8,0 14,6 14,14c0,8 -6,14 -14,14h-2v-10h10" fill="none" stroke="url(#g2)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }

  override render() {
    return html`
      ${this.logo()}
      <span class="name">${this.name}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gf-brand': Branding;
  }
}


