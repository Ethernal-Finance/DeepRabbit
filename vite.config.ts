import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      server: {
        host: true,
        allowedHosts: [
          // Allow any ngrok free subdomain
          /^[a-z0-9-]+\.ngrok-free\.app$/,
          // Explicit host seen in error (helps if RegExp is not honored)
          '13306b8a3138.ngrok-free.app',
        ],
        proxy: {
          '/api': {
            target: 'http://localhost:8787',
            changeOrigin: true,
          },
        },
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
