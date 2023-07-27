import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: "../Extension/src",
    assetsDir: "./", // with respect to outDir,
    rollupOptions: {
      output: {
        assetFileNames: "style[extname]",
        manualChunks: {
          popup: [resolve("./src/popup/popup.tsx")],
          background: [resolve("./src/background/background.ts")],
          contentScript: [resolve("./src/contentScript/contentScript.tsx")],
        },
        chunkFileNames: "scripts/[name].js",
      },
    },
  },
});
