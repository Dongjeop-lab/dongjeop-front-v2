import react from '@vitejs/plugin-react';
import path from 'path';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL;

  return {
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
      proxy: apiUrl
        ? {
            '/api': {
              target: apiUrl,
              changeOrigin: true,
            },
          }
        : undefined,
    },
  };
});
