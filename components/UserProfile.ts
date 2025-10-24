/**
 * User Profile Component
 */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { authService, type User } from '../utils/AuthService.js';

@customElement('user-profile')
export class UserProfile extends LitElement {
  @property({ type: Object }) user: User | null = null;
  @state() private isOpen = false;
  @state() private isLoading = false;

  static styles = css`
    :host {
      display: block;
    }

    .profile-button {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 0.5rem 1rem;
      color: #fff;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .profile-button:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .user-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: linear-gradient(135deg, #9900ff 0%, #5200ff 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 600;
      color: white;
    }

    .dropdown {
      position: relative;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 0.5rem 0;
      min-width: 200px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 1000;
    }

    .dropdown-item {
      display: block;
      width: 100%;
      padding: 0.75rem 1rem;
      color: #fff;
      text-decoration: none;
      font-size: 0.9rem;
      transition: background 0.2s ease;
      border: none;
      background: none;
      cursor: pointer;
      text-align: left;
    }

    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .dropdown-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 0.5rem 0;
    }

    .user-info {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .user-name {
      font-weight: 600;
      color: #fff;
      margin-bottom: 0.25rem;
    }

    .user-email {
      font-size: 0.8rem;
      color: #a0a0a0;
    }

    .logout-button {
      color: #ff6b6b;
    }

    .logout-button:hover {
      background: rgba(255, 107, 107, 0.1);
    }

    .hidden {
      display: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  private handleOutsideClick(e: Event) {
    if (this.isOpen && !this.shadowRoot?.contains(e.target as Node)) {
      this.isOpen = false;
    }
  }

  private toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  private async handleLogout() {
    this.isLoading = true;
    
    try {
      await authService.logout();
      
      // Dispatch logout event
      this.dispatchEvent(new CustomEvent('auth-logout', {
        bubbles: true
      }));
      
      this.isOpen = false;
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private getUserInitials(): string {
    if (!this.user?.email) return '?';
    return this.user.email.charAt(0).toUpperCase();
  }

  render() {
    if (!this.user) return html``;

    return html`
      <div class="dropdown">
        <button class="profile-button" @click=${this.toggleDropdown}>
          <div class="user-avatar">${this.getUserInitials()}</div>
          ${this.user.email}
        </button>

        <div class="dropdown-menu ${this.isOpen ? '' : 'hidden'}">
          <div class="user-info">
            <div class="user-name">${this.user.email}</div>
            <div class="user-email">Member since ${new Date(this.user.created_at).toLocaleDateString()}</div>
          </div>
          
          <div class="dropdown-divider"></div>
          
          <button 
            class="dropdown-item logout-button"
            @click=${this.handleLogout}
            ?disabled=${this.isLoading}
          >
            ${this.isLoading ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    `;
  }
}



