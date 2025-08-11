import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fetchPlan } from '../src/lib/plan';

@customElement('require-pro')
export class RequirePro extends LitElement {
  @property({ type: String, attribute: 'user-id' }) userId = '';
  @property({ type: String }) email = '';
  @property({ type: Boolean, reflect: true }) inline = false;
  @state() private plan: 'loading' | 'free' | 'pro' | 'unknown' = 'loading';

  static override styles = css`
    :host { display: inline-block; }
    .upgrade {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 1rem;
      border: 1px solid #333;
      border-radius: 8px;
      background: #1a1a1a;
      color: #fff;
    }
    button {
      padding: 0.5rem 1rem;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background: #29f2c6;
      color: #000;
      font-weight: 600;
    }
    .inline-btn {
      background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
      border: 1px solid #444;
      color: #e0e0e0;
      padding: 10px 18px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      position: relative;
      overflow: hidden;
    }
    .inline-btn:hover {
      background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
      border-color: #555;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    this.loadPlan();
  }

  private async loadPlan() {
    if (!this.userId) { this.plan = 'free'; return; }
    try {
      const p = await fetchPlan(this.userId);
      this.plan = p.plan;
    } catch {
      this.plan = 'free';
    }
  }

  private async upgrade() {
    const r = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.userId, email: this.email })
    });
    const data = await r.json();
    window.location.href = data.url;
  }

  private async manage() {
    const r = await fetch('/api/portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: this.userId })
    });
    const data = await r.json();
    window.location.href = data.url;
  }

  override render() {
    if (this.plan === 'loading') return html`<span style="opacity:.7">…</span>`;
    if (this.plan === 'pro') return html`<slot></slot>`;
    if (this.inline) {
      return html`<button class="inline-btn" @click=${this.upgrade} title="Upgrade to Pro to use this">Pro</button>`;
    }
    return html`<div class="upgrade">
      <slot name="fallback"><p>Unlock DeepRabbit Pro to use this feature.</p></slot>
      <button @click=${this.upgrade}>Upgrade</button>
      <button @click=${this.manage}>Manage billing</button>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'require-pro': RequirePro;
  }
}
