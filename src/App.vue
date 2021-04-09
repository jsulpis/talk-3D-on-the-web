<template>
  <div class="reveal">
    <div class="slides">
      <Intro />
      <WebPage />
      <CSSCube />
      <CSSWaveAnimation />
      <WebGLTriangle />
      <ThreeCube />
      <ThreeZenikanard />
      <ThreeDrone />
      <ThreePerf />
      <VideoJump />
      <VideoPorsche />
    </div>
  </div>
</template>

<script setup>
import Intro from "./components/sections/00-intro/Intro.vue";
import WebPage from "./components/sections/01-web-page/WebPage.vue";
import CSSCube from "./components/sections/02-css-cube/CSSCube.vue";
import CSSWaveAnimation from "./components/sections/03-css-wave-animation/CSSWaveAnimation.vue";
import WebGLTriangle from "./components/sections/04-webgl-triangle/WebGLTriangle.vue";
import ThreeCube from "./components/sections/05-three-cube/ThreeCube.vue";
import ThreeZenikanard from "./components/sections/06-three-zenikanard/ThreeZenikanard.vue";
import ThreeDrone from "./components/sections/07-three-drone/ThreeDrone.vue";
import ThreePerf from "./components/sections/08-three-perf/ThreePerf.vue";
import VideoJump from "./components/sections/09-video-jump/VideoJump.vue";
import VideoPorsche from "./components/sections/10-video-porsche/VideoPorsche.vue";
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

body.reveal-viewport,
.bg-gradient {
  background: linear-gradient(#25446b, #0c1a2a);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.reveal a.credits {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  color: white;
  font-size: 1rem;
}

* {
  box-sizing: border-box;
}

/* dat.GUI control panel */
.dg.ac {
  z-index: 1;
}
</style>
