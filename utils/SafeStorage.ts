/**
 * Safe localStorage wrapper with error handling
 */
export class SafeStorage {
  private static isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static setItem(key: string, value: string): boolean {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }
    
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn('Failed to set localStorage item:', error);
      return false;
    }
  }

  static getItem(key: string): string | null {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return null;
    }
    
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Failed to get localStorage item:', error);
      return null;
    }
  }

  static removeItem(key: string): boolean {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Failed to remove localStorage item:', error);
      return false;
    }
  }

  static clear(): boolean {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }
    
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
      return false;
    }
  }
}
