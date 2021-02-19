<template>
  <div class="reveal">
    <div class="slides">
      <Intro />
      <CSSWaveAnimation />
      <section>Section 2</section>
    </div>
  </div>
</template>

<script setup>
import Intro from "./components/Intro.vue";
import CSSWaveAnimation from "./components/CSSWaveAnimation.vue";
</script>

<style>
#app,
section {
  width: 100%;
  height: 100%;
}
</style>
