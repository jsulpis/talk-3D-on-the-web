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
import useThreeBasicScene from "../../../hooks/useThreeBasicScene";
import ThreeZenikanardCodeBase from "./ThreeZenikanardCodeBase.vue";
import ThreeZenikanardCodeAnimation from "./ThreeZenikanardCodeAnimation.vue";

onMounted(() => {
  const canvas = document.querySelector<HTMLCanvasElement>(
    "canvas#threeZenikanard"
  );
  const { scene, camera, renderer, controls } = useThreeBasicScene(canvas, 0);

  // General adjustments
  camera.setFocalLength(30);
  camera.position.set(0, 60, 200);
  controls.target.set(0, 30, 0);
  controls.update();
  renderer.setClearAlpha(0);

  // Lights
  const hemisphereLight = new THREE.HemisphereLight("white", "#0c1a2a", 2);
  hemisphereLight.position.set(0, 30, 0);
  scene.add(hemisphereLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-100, 400, -40);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.radius = 20;
  scene.add(directionalLight);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.ShadowMaterial({ opacity: 0.4 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

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
