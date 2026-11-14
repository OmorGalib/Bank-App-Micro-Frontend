import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import federation from '@originjs/vite-plugin-federation';

const shared = {
  react: { singleton: true, requiredVersion: '^18.3.1' },
  'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
  zustand: { singleton: true, requiredVersion: '^4.5.2' },
  '@bank/store': { singleton: true, requiredVersion: '1.0.0' },
};

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'app-shell',
      remotes: {
        'loan-mfe': 'http://localhost:3001/assets/remoteEntry.js',
        'onboarding-mfe': 'http://localhost:3002/assets/remoteEntry.js',
      },
      shared,
    }),
  ],
  server: { port: 3000, strictPort: true, cors: true },
  preview: { port: 3000, strictPort: true, cors: true },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
  },
});
