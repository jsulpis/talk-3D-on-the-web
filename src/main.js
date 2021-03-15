import { createApp } from "vue";
import App from "./App.vue";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/blood.css";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.js";

createApp(App).mount("#app");

Reveal.initialize({
  history: true,
  width: "100%",
  height: "100%",
  margin: 0,
  plugins: [RevealHighlight],
});
