<template>
  <section>
    <section id="css-cube">
      <div class="container cube-container bg-gradient">
        <div ref="cube" class="cube">
          <div ref="frontFace" class="face face-front"></div>
          <div class="face face-back"></div>
          <div class="face face-left"></div>
          <div class="face face-right"></div>
          <div class="face face-top"></div>
          <div class="face face-bottom"></div>
        </div>
      </div>
      <div class="explainations">
        <p>Press "G" to show a panel with sliders</p>
        <p>
          Press "G" again to remove the panel before moving on to the next
          slides
        </p>
      </div>
    </section>
    <section>
      <CSSCubeCode />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useGui from "@/composables/useGui";
import useCurrentSlide from "@/composables/useCurrentSlide";

const { onSlideEnter, onSlideLeave } = useCurrentSlide("css-cube");
const { gui, toggleGui: showGui, destroyGui } = useGui();

onSlideEnter(() => document.addEventListener("keyup", toggleGui));
onSlideLeave(() => document.removeEventListener("keyup", toggleGui));

function toggleGui(e) {
  if (e.key === "g") {
    if (gui.closed) showGui();
    else destroyGui();
  }
}

const cubeTransform = {
  translateY: 0,
  rotateZ: 0,
};

const frontFaceTransform = {
  rotateX: -90,
};

let cube = ref(null),
  frontFace = ref(null);

const updateTransform = () => {
  cube.value.style.transform = `rotateX(70deg) rotateZ(${
    30 + cubeTransform.rotateZ
  }deg) translate3d(0, ${cubeTransform.translateY}px, -100px)`;
};

gui
  .add(cubeTransform, "translateY")
  .min(-800)
  .max(0)
  .step(1)
  .onChange(updateTransform);
gui
  .add(cubeTransform, "rotateZ")
  .min(0)
  .max(360)
  .step(1)
  .onChange(updateTransform);
gui
  .add(frontFaceTransform, "rotateX")
  .min(-179)
  .max(-90)
  .step(1)
  .onChange(() => {
    frontFace.value.style.transform = `rotateX(${frontFaceTransform.rotateX}deg)`;
  });
</script>

<style scoped>
.cube-container {
  --cube-size: 300px;
  --color-light: #7da3c6;
  --color-medium: #2e5270;
  --color-dark: #162939;

  perspective: 1000px;
  position: relative;
}

.cube {
  position: relative;
  width: var(--cube-size);
  height: var(--cube-size);
  transform-style: preserve-3d;
  transform: rotateX(70deg) rotateZ(30deg) translateZ(-100px);
  transition: all 200ms ease-out;
  box-shadow: 120px 180px 70px 20px #00000032;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
}

.face-top {
  background-color: var(--color-light);
  transform: translateZ(var(--cube-size));
}

.face-bottom {
  background-color: black;
  transform: rotateY(180deg);
}

.face-left {
  background-color: var(--color-medium);
  transform: rotateY(-90deg);
  transform-origin: left;
}

.face-right {
  background-color: var(--color-dark);
  transform: rotateY(90deg);
  transform-origin: right;
}

.face-back {
  background-color: var(--color-dark);
  transform: rotateX(90deg);
  transform-origin: top;
}

.face-front {
  background-color: var(--color-medium);
  transform: rotateX(-90deg);
  transform-origin: bottom;
}
</style>
