import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/[Plann.er]/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});
