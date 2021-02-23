<template>
  <section id="css-wave-animation">
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

  gsap.timeline().to("#css-wave-animation .cube", {
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

<style lang="scss" scoped>
section {
  background: linear-gradient(
    80deg,
    adjust-color(#2c5364, $hue: 15deg, $saturation: 10%),
    adjust-color(#203a43, $hue: 15deg, $saturation: 10%),
    adjust-color(#0f2027, $hue: 15deg, $saturation: 10%)
  );
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
  width: calc(var(--numRowsCols) * var(--grid-cube-size));
  height: calc(var(--numRowsCols) * var(--grid-cube-size));
  transform-style: preserve-3d;
  transform: rotateX(70deg) rotateZ(30deg)
    translateX(calc(-1 * var(--grid-cube-size) / 2)) translateZ(50px);
  grid-template-columns: repeat(var(--numRowsCols), 1fr);
  grid-template-rows: repeat(var(--numRowsCols), 1fr);
  box-shadow: 140px 120px 100px rgba(black, 0.32);
}

.cube {
  position: relative;
  width: var(--grid-cube-size);
  height: var(--grid-cube-size);
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
  background: adjust-color(#0f2027, $hue: 145deg, $saturation: 0%);
  transform: translateZ(calc(var(--grid-cube-size) / 2));
}

.face--back {
  background: adjust-color(#2c5364, $hue: 145deg, $saturation: 0%);
  transform: translateZ(calc((var(--grid-cube-size) * -1) / 2)) rotateY(180deg);
}

.face--left {
  background: adjust-color(#18303a, $hue: 145deg, $saturation: 0%);
  transform: translateX(calc((var(--grid-cube-size) * -1) / 2)) rotateY(-90deg);
}

.face--right {
  background: adjust-color(#0f2027, $hue: 145deg, $saturation: 0%);
  transform: translateX(calc(var(--grid-cube-size) / 2)) rotateY(90deg);
}

.face--top {
  background: adjust-color(#0f2027, $hue: 145deg, $saturation: 0%);
  transform: translateY(calc((var(--grid-cube-size) * -1) / 2)) rotateX(90deg);
}

.face--bottom {
  background: adjust-color(#2c5364, $hue: 145deg, $saturation: 0%);
  transform: translateY(calc(var(--grid-cube-size) / 2)) rotateX(-90deg);
}
</style>
