/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('help-panel')
export class HelpPanel extends LitElement {
  static override styles = css`
    :host { position: fixed; inset: 0; display: block; z-index: 2000; }
    .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.6); }
    .sheet {
      position: absolute; right: 0; top: 0; bottom: 0; width: min(520px, 100%);
      background: var(--panel-2, #151515);
      border-left: 1px solid var(--border, #262626);
      box-shadow: -20px 0 60px rgba(0,0,0,0.5);
      display: flex; flex-direction: column;
    }
    .head { display:flex; align-items:center; justify-content:space-between; padding:16px 18px; border-bottom:1px solid var(--border, #262626); }
    .brand { display:flex; align-items:center; gap:10px; color: var(--text, #e5e5e5); font-weight: 900; letter-spacing: .5px; }
    .close { background: transparent; border: 1px solid var(--border, #262626); color: var(--text, #e5e5e5); border-radius: 6px; padding: 6px 10px; cursor: pointer; }
    .content { padding: 16px 18px; overflow: auto; }
    h3 { margin: 16px 0 8px; color: var(--brand, #29F2C6); }
    ul { margin: 0 0 12px 20px; }
    li { margin: 6px 0; line-height: 1.5; color: var(--text, #e5e5e5); }
    .kbd { display:inline-block; padding:2px 6px; border:1px solid var(--border,#262626); border-radius:4px; background: var(--panel,#111); font-size: 12px; }
  `;

  @property({ type: Boolean, reflect: true }) open = false;

  private close = () => this.dispatchEvent(new CustomEvent('close'));

  override render() {
    if (!this.open) return html``;
    return html`
      <div class="backdrop" @click=${this.close}></div>
      <div class="sheet" @click=${(e: Event) => e.stopPropagation()}>
        <div class="head">
          <div class="brand">How to use deeprabbit</div>
          <button class="close" @click=${this.close}>Close</button>
        </div>
        <div class="content">
          <h3>Quick start</h3>
          <ul>
            <li>Connect your MIDI controller and click the MIDI button to choose an input.</li>
            <li>Select up to 8 styles for the grid.</li>
            <li>Press Play.</li>
            <li>Move mapped knobs to blend styles in real time.</li>
            <li>Export stems when ready.</li>
          </ul>

          <h3>Mapping controls</h3>
          <ul>
            <li>Click “Click to learn” on a grid slot, then turn a knob to bind that slot to a MIDI CC.</li>
            <li>Use the Instruments panel to adjust instrument layers. Click its “Click to learn” to map a MIDI CC.</li>
          </ul>

          <h3>Performance tips</h3>
          <ul>
            <li>Curate your Tracks list with a wide range of styles, then toggle which 8 are active for each song.</li>
            <li>Use the left panel to quickly select/deselect styles. Non‑grid items are muted automatically.</li>
            <li>For smooth transitions, move one style down while bringing another up.</li>
          </ul>

          <h3>Links</h3>
          <ul>
            <li><a href="#" target="_blank" rel="noreferrer">Docs</a></li>
            <li><a href="#" target="_blank" rel="noreferrer">Changelog</a></li>
          </ul>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'help-panel': HelpPanel;
  }
}


