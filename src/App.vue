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
      <Outro />
    </div>
  </div>
</template>

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
