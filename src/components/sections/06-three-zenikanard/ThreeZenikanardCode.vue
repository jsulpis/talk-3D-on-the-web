<template>
  <div class="container">
    <CodeBlock lang="javascript" lines="1-5|7-10|12-19">
      {{
        `// Model
const loader = new FBXLoader();
loader.load("/models/zenikanard_LOD1.fbx", model => {
  scene.add(model);
});

// Lights
const light = new THREE.HemisphereLight("white", "#0c1a2a", 2);
light.position.set(0, 30, 0);
scene.add(light);

// Camera controls
const controls = new OrbitControls(camera, canvas);

const tick = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
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
