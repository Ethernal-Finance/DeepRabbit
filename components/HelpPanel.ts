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
          <h3>Getting Started</h3>
          <ul>
            <li>Toggle between <strong>Styles</strong> and <strong>Instruments</strong> in the left panel</li>
            <li>Click styles/instruments to add them to your grid (max slots shown in toolbar)</li>
            <li>Press <strong>Play</strong> to start your music. Adjust grid sliders to blend elements</li>
            <li>Higher slider values = more prominent in your mix</li>
          </ul>

          <h3>Mobile Experience</h3>
          <ul>
            <li>Use the <strong>bottom navigation bar</strong> for all controls</li>
            <li><strong>Center Play Button</strong>: Start/stop your music</li>
            <li><strong>Evolve Button</strong>: Auto-evolution controls</li>
            <li><strong>Menu Button</strong>: Access all features</li>
            <li><strong>Settings Button</strong>: Generator settings</li>
            <li><strong>Record Button</strong>: Recording controls</li>
          </ul>

          <h3>Auto-Evolve</h3>
          <ul>
            <li>Enable <strong>EVOLVE</strong> for automatic musical variation</li>
            <li><strong>Rate</strong>: How often changes occur (8s, 16s, 32s, 64s)</li>
            <li><strong>Depth</strong>: How much variation (Subtle, Light, Medium, Bold)</li>
            <li>Creates dynamic, ever-changing performances</li>
          </ul>

          <h3>Scenes & Morphing</h3>
          <ul>
            <li><strong>Save Scene</strong>: Capture current mix and grid settings</li>
            <li><strong>Recall Scene</strong>: Morph to saved settings over time</li>
            <li><strong>Morph Time</strong>: Choose transition speed (1s, 2s, 4s, 8s)</li>
            <li>Perfect for live performances and smooth transitions</li>
          </ul>

          <h3>MIDI Control</h3>
          <ul>
            <li>Click <strong>"Click to learn"</strong> on grid slots, then turn MIDI knobs</li>
            <li>Map instrument sliders via their "Click to learn" buttons</li>
            <li>Desktop: Konami code (↑↑↓↓←→←→) unlocks CC48–55 presets</li>
            <li>Real-time control for live performances</li>
          </ul>

          <h3>Recording & Export</h3>
          <ul>
            <li><strong>Record Button</strong>: Start/stop recording your performance</li>
            <li><strong>Export</strong>: Download your music as WAV or MP3</li>
            <li>Capture your creative moments and share them</li>
          </ul>

          <h3>Pro Tips</h3>
          <ul>
            <li>Use <strong>Active Only</strong> filter to focus on current elements</li>
            <li>Search styles/instruments for quick access</li>
            <li>Keep drums/bass steady while morphing leads for tight blends</li>
            <li>Combine Auto-Evolve with Scenes for dynamic performances</li>
          </ul>

          <h3>Troubleshooting</h3>
          <ul>
            <li><strong>No sound</strong>: Ensure grid sliders are above zero, then press Play</li>
            <li><strong>Connection issues</strong>: App auto-reconnects; music resumes after brief pause</li>
            <li><strong>Mobile zoom</strong>: Fixed with proper input sizing</li>
            <li><strong>Performance</strong>: Close unused popups for better responsiveness</li>
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


