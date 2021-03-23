<template>
  <div class="container">
    <CodeBlock lang="javascript" lines="3,6|10,11,14-17">
      {{
        `// Model
const gltfLoader = new GLTFLoader();
let drone: THREE.Group;

gltfLoader.load("/models/drone.gltf", (gltf) => {
  drone = gltf.scene;
  scene.add(drone);
});

// Animation
const clock = new THREE.Clock();

const tick = () => {
  if (drone) {
    drone.rotation.y -= 0.01;
    drone.position.y = 30 + 3 * Math.cos(2 * clock.getElapsedTime());
  }
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
`
      }}
    </CodeBlock>
  </div>
</template>

<script setup>
import CodeBlock from "../../CodeBlock.vue";
</script>
