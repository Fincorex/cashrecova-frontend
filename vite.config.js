import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Allows relative assets routing so the app runs in any root/subfolder (like GitHub Pages)
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@shared': '/src/shared',
      '@modules': '/src/modules',
      '@mfi': '/src/modules/mfi',
      '@config': '/src/config',
    },
  },
});
