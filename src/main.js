import { createApp } from "vue";
import App from "./App.vue";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/blood.css";

createApp(App).mount("#app");

new Reveal().initialize({
  history: true,
  width: "100%",
  height: "100%",
  margin: 0,
});
