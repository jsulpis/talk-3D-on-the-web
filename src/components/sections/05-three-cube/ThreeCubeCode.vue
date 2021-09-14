<template>
  <div class="container">
    <CodeBlock lang="javascript" lines="1|3-7|9-12|14-18">
      {{
        `const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Camera
const camera = new THREE.PerspectiveCamera(75, 1);
camera.position.z = 1;
scene.add(camera);

// Renderer
const canvas = document.querySelector("canvas#threeCube");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(400, 400);
renderer.render(scene, camera);`
      }}
    </CodeBlock>
  </div>
</template>
