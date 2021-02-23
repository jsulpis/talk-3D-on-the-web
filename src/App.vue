<template>
  <div class="reveal">
    <div class="slides">
      <Intro />
      <CSSCube />
      <CSSWaveAnimation />
      <section>Section 2</section>
    </div>
  </div>
</template>

<script setup>
import Intro from "./components/Intro.vue";
import CSSCube from "./components/CSSCube.vue";
import CSSWaveAnimation from "./components/CSSWaveAnimation.vue";
</script>

<style>
#app,
section {
  width: 100%;
  height: 100%;
}

/* dat.GUI control panel */
.dg.ac {
  z-index: 1;
}
</style>
