<template>
  <section id="three-cube">
    <section>
      <div class="container three-cube-container bg-gradient">
        <h1>Three.js</h1>
        <h3>à la rescousse</h3>
        <canvas id="threeCube"></canvas>
      </div>
    </section>
    <section>
      <ThreeCubeCode />
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import ThreeCubeCode from "./ThreeCubeCode.vue";

onMounted(() => {
  // Scene
  const scene = new THREE.Scene();

  // Cube
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Camera
  const camera = new THREE.PerspectiveCamera(75, 1);
  camera.position.z = 1;
  scene.add(camera);

  // Renderer
  const canvas = document.querySelector<HTMLCanvasElement>("canvas#threeCube");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(400, 400);
  renderer.render(scene, camera);
});
</script>

<style lang="scss">
#three-cube {
  .three-cube-container {
    flex-direction: column;
  }

  #threeCube {
    margin-top: 4rem;
  }

  h1,
  h3 {
    text-transform: initial;
    margin: 0;
  }
}
</style>
