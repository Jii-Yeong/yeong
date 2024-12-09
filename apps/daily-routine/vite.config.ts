import react from '@vitejs/plugin-react';
import path from 'path';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), reactScopedCssPlugin()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/style/flex-mixin.scss';",
      },
    },
  },
});
