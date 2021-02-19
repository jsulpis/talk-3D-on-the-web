<template>
  <section>
    <div class="container">
      <a class="credits" href="https://codepen.io/petebarr/pen/rNBwvyd"
        >Codepen by Pete Barr</a
      >
      <div class="grid">
        <div class="cube">
          <div class="face face--front"></div>
          <div class="face face--back"></div>
          <div class="face face--left"></div>
          <div class="face face--right"></div>
          <div class="face face--top"></div>
          <div class="face face--bottom"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted } from "vue";

onMounted(() => {
  const select = (e: string) => document.querySelector(e);

  const styleVars = getComputedStyle(document.documentElement);
  const numRowsCols = Number(styleVars.getPropertyValue("--numRowsCols"));
  const numCubes = numRowsCols * numRowsCols;
  const cube = select(".cube");
  const grid = select(".grid");

  for (let i = 0; i < numCubes - 1; i++) {
    const clone = cube.cloneNode(true);
    grid.appendChild(clone);
  }

  gsap.set(".container", { autoAlpha: 1 });
  gsap.set(".cube", { rotateY: 90, transformOrigin: "right center" });

  gsap.timeline().to(".cube", {
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
  --numRowsCols: 10;
  --cube-size: 60px;
  --grid-gap: 0px;
}
</style>

<style lang="scss" scoped>
section {
  background: linear-gradient(80deg, #2c5364, #203a43, #0f2027);
  overflow: hidden;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto;
  perspective: 700px;
  visibility: hidden;
  position: relative;
}

.credits {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: white;
  font-size: 1rem;
}

.grid {
  display: grid;
  width: calc(var(--numRowsCols) * var(--cube-size));
  height: calc(var(--numRowsCols) * var(--cube-size));
  transform-style: preserve-3d;
  transform: rotateX(70deg) rotateZ(30deg)
    translateX(calc(-1 * var(--cube-size) / 2)) translateZ(50px);
  grid-template-columns: repeat(var(--numRowsCols), 1fr);
  grid-template-row: repeat(var(--numRowsCols), 1fr);
  grid-gap: var(--grid-gap);
  box-shadow: 140px 120px 100px rgba(black, 0.32);
}

.cube {
  position: relative;
  width: var(--cube-size);
  height: var(--cube-size);
  transform-style: preserve-3d;
}

.face {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.face--front {
  background: #0f2027;
  transform: translateZ(calc(var(--cube-size) / 2));
}

.face--back {
  background: #2c5364;
  transform: translateZ(calc((var(--cube-size) * -1) / 2)) rotateY(180deg);
}

.face--left {
  background: #18303a;
  transform: translateX(calc((var(--cube-size) * -1) / 2)) rotateY(-90deg);
}

.face--right {
  background: #0f2027;
  transform: translateX(calc(var(--cube-size) / 2)) rotateY(90deg);
}

.face--top {
  background: #0f2027;
  transform: translateY(calc((var(--cube-size) * -1) / 2)) rotateX(90deg);
}

.face--bottom {
  background: #2c5364;
  transform: translateY(calc(var(--cube-size) / 2)) rotateX(-90deg);
}
</style>
