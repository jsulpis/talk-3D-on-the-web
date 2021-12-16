import { createApp } from "vue";
import App from "./App.vue";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/blood.css";
import "@/assets/styles/highlightjs-theme-vs2015.css";
import RevealHighlight from "reveal.js/plugin/highlight/highlight";

createApp(App).mount("#app");

Reveal.initialize({
  history: true,
  width: "100%",
  height: "100%",
  margin: 0,
  plugins: [RevealHighlight],
});
