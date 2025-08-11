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
          <div class="brand">Music Maker — Quick Guide</div>
          <button class="close" @click=${this.close}>Close</button>
        </div>
        <div class="content">
          <h3>Make music</h3>
          <ul>
            <li>Select styles from the left panel to add them to the grid (max slots shown in toolbar).</li>
            <li>Press Play. Move grid sliders to blend styles; higher = louder/denser for that style.</li>
            <li>Remove a style: click the ✕ on its tile. Non‑grid styles are silent.</li>
          </ul>

          <h3>Scenes (instant morphs)</h3>
          <ul>
            <li>Open Scenes in the toolbar. Click “Save Scene” to capture current mix and grid.</li>
            <li>Recall a scene to morph weights over 1/2/4/8s. Use ✎ to rename, 🗑 to delete.</li>
          </ul>

          <h3>Evolve (auto changes)</h3>
          <ul>
            <li>Toggle EVOLVE in the toolbar for subtle, periodic variation of active styles.</li>
            <li>Use Rate and Depth selects to set how often and how much it changes.</li>
          </ul>

          <h3>MIDI control</h3>
          <ul>
            <li>Click “Click to learn” on a grid slot, then turn a knob to bind that slot to a MIDI CC.</li>
            <li>Instrument sliders can also be mapped via their “Click to learn.”</li>
            <li>Desktop: enter Up,Up,Down,Down,Left,Right,Left,Right to unlock slot CC presets (CC48–55).</li>
          </ul>

          <h3>Record & export</h3>
          <ul>
            <li>Use ⏺ to capture a take. Open Export to download WAV or MP3.</li>
          </ul>

          <h3>Tips</h3>
          <ul>
            <li>For clean transitions, lower one style while raising another, or recall a Scene.</li>
            <li>Keep drums/bass steady while morphing leads/chords for DJ‑tight blends.</li>
          </ul>

          <h3>Troubleshooting</h3>
          <ul>
            <li>No sound: ensure at least one grid slider is above zero; then press Play.</li>
            <li>Connection lost: app auto‑reconnects; you may hear a short bumper, then music resumes.</li>
            <li>Filtered text: if a style is blocked, try a different wording/genre.</li>
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


