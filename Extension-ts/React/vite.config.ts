import { defineConfig } from "vite";
import { resolve } from "path";

import react from "@vitejs/plugin-react";

import html from "@rollup/plugin-html";
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    outDir: "../Extension/src",
    assetsDir: "./", // with respect to outDir,
    lib: {
      entry: {
        popup: resolve("./src/popup/index.tsx"),
        background: resolve("./src/background/background.ts"),
        contentScript: resolve("./src/contentScript/contentScript.tsx"),
      },
      formats: ["es"],
      fileName: "scripts/[name]",
    },
    rollupOptions: {
      external: ["react"],

      output: {
        assetFileNames: "/assets/style[extname]",
        chunkFileNames: "[name]",
        globals: {
          react: "React",
        },
      },
      input: resolve("./src/popup/index.tsx"),
      plugins: [
        html({
          fileName: "popup.html",
        }),
      ],
    },
  },
});
