<template>
  <section id="intro">
    <canvas ref="introCanvas"></canvas>
    <div class="explainations">
      <strong>"3D on the web"</strong>
      <p>Slides for a talk given at LyonJS, France.</p>
      <p>
        This presentation is optimised for a full screen 16/10 laptop or desktop
        display.
      </p>
      <br />
      <p>You can move in the 3D space:</p>
      <ul>
        <li>Mouse wheel to zoom in/out</li>
        <li>Left click to rotate</li>
        <li>Right click to move</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useThreeBasicScene from "@/composables/useThreeBasicScene";

const introCanvas = ref(null);

onMounted(() => {
  const { scene, renderer, camera, controls, onEachFrame } = useThreeBasicScene(
    "intro",
    introCanvas.value
  );

  camera.position.set(0, 1.2, 8);
  controls.target = new THREE.Vector3(0, 1.4, 0);
  controls.update();

  const gltfLoader = new GLTFLoader();
  gltfLoader.load("models/intro.glb", (glb) => {
    scene.add(glb.scene);
  });

  onEachFrame(() => renderer.render(scene, camera));
});
</script>
