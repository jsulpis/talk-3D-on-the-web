<template>
  <div class="container">
    <CodeBlock lang="javascript" lines="3,7|12-18">
      {{
        `// Model
const gltfLoader = new GLTFLoader();
let droneShellMaterial: MeshStandardMaterial;

gltfLoader.load("/models/drone.gltf", (gltf) => {
  drone = gltf.scene;
  droneShellMaterial = drone.children.find((mesh) => mesh.name === "Cube").material;
  scene.add(drone);
});

// Color
document
  .getElementById("droneColor")
  .addEventListener("input", (e: InputEvent) => {
    const colorHexString = (e.target as HTMLInputElement).value; // ex: "#00000f"
    const colorHexNumber = parseInt(colorHexString.slice(1), 16); // ex: 15
    droneShellMaterial.color.setHex(colorHexNumber);
  });
`
      }}
    </CodeBlock>
  </div>
</template>

<script setup>
import CodeBlock from "../../CodeBlock.vue";
</script>
