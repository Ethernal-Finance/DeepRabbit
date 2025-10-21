/**
 * Authentication service for DeepRabbit
 * Replaces Supabase auth with custom Flask backend
 */

export interface User {
  id: number;
  email: string;
  created_at: string;
  last_login: string | null;
  is_active: boolean;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface ApiError {
  error: string;
}

class AuthService {
  private baseUrl: string;

  constructor() {
    // Use environment variable or default to deployed API
    this.baseUrl = import.meta.env.VITE_API_URL || 'https://deeprabbit.net/api';
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookie-based auth
    };

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, mergedOptions);
      
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Register a new user
   */
  async register(email: string, password: string): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  /**
   * Logout user
   */
  async logout(): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<{ message: string }> {
    return this.makeRequest<{ message: string }>('/auth/refresh', {
      method: 'POST',
    });
  }

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<{ user: User }> {
    return this.makeRequest<{ user: User }>('/auth/me');
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.makeRequest<{ status: string; timestamp: string }>('/health');
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;

