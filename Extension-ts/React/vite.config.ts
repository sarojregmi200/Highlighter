import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

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
        entryFileNames: "script.js",
      },
    },
  },
});
