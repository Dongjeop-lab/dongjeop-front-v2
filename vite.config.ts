import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type ConfigEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => ({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'styled-system': path.resolve(__dirname, './styled-system'),
    },
  },
  server: {
    proxy:
      mode === 'production'
        ? {
            '/api': {
              target: 'http://host.docker.internal:6061',
              changeOrigin: true,
            },
          }
        : undefined,
  },
}));
