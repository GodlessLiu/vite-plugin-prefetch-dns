import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/core/index.ts'],
  external: ['vite', 'prettier', 'url-regex', 'node-html-parser'],
  splitting: false,
  dts: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  clean: true,
  minify: true,
});
