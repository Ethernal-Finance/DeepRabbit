/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('subscription-gate')
export class SubscriptionGate extends LitElement {
  static override styles = css`
    :host { position: fixed; inset: 0; display: grid; place-items: center; background: #0b0b0b; z-index: 4000; }
    .card {
      width: min(720px, 92vw);
      border: 1px solid #262626;
      border-radius: 12px;
      background: radial-gradient(1200px 600px at 10% 0%, rgba(41,242,198,.06), transparent), #111;
      padding: 28px;
      color: #e5e5e5;
      box-shadow: 0 20px 60px rgba(0,0,0,.6);
    }
    h1 { margin: 0 0 8px; font-size: 22px; color: #29F2C6; }
    p { margin: 6px 0; color: #cfcfcf; }
    .row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
    button {
      background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
      border: 1px solid #444;
      color: #e0e0e0;
      padding: 10px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .5px;
      transition: all .2s ease;
    }
    button:hover { transform: translateY(-1px); border-color: #666; }
    .primary { background: linear-gradient(135deg, #29F2C6 0%, #0FC9A7 100%); color: #000; border-color: #29F2C6; }
    .muted { opacity: .8; }
    .hint { font-size: 12px; color: #a8a8a8; margin-top: 10px; }
  `;

  @property({ type: String }) userId = '';
  @property({ type: String }) email = '';
  @state() private busy = false;

  private async upgrade() {
    if (!this.userId) { this.toast('Sign-in required before upgrading.'); return; }
    this.busy = true;
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.userId, email: this.email })
      });
      const data = await r.json();
      if (data?.url) window.location.href = data.url;
      else this.toast('Upgrade link unavailable.');
    } catch (e: any) {
      this.toast(e?.message || 'Upgrade failed');
    } finally { this.busy = false; }
  }

  private async manage() {
    if (!this.userId) { this.toast('Sign-in required.'); return; }
    this.busy = true;
    try {
      const r = await fetch('/api/portal', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: this.userId })
      });
      const data = await r.json();
      if (data?.url) window.location.href = data.url;
      else this.toast('Portal unavailable.');
    } catch (e: any) {
      this.toast(e?.message || 'Portal failed');
    } finally { this.busy = false; }
  }

  private refresh() {
    this.dispatchEvent(new CustomEvent('refresh-plan', { bubbles: true, composed: true }));
  }

  private toast(msg: string) {
    this.dispatchEvent(new CustomEvent('notify', { detail: msg, bubbles: true, composed: true }));
  }

  override render() {
    const host = (window?.location?.hostname || '').toLowerCase();
    const isDev = host === 'localhost' || host === '127.0.0.1';
    return html`
      <div class="card" role="dialog" aria-modal="true" aria-label="Subscription required">
        <h1>DeepRabbit Pro required</h1>
        <p>Upgrade to use the live music studio. Your account is currently on Free.</p>
        <div class="row">
          <button class="primary" ?disabled=${this.busy} @click=${this.upgrade}>Upgrade</button>
          <button ?disabled=${this.busy} @click=${this.manage}>Manage billing</button>
          <button class="muted" ?disabled=${this.busy} @click=${this.refresh}>I’ve upgraded — Refresh</button>
          ${isDev ? html`<button class="muted" @click=${() => this.dispatchEvent(new CustomEvent('dev-bypass', {bubbles:true, composed:true}))}>Skip for Dev</button>` : ''}
        </div>
        <div class="hint">We’ll unlock the studio as soon as your plan is Pro.</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'subscription-gate': SubscriptionGate;
  }
}


