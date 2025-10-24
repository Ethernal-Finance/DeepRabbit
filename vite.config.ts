import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL)
      },
      server: {
        host: true,
        allowedHosts: [
          // Allow any ngrok free subdomain
          /^[a-z0-9-]+\.ngrok-free\.app$/,
          // Explicit host seen in error (helps if RegExp is not honored)
          '13306b8a3138.ngrok-free.app',
        ],
      },
      preview: {
        allowedHosts: [
          /^[a-z0-9-]+\.ngrok-free\.app$/,
        ],
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
