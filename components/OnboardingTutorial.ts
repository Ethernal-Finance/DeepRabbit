/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('onboarding-tutorial')
export class OnboardingTutorial extends LitElement {
  static override styles = css`
    :host { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; }
    .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.7); }
    .sheet {
      position: relative;
      background: var(--panel-2, #151515);
      border: 1px solid var(--border, #262626);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6);
      padding: 24px;
      width: 90%;
      max-width: 400px;
      color: var(--text, #e5e5e5);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    h2 { margin: 0; font-size: 20px; color: var(--brand, #29F2C6); }
    p { margin: 0; line-height: 1.4; }
    .actions { display: flex; justify-content: space-between; gap: 10px; }
    button { flex: 1; padding: 10px 14px; border: 1px solid var(--border, #262626); border-radius: 6px; background: var(--panel, #111); color: var(--text, #e5e5e5); cursor: pointer; }
    button:hover { background: var(--panel-2, #151515); }
    @media (max-width: 480px) {
      .sheet { width: 95%; padding: 20px; }
      h2 { font-size: 18px; }
    }
  `;

  @state() private step = 0;

  private steps = [
    { title: 'Welcome to deeprabbit', text: 'Use the Styles panel to choose styles for your performance.' },
    { title: 'Blend styles', text: 'Adjust the sliders in the grid and click “Click to learn” to map MIDI controls.' },
    { title: 'Manage instruments', text: 'Use the mixer panel to balance instrument layers and map their controls.' }
  ];

  private next() { if (this.step < this.steps.length - 1) this.step++; else this.finish(); }
  private prev() { if (this.step > 0) this.step--; }
  private skip() { this.finish(); }
  private finish() { this.dispatchEvent(new CustomEvent('finish')); }

  override render() {
    const current = this.steps[this.step];
    return html`
      <div class="backdrop"></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="onboard-title" aria-live="polite">
        <h2 id="onboard-title">${current.title}</h2>
        <p>${current.text}</p>
        <div class="actions">
          ${this.step > 0 ? html`<button @click=${this.prev} aria-label="Previous step">Back</button>` : ''}
          ${this.step < this.steps.length - 1 ? html`
            <button @click=${this.skip} aria-label="Skip tutorial">Skip</button>
            <button @click=${this.next} aria-label="Next step">Next</button>
          ` : html`<button @click=${this.finish} aria-label="Finish tutorial">Finish</button>`}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'onboarding-tutorial': OnboardingTutorial;
  }
}

