import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "../Extension/src",
    assetsDir: "./", // with respect to outDir,

    lib: {
      entry: {
        popup: resolve("./src/popup/popup.tsx"),
        background: resolve("./src/background/background.ts"),
        contentScript: resolve("./src/contentScript/contentScript.tsx"),
      },
      formats: ["es"],
      fileName: "[name]",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        assetFileNames: "style[extname]",
        globals: {
          react: "react",
        },
      },
    },
  },
});
