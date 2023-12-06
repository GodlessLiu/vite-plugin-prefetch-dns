import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'vite-plugin-prefetch-dns',
    include: ['tests/**/*.spec.ts'],
  },
});
