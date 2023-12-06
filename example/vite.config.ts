import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Inspect from 'vite-plugin-inspect';
import vitePrefetchDns from 'vite-plugin-prefetch-dns';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    Inspect(),
    vitePrefetchDns({
      preConnects: ['https://www.baidu.com'],
      ignores: ['https://vitejs.dev'],
      limit: 2,
      threshold: 3,
      prettier: {
        insertPragma: true,
        printWidth: 80,
        tabWidth: 4,
      },
    }),
  ],
});
