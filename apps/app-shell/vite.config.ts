import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'app-shell',
      remotes: {
        'loan-mfe': 'http://localhost:3001/remoteEntry.js',
        'onboarding-mfe': 'http://localhost:3002/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        zustand: { singleton: true, requiredVersion: '^4.5.2' },
        '@bank/store': { singleton: true }
      },
    }),
  ],
  server: { port: 3000, strictPort: true },
  build: { target: 'esnext', minify: false, cssCodeSplit: false },
});