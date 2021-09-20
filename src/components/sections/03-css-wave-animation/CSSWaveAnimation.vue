<template>
  <section>
    <section id="css-wave-animation">
      <div class="container wave-container">
        <a class="credits" href="https://codepen.io/petebarr/pen/rNBwvyd">
          Codepen by Pete Barr
        </a>
        <div class="grid">
          <div class="cube">
            <div class="face face--front"></div>
            <div class="face face--left"></div>
            <div class="face face--bottom"></div>
            <!-- The other faces are always hidden, so I removed them for better performance -->
          </div>
        </div>
      </div>
    </section>
    <section>
      <CSSWaveAnimationCode />
    </section>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted } from "vue";
import useCurrentSlide from "@/composables/useCurrentSlide";

onMounted(() => {
  const select = (e) => document.querySelector(e);

  const styleVars = getComputedStyle(document.documentElement);
  const numRowsCols = Number(styleVars.getPropertyValue("--numRowsCols"));
  const numCubes = numRowsCols * numRowsCols;
  const cube = select("#css-wave-animation .cube");
  const grid = select("#css-wave-animation .grid");

  for (let i = 0; i < numCubes - 1; i++) {
    const clone = cube.cloneNode(true);
    grid.appendChild(clone);
  }

  gsap.set("#css-wave-animation .container", { autoAlpha: 1 });
  gsap.set("#css-wave-animation .cube", {
    rotateY: 90,
    transformOrigin: "right center",
  });

  // Play the animation when entering the slide, pause when leaving
  let gsapAnimation;
  const { onSlideEnter, onSlideLeave } = useCurrentSlide("css-wave-animation");

  onSlideEnter(() => {
    if (gsapAnimation) gsapAnimation.play();
    else gsapAnimation = initGsapAnimation();
  });

  onSlideLeave(() => {
    gsapAnimation.pause();
  });

  const initGsapAnimation = () =>
    gsap.to("#css-wave-animation .cube", {
      duration: 1,
      scaleX: 0.01,
      ease: "sine.inOut",
      stagger: {
        each: 0.15,
        yoyo: true,
        repeat: -1,
        grid: [numRowsCols, numRowsCols],
        from: "start",
      },
    });
});
</script>

<style>
:root {
  --numRowsCols: 8;
  --grid-cube-size: 70px;
}
</style>

<style scoped>
#css-wave-animation {
  background: linear-gradient(80deg, #25446b, #0c1a2a);
  overflow: hidden;
}

.wave-container {
  margin: auto;
  perspective: 700px;
  visibility: hidden;
  position: relative;
}

.grid {
  display: grid;
  width: calc(var(--numRowsCols) * var(--grid-cube-size));
  height: calc(var(--numRowsCols) * var(--grid-cube-size));
  transform-style: preserve-3d;
  transform: rotateX(70deg) rotateZ(38deg) translateX(-50px) translateZ(50px);
  grid-template-columns: repeat(var(--numRowsCols), 1fr);
  grid-template-rows: repeat(var(--numRowsCols), 1fr);
  box-shadow: 210px 110px 100px rgb(0 0 0 / 28%);
}

.cube {
  position: relative;
  width: var(--grid-cube-size);
  height: var(--grid-cube-size);
  transform-style: preserve-3d;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
}

.face--front {
  background-color: #162939;
  transform: translateZ(var(--grid-cube-size));
}

.face--left {
  background-color: #2e5270;
  transform: rotateY(-90deg);
  transform-origin: left;
}

.face--bottom {
  background-color: #7da3c6;
  transform: rotateX(-90deg);
  transform-origin: bottom;
}
</style>
