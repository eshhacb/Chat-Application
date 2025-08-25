import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to your backend server
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      // Proxy WebSocket requests to your backend server
      '/socket.io': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true, // Enable WebSocket support
      },
    },
  },
});
