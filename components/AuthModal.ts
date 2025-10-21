/**
 * Login/Register Modal Component
 */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { authService, type User } from '../utils/AuthService.js';

@customElement('auth-modal')
export class AuthModal extends LitElement {
  @property({ type: Boolean }) isOpen = false;
  @property({ type: String }) mode: 'login' | 'register' = 'login';
  @state() private email = '';
  @state() private password = '';
  @state() private isLoading = false;
  @state() private error = '';

  static styles = css`
    :host {
      display: block;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border-radius: 16px;
      padding: 2rem;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #fff;
      margin: 0 0 0.5rem 0;
    }

    .modal-subtitle {
      color: #a0a0a0;
      font-size: 0.9rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      color: #fff;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 1rem;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #9900ff;
      box-shadow: 0 0 0 3px rgba(153, 0, 255, 0.1);
    }

    .form-input::placeholder {
      color: #666;
    }

    .error-message {
      color: #ff6b6b;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      text-align: center;
    }

    .submit-button {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #9900ff 0%, #5200ff 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 1rem;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(153, 0, 255, 0.3);
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .mode-switch {
      text-align: center;
      color: #a0a0a0;
      font-size: 0.9rem;
    }

    .mode-link {
      color: #9900ff;
      text-decoration: none;
      cursor: pointer;
      font-weight: 500;
    }

    .mode-link:hover {
      text-decoration: underline;
    }

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: #a0a0a0;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    .hidden {
      display: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.error = '';

    try {
      let response;
      if (this.mode === 'login') {
        response = await authService.login(this.email, this.password);
      } else {
        response = await authService.register(this.email, this.password);
      }

      // Dispatch success event
      this.dispatchEvent(new CustomEvent('auth-success', {
        detail: { user: response.user, mode: this.mode },
        bubbles: true
      }));

      this.close();
    } catch (error: any) {
      this.error = error.message || 'Authentication failed';
    } finally {
      this.isLoading = false;
    }
  }

  private switchMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.error = '';
    this.email = '';
    this.password = '';
  }

  private close() {
    this.isOpen = false;
    this.error = '';
    this.email = '';
    this.password = '';
  }

  render() {
    if (!this.isOpen) return html``;

    return html`
      <div class="modal-overlay" @click=${(e: Event) => e.target === e.currentTarget && this.close()}>
        <div class="modal-content">
          <button class="close-button" @click=${this.close}>×</button>
          
          <div class="modal-header">
            <h2 class="modal-title">
              ${this.mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p class="modal-subtitle">
              ${this.mode === 'login' 
                ? 'Sign in to continue creating music' 
                : 'Join DeepRabbit and start creating music'}
            </p>
          </div>

          <form @submit=${this.handleSubmit}>
            <div class="form-group">
              <label class="form-label" for="email">Email</label>
              <input
                id="email"
                type="email"
                class="form-input"
                placeholder="your@email.com"
                .value=${this.email}
                @input=${(e: Event) => this.email = (e.target as HTMLInputElement).value}
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="password">Password</label>
              <input
                id="password"
                type="password"
                class="form-input"
                placeholder="••••••••"
                .value=${this.password}
                @input=${(e: Event) => this.password = (e.target as HTMLInputElement).value}
                required
              />
            </div>

            ${this.error ? html`<div class="error-message">${this.error}</div>` : ''}

            <button 
              type="submit" 
              class="submit-button"
              ?disabled=${this.isLoading}
            >
              ${this.isLoading ? 'Please wait...' : (this.mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div class="mode-switch">
            ${this.mode === 'login' 
              ? html`Don't have an account? <span class="mode-link" @click=${this.switchMode}>Sign up</span>`
              : html`Already have an account? <span class="mode-link" @click=${this.switchMode}>Sign in</span>`
            }
          </div>
        </div>
      </div>
    `;
  }
}

