<template>
  <section>
    <section id="drone">
      <div class="container bg-gradient">
        <input type="color" id="droneColor" name="droneColor" value="#ffffff" />
        <canvas ref="droneCanvas"></canvas>
      </div>
      <div class="explainations">
        <p>
          Use the color picker on the top right corner to change the color of
          the drone
        </p>
        <a
          href="https://sketchfab.com/3d-models/s9-mini-drone-cf3ed83c1b87486d90435f54c074e16e"
        >
          Model: S9 Mini Drone by BlueMesh
        </a>
      </div>
    </section>
    <section>
      <ThreeDroneCodeAnimation />
    </section>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import useThreeComplexScene from "@/composables/useThreeComplexScene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const droneCanvas = ref(null);

onMounted(() => {
  const { scene, renderer, camera, onEachFrame } = useThreeComplexScene(
    "drone",
    droneCanvas.value
  );

  // Model
  const gltfLoader = new GLTFLoader();
  let drone: THREE.Group;
  let droneShellMaterial: THREE.MeshStandardMaterial;
  let propellers: THREE.Object3D[] = [];
  const PROPELLERS_NAMES = ["Circle002", "Circle003", "Circle004", "Circle005"];

  gltfLoader.load("models/drone.gltf", (gltf) => {
    drone = gltf.scene;
    drone.scale.set(8, 8, 8);

    const meshes = drone.children[0].children[0].children[0].children;

    // Shadows
    meshes.forEach((mesh) => (mesh.children[0].castShadow = true));

    // Reference for color picker
    droneShellMaterial = (
      meshes.find((mesh) => mesh.name === "Cube").children[1] as THREE.Mesh
    ).material as THREE.MeshStandardMaterial;

    // Reference for animation
    propellers = meshes.filter((mesh) => PROPELLERS_NAMES.includes(mesh.name));

    // Hide the ground object
    meshes.find((mesh) => mesh.name === "Circle006").visible = false;
    scene.add(drone);
  });

  // Drone color
  document
    .getElementById("droneColor")
    .addEventListener("input", ({ target }) => {
      const colorHexString = (target as HTMLInputElement).value; // ex: "#00000f"
      const colorHexNumber = parseInt(colorHexString.slice(1), 16); // ex: 15
      droneShellMaterial.color.setHex(colorHexNumber);
    });

  // Animation
  const clock = new THREE.Clock();

  onEachFrame(() => {
    if (drone) {
      drone.rotation.y -= 0.01;
      drone.position.y = 30 + 3 * Math.cos(2 * clock.getElapsedTime());
    }
    propellers.forEach((prop) => (prop.rotation.z -= 0.3));
    renderer.render(scene, camera);
  });
});
</script>

<style scoped>
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
