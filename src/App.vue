<template>
  <div class="reveal">
    <div class="slides">
      <Intro />
      <WebPage />
      <CSSCube />
      <CSSWaveAnimation />
      <section>Section 2</section>
    </div>
  </div>
</template>

<script setup>
import Intro from "./components/sections/00-intro/Intro.vue";
import WebPage from "./components/sections/01-web-page/WebPage.vue";
import CSSCube from "./components/sections/02-css-cube/CSSCube.vue";
import CSSWaveAnimation from "./components/sections/03-css-wave-animation/CSSWaveAnimation.vue";
</script>

<style>
#app,
section {
  width: 100%;
  height: 100%;
}
section {
  background-color: #252525;
}

* {
  box-sizing: border-box;
}

/* dat.GUI control panel */
.dg.ac {
  z-index: 1;
}
</style>
