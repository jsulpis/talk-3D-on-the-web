<template>
  <section>
    <canvas class="webgl"></canvas>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useThreeBasicScene from "../hooks/useThreeBasicScene";

onMounted(() => {
  const canvas = document.querySelector<HTMLCanvasElement>("canvas.webgl");
  const { scene, camera, renderer, controls } = useThreeBasicScene(canvas);

  camera.position.set(0, 1.2, 8);
  controls.target = new THREE.Vector3(0, 1.4, 0);

  const gltfLoader = new GLTFLoader();
  gltfLoader.load("/intro.glb", (glb) => {
    scene.add(glb.scene);
  });

  const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  tick();
});
</script>

<style lang="scss" scoped></style>
