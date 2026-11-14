import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'loan-mfe',
      filename: 'remoteEntry.js',
      exposes: { './App': './src/App.tsx' },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        zustand: { singleton: true, requiredVersion: '^4.5.2' },
        '@bank/store': { singleton: true }
      },
    }),
  ],
  build: { target: 'esnext', minify: false, cssCodeSplit: false },
  server: { port: 3001, strictPort: true },
});