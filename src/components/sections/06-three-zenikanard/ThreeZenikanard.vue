<template>
  <section>
    <section id="zenikanard">
      <div class="container bg-gradient">
        <canvas ref="zenikanardCanvas"></canvas>
      </div>
      <div class="explainations">
        <p>Press "Enter" to play or pause the animation</p>
        <p>You can zoom out and move in the 3D space</p>
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
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import useThreeComplexScene from "@/composables/useThreeComplexScene";
import useCurrentSlide from "@/composables/useCurrentSlide";

const zenikanardCanvas = ref(null);

const { onSlideEnter, onSlideLeave } = useCurrentSlide("zenikanard");

onMounted(() => {
  const { scene, renderer, camera, controls, onEachFrame } =
    useThreeComplexScene("zenikanard", zenikanardCanvas.value);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.2;

  // Model
  const fbxLoader = new FBXLoader();
  let mixer: THREE.AnimationMixer, jumpAction: THREE.AnimationAction;
  fbxLoader.load("models/zenikanard_LOD1.fbx", (model) => {
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

  onSlideEnter(() => document.addEventListener("keypress", toggleAnimation));
  onSlideLeave(() => document.removeEventListener("keypress", toggleAnimation));

  function toggleAnimation(e: KeyboardEvent) {
    if (e.key === "Enter") {
      if (jumpAction.isRunning()) jumpAction.paused = true;
      else {
        jumpAction.paused = false;
        jumpAction.play();
      }
    }
  }

  // Animation
  const clock = new THREE.Clock();

  onEachFrame(() => {
    mixer && mixer.update(clock.getDelta());
    controls.update();
    renderer.render(scene, camera);
  });
});
</script>
