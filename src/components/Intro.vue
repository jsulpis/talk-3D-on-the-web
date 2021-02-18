<template>
  <section>
    <canvas class="webgl"></canvas>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

onMounted(() => {
  const canvas = document.querySelector("canvas.webgl");
  const scene = new THREE.Scene();
  const ambientLight = new THREE.AmbientLight("#fff", 8);
  scene.add(ambientLight);

  const gltfLoader = new GLTFLoader();
  gltfLoader.load("/intro.glb", (glb) => {
    scene.add(glb.scene);
  });

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const camera = new THREE.PerspectiveCamera(33, sizes.width / sizes.height);
  camera.position.set(0, 1.2, 8);
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.target = new THREE.Vector3(0, 1.4, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x333333);
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
