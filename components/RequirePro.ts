import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fetchPlan } from '../src/lib/plan';

@customElement('require-pro')
export class RequirePro extends LitElement {
  @property({ type: String, attribute: 'user-id' }) userId = '';
  @property({ type: String }) email = '';
  @state() private plan: 'loading' | 'free' | 'pro' | 'unknown' = 'loading';

  static override styles = css`
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
    if (this.plan === 'loading') return html`<p>Checking your plan…</p>`;
    if (this.plan === 'pro') return html`<slot></slot>`;
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
