<template>
  <section>
    <section>
      <div class="container" id="three-zenikanard">
        <canvas id="threeZenikanard"></canvas>
      </div>
    </section>
    <section>
      <ThreeZenikanardCodeBase />
    </section>
    <section>
      <ThreeZenikanardCodeAnimation />
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import useThreeComplexScene from "../../../hooks/useThreeComplexScene";
import ThreeZenikanardCodeBase from "./ThreeZenikanardCodeBase.vue";
import ThreeZenikanardCodeAnimation from "./ThreeZenikanardCodeAnimation.vue";

onMounted(() => {
  const canvas = document.querySelector<HTMLCanvasElement>(
    "canvas#threeZenikanard"
  );
  const { scene, camera, renderer, controls } = useThreeComplexScene(canvas);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.2;

  // Model
  const fbxLoader = new FBXLoader();
  let mixer: THREE.AnimationMixer, jumpAction: THREE.AnimationAction;
  fbxLoader.load("/models/zenikanard_LOD1.fbx", (model) => {
    model.scale.set(10, 10, 10);
    model.rotation.y = (3 * Math.PI) / 4;
    model.children[0].castShadow = true;

    mixer = new THREE.AnimationMixer(model);

    // Smoothly stop the animation after the first loop
    mixer.addEventListener("loop", function (e) {
      setTimeout(() => {
        e.action.fadeOut(0.1);
        setTimeout(() => e.action.stop(), 100);
      }, 100);
    });

    jumpAction = mixer.clipAction(model.animations[0]);
    scene.add(model);
  });

  document.addEventListener("keypress", function (e: KeyboardEvent) {
    if (e.key === "Enter") {
      if (jumpAction.isRunning()) jumpAction.paused = true;
      else {
        jumpAction.paused = false;
        jumpAction.play();
      }
    }
  });

  // Animation
  const clock = new THREE.Clock();
  (function tick() {
    mixer && mixer.update(clock.getDelta());
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  })();
});
</script>

<style scoped>
#three-zenikanard {
  background: linear-gradient(#25446b, #0c1a2a);
}
</style>
