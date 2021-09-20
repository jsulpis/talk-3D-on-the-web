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
      <!-- <ThreePerf /> -->
      <VideoJump />
      <VideoPorsche />
      <Outro />
    </div>
  </div>
</template>

<style lang="scss">
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

.reveal a.credits,
.explainations {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  color: white;
  font-size: 1rem;
}

.reveal a.credits {
  text-decoration: underline;
}

.reveal .explainations {
  text-align: left;

  p {
    margin: 0.125rem 0;
  }

  &.light p {
    color: black;
    font-weight: normal;
    text-shadow: none;
  }

  a {
    color: white;
    text-decoration: underline;
    text-align: left;
  }
}

* {
  box-sizing: border-box;
}

/* dat.GUI control panel */
.dg.ac {
  z-index: 1;
}
</style>
