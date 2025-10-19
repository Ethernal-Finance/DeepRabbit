import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('require-pro')
export class RequirePro extends LitElement {

  static override styles = css`
    :host { display: inline-block; }
  `;


  override render() {
    // Always show the content - no pro gating
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'require-pro': RequirePro;
  }
}
