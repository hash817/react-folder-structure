import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from 'tailwindcss'
import path from 'path'

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "",
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    // dont open browser as im using docker
    open: false,
    // this sets a default port to 3000
    port: 3000,
    // https: {
    //   key: 'web.key', // Path to your SSL key file
    //   cert: 'web.crt', // Path to your SSL certificate file
    // }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
