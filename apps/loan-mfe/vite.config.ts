import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import federation from '@originjs/vite-plugin-federation';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const shared = {
  react: { singleton: true, requiredVersion: '^18.3.1' },
  'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
  zustand: { singleton: true, requiredVersion: '^4.5.2' },
  '@bank/store': { singleton: true, requiredVersion: '1.0.0' },
};

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    federation({
      name: 'loan-mfe',
      filename: 'remoteEntry.js',
      exposes: { './App': './src/App.tsx' },
      shared,
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
  },
  server: { port: 3001, strictPort: true, cors: true },
  preview: { port: 3001, strictPort: true, cors: true },
});
