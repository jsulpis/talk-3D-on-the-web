import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "/src") }],
  },
  base: "/3D-on-the-web/",
});
