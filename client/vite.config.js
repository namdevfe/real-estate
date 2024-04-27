import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPath from "vite-jsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPath()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
