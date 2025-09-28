import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: "src/main.tsx",
    }),
  ],
  build: {
    outDir: "dist/client",
  },
});
