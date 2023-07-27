import { defineConfig } from "vite";
import { resolve } from "path";

import react from "@vitejs/plugin-react";

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
      output: {
        assetFileNames: "/assets/style[extname]",
      },
    },
  },
});
