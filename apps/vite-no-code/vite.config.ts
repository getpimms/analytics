import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, '../../packages/script/dist/analytics'),
      ],
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
