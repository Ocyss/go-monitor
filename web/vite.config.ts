import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidLabels from "vite-plugin-solid-labels";
import suidPlugin from "@suid/vite-plugin";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  plugins: [
    suidPlugin(),
    solidPlugin(),
    solidLabels({
      filter: {
        include: "src/**/*.{ts,js,tsx,jsx}",
        exclude: "node_modules/**/*.{ts,js,tsx,jsx}",
      },
    }),
  ],
  server: {
    port: 34489,
    proxy: {
      "/api": {
        target: "http://localhost:34488",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    target: "esnext",
  },
});
