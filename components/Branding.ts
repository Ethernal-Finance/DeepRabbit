/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gf-brand')
export class Branding extends LitElement {
  static override styles = css`
    :host { display: inline-flex; align-items: center; gap: 12px; }
    .logo { width: 48px; height: 48px; object-fit: contain; }
    .name { color: #29F2C6; font-weight: 900; letter-spacing: 1px; }
  `;

  @property({ type: String }) name = 'deeprabbit.net';

  private logo() {
    return html`
      <img class="logo" src="/logo.png" alt="${this.name}" />
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


