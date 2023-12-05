import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Inspect from "vite-plugin-inspect";
import vitePrefetchDns from "vite-plugin-prefetch-dns";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    Inspect(),
    vitePrefetchDns({
      ignores: ["https://github.com"],
      preConnect: "https://www.baidu.com",
      prettier: {
        insertPragma: true,
        printWidth: 80,
        tabWidth: 4,
      },
    }),
  ],
});
