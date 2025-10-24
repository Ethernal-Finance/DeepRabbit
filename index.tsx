/**
 * @fileoverview deeprabbit — AI-driven live music performance with MIDI control
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './src/App';


// Early error handling for localStorage issues
(function() {
  const originalLocalStorage = window.localStorage;
  
  if (originalLocalStorage) {
    const safeLocalStorage = {
      getItem: function(key: string) {
        try {
          return originalLocalStorage.getItem(key);
        } catch (error) {
          console.warn('localStorage.getItem blocked:', error);
          return null;
        }
      },
      setItem: function(key: string, value: string) {
        try {
          originalLocalStorage.setItem(key, value);
        } catch (error) {
          console.warn('localStorage.setItem blocked:', error);
        }
      },
      removeItem: function(key: string) {
        try {
          originalLocalStorage.removeItem(key);
        } catch (error) {
          console.warn('localStorage.removeItem blocked:', error);
        }
      },
      clear: function() {
        try {
          originalLocalStorage.clear();
        } catch (error) {
          console.warn('localStorage.clear blocked:', error);
        }
      },
      get length() {
        try {
          return originalLocalStorage.length;
        } catch (error) {
          console.warn('localStorage.length blocked:', error);
          return 0;
        }
      },
      key: function(index: number) {
        try {
          return originalLocalStorage.key(index);
        } catch (error) {
          console.warn('localStorage.key blocked:', error);
          return null;
        }
      }
    };
    
    Object.defineProperty(window, 'localStorage', {
      value: safeLocalStorage,
      writable: false,
      configurable: false
    });
  }
})();

// Global error handlers
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('localStorage')) {
    console.warn('localStorage access blocked:', event.message);
    event.preventDefault();
    return false;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && event.reason.message.includes('localStorage')) {
    console.warn('localStorage promise rejection:', event.reason.message);
    event.preventDefault();
    return false;
  }
});

// Initialize React app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
