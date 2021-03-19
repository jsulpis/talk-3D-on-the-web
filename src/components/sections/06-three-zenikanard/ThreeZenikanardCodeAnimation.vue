<template>
  <div class="container">
    <CodeBlock lang="javascript" lines="3,5,6|11|14,17">
      {{
        `// Model
const loader = new FBXLoader();
let mixer, jumpAction;
loader.load("/models/zenikanard_LOD1.fbx", model => {
  mixer = new THREE.AnimationMixer(model);
  jumpAction = mixer.clipAction(model.animations[0]);

  scene.add(model);
});

const jump = () => jumpAction.play();

// Animation
const clock = new THREE.Clock();

const tick = () => {
  mixer && mixer.update(clock.getDelta());
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
