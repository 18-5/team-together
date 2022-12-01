import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });
const port = process.env.SERVER_PORT || 5050;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:" + port,
        changeOrigin: true,
      },
    },
  },
});
