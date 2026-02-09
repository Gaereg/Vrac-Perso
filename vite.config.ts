import { defineConfig } from "vitest/config";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./testSetup.js",
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@enums": path.resolve(__dirname, "./src/constants/enums.ts"),
      "@clientSupabase": path.resolve(__dirname, "./src/supabase.ts"),
      "@queries": path.resolve(__dirname, "./src/queries"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
    },
  },
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
});
