// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://madridverde.web.app',
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
