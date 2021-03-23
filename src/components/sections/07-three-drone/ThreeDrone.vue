<template>
  <section>
    <section>
      <div class="container" id="three-drone">
        <input type="color" id="droneColor" name="droneColor" value="#ffffff" />
        <canvas id="threeDrone"></canvas>
        <a
          class="credits"
          href="https://sketchfab.com/3d-models/s9-mini-drone-cf3ed83c1b87486d90435f54c074e16e"
        >
          Model by BlueMesh
        </a>
      </div>
    </section>
    <section>
      <ThreeDroneCodeAnimation />
    </section>
    <section>
      <ThreeDroneCodeColor />
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
import useThreeBasicScene from "../../../hooks/useThreeBasicScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, MeshStandardMaterial } from "three";
import ThreeDroneCodeAnimation from "./ThreeDroneCodeAnimation.vue";
import ThreeDroneCodeColor from "./ThreeDroneCodeColor.vue";

onMounted(() => {
  const canvas = document.querySelector<HTMLCanvasElement>("canvas#threeDrone");
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

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(-100, 400, -40);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.radius = 10;
  scene.add(directionalLight);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.ShadowMaterial({ opacity: 0.4 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -5;
  ground.receiveShadow = true;
  scene.add(ground);

  // Model
  const gltfLoader = new GLTFLoader();
  let drone: THREE.Group;
  let droneShellMaterial: MeshStandardMaterial;
  let propellers: THREE.Object3D[] = [];
  const PROPELLERS_NAMES = ["Circle002", "Circle003", "Circle004", "Circle005"];

  gltfLoader.load("/models/drone.gltf", (gltf) => {
    drone = gltf.scene;
    drone.scale.set(8, 8, 8);

    const meshes = drone.children[0].children[0].children[0].children;

    // Shadows
    meshes.forEach((mesh) => (mesh.children[0].castShadow = true));

    // Reference for color picker
    droneShellMaterial = (meshes.find((mesh) => mesh.name === "Cube")
      .children[1] as Mesh).material as MeshStandardMaterial;

    // Reference for animation
    propellers = meshes.filter((mesh) => PROPELLERS_NAMES.includes(mesh.name));

    // Hide the ground object
    meshes.find((mesh) => mesh.name === "Circle006").visible = false;
    scene.add(drone);
  });

  // Drone color
  document
    .getElementById("droneColor")
    .addEventListener("input", (e: InputEvent) => {
      const colorHexString = (e.target as HTMLInputElement).value; // ex: "#00000f"
      const colorHexNumber = parseInt(colorHexString.slice(1), 16); // ex: 15
      droneShellMaterial.color.setHex(colorHexNumber);
    });

  // Animation
  const clock = new THREE.Clock();
  (function tick() {
    if (drone) {
      drone.rotation.y -= 0.01;
      drone.position.y = 30 + 3 * Math.cos(2 * clock.getElapsedTime());
    }
    propellers.forEach((prop) => (prop.rotation.z -= 0.3));
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  })();
});
</script>

<style scoped>
#three-drone {
  background: linear-gradient(#25446b, #0c1a2a);
}

input#droneColor {
  position: fixed;
  top: 5rem;
  right: 5rem;
  transform: translateX(-50%);
  border-radius: 100%;
  height: 60px;
  width: 60px;
  border: none;
  outline: none;
}

input#droneColor::-webkit-color-swatch {
  border: none;
  border-radius: 100%;
}
</style>