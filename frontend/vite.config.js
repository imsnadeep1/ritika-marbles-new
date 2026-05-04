import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enables source maps
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    minify: 'terser', // Use Terser for minification with better performance
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  }
});