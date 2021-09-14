<template>
  <section>
    <div class="container bg-gradient" id="three-perf">
      <canvas id="threePerf"></canvas>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils";
import useThreeComplexScene from "@/composables/useThreeComplexScene";
import Stats from "stats.js";

onMounted(() => {
  // Stats
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  const statsFps = new Stats();
  statsFps.showPanel(0);
  statsContainer.appendChild(statsFps.dom);

  const statsMs = new Stats();
  statsMs.showPanel(1);
  statsContainer.appendChild(statsMs.dom);

  document.getElementById("three-perf").appendChild(statsContainer);

  // Base
  const canvas = document.querySelector<HTMLCanvasElement>("canvas#threePerf");

  const { scene, camera, renderer, controls } = useThreeComplexScene(canvas);

  camera.position.set(500, 100, 500);
  controls.target.set(750, 80, 750);
  controls.update();

  // Model
  let mixer: THREE.AnimationMixer;

  new FBXLoader().load("/models/zenikanard_LOD1.fbx", (model) => {
    model.scale.set(10, 10, 10);
    model.position.set(750, 0, 750);
    mixer = new THREE.AnimationMixer(model);

    mixer.clipAction(model.animations[0]).play();
    scene.add(model);

    const SQUARE_SIZE = 500;
    for (let i = 0; i < 100; i++) {
      const modelCopy = SkeletonUtils.clone(model);
      modelCopy.rotation.y = Math.random() * 2 * Math.PI;
      modelCopy.position.x = -SQUARE_SIZE + Math.random() * 2 * SQUARE_SIZE;
      modelCopy.position.z = -SQUARE_SIZE + Math.random() * 2 * SQUARE_SIZE;

      mixer
        .clipAction(model.animations[0], modelCopy)
        .startAt(i / 100)
        .play();

      scene.add(modelCopy);
    }
  });

  // Animation
  const clock = new THREE.Clock();
  (function tick() {
    statsMs.begin();
    statsFps.begin();

    mixer && mixer.update(clock.getDelta());
    renderer.render(scene, camera);

    statsMs.end();
    statsFps.end();
    requestAnimationFrame(tick);
  })();
});
</script>

<style lang="scss">
.stats-container {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  > div {
    position: initial !important;
    transform: scale(1.5);
    transform-origin: top left;
  }
}
</style>
