<template>
  <section>
    <section>
      <div class="container">
        <div class="cube">
          <div class="face face-front"></div>
          <div class="face face-back"></div>
          <div class="face face-left"></div>
          <div class="face face-right"></div>
          <div class="face face-top"></div>
          <div class="face face-bottom"></div>
        </div>
      </div>
    </section>
    <section>
      <CssCubeCode />
    </section>
  </section>
</template>

<script setup>
import CssCubeCode from "./CSSCubeCode.vue";
</script>

<style scoped>
.container {
  --cube-size: 300px;
  --color-light: #7da3c6;
  --color-medium: #2e5270;
  --color-dark: #162939;

  background: linear-gradient(#25446b, #0c1a2a);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  perspective: 1000px;
  position: relative;
}

.cube {
  position: relative;
  width: var(--cube-size);
  height: var(--cube-size);
  transform-style: preserve-3d;
  transform: rotateX(70deg) rotateZ(30deg) translateZ(-100px);
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
