import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('subscription-gate')
export class SubscriptionGate extends LitElement {
  static override styles = css`
    :host { display:block; }
    .overlay { position: fixed; inset: 0; background: radial-gradient(1200px 800px at 70% -10%, rgba(131,92,255,0.12), transparent), #0b0b0b; display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 2000; }
    .card { width: min(920px, 100%); background: #111; border: 1px solid #262626; border-radius: 14px; box-shadow: 0 30px 80px rgba(0,0,0,0.6); display: grid; grid-template-columns: 1.2fr 1fr; overflow: hidden; }
    .hero { padding: 28px; }
    .eyebrow { font-weight: 800; color: var(--brand, #29F2C6); letter-spacing: .8px; text-transform: uppercase; }
    .title { margin: 6px 0 8px; font-size: 28px; font-weight: 900; color: #e5e5e5; }
    .subtitle { color: #cfcfcf; opacity: .9; }
    .bullets { margin: 16px 0 0; padding-left: 18px; color: #e5e5e5; }
    .bullets li { margin: 6px 0; }
    .cta { display:flex; gap: 10px; margin-top: 18px; }
    .btn { background: linear-gradient(135deg, var(--brand,#29F2C6) 0%, #0FC9A7 100%); color:#000; border:1px solid var(--brand,#29F2C6); padding:10px 14px; border-radius:8px; cursor:pointer; font-weight:800; }
    .ghost { background: transparent; color: #e5e5e5; border:1px solid #444; }
    .note { margin-top: 10px; color: #a8a8a8; font-size: 12px; }
    .aside { background: linear-gradient(180deg, #151515, #0f0f0f); padding: 24px; border-left: 1px solid #262626; display:flex; flex-direction:column; gap: 10px; }
    .aside h4 { margin: 0; color: var(--brand,#29F2C6); }
    .aside .line { color: #e5e5e5; }
    .links { display:flex; gap: 10px; margin-top: auto; flex-wrap: wrap; }
    .links a { color: #cfcfcf; text-decoration: none; border-bottom: 1px dashed #444; }
    @media (max-width: 860px) { .card { grid-template-columns: 1fr; } }
    .hidden { display:none; }
  `;

  @property({ type: Boolean }) isSubscribed = true;
  @property({ type: String }) checkoutUrl: string | null = null;
  @property({ type: Function }) onCheckout: (() => Promise<void>) | null = null;
  @property({ type: Function }) onVerify: (() => Promise<void>) | null = null;

  private async startTrial() {
    try {
      await this.onCheckout?.();
    } catch {
      const url = this.checkoutUrl || '#';
      window.open(url, '_blank');
    }
  }

  private startDemo() {
    this.dispatchEvent(new CustomEvent('start-demo', { bubbles: true, composed: true }));
  }

  override render() {
    const hidden = this.isSubscribed;
    return html`
      <div class="overlay ${hidden ? 'hidden' : ''}">
        <div class="card" role="dialog" aria-label="deeprabbit subscription">
          <div class="hero">
            <div class="eyebrow">deeprabbit</div>
            <div class="title">Fresh tracks. Forged by AI.</div>
            <div class="subtitle">Generate beats, craft melodies, and arrange ideas with AI you can dial in. Map your MIDI and perform live.</div>
            <ul class="bullets">
              <li>Connect MIDI and select up to 8 styles</li>
              <li>Press Play and blend styles with your knobs</li>
              <li>Export stems when you’re ready</li>
            </ul>
            <div class="cta">
              <button class="btn" @click=${this.startTrial}>Start 7‑day free trial</button>
              <button class="btn ghost" @click=${async () => { try { await this.onVerify?.(); } catch {} }}>Verify subscription</button>
              <button class="btn ghost" @click=${this.startDemo}>Try a demo</button>
            </div>
            <div class="note">No install. Runs in your browser. Demo runs with limited quality.</div>
          </div>
          <aside class="aside">
            <h4>What’s inside</h4>
            <div class="line">• 8-slot style blending with MIDI CCs</div>
            <div class="line">• Tempo/key continuity and loop boundaries</div>
            <div class="line">• Stems and export (MP3 / WAV)</div>
            <div class="line">• Safety limiter on the master bus</div>
            <div class="links">
              <a href="#" target="_blank" rel="noreferrer">Docs</a>
              <a href="#" target="_blank" rel="noreferrer">Changelog</a>
              <button class="btn ghost" @click=${this.startPortal}>Manage subscription</button>
            </div>
          </aside>
        </div>
      </div>
    `;
  }

  private async startPortal() {
    this.dispatchEvent(new CustomEvent('open-portal', { bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'subscription-gate': SubscriptionGate;
  }
}
