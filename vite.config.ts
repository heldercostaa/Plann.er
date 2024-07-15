import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    server: {
      port: 3000,
    },
    base: "/",
  };

  if (command !== "serve") {
    config.base = "/Plann.er/";
  }

  return config;
});
