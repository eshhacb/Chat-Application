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
    proxy: {
      // Proxy WebSocket requests to your backend server
      '/socket.io': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true, // Enable WebSocket support
      },
    },
  },
});
