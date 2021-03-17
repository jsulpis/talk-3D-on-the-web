import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function useThreeBasicScene(
  canvas: HTMLCanvasElement,
  ambientLightStrength = 8
) {
  // Scene
  const scene = new THREE.Scene();

  // Light
  if (ambientLightStrength > 0) {
    const ambientLight = new THREE.AmbientLight("#fff", ambientLightStrength);
    scene.add(ambientLight);
  }

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Camera
  const camera = new THREE.PerspectiveCamera(33, sizes.width / sizes.height);
  scene.add(camera);
  const controls = new OrbitControls(camera, canvas);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor("#222");
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.outputEncoding = THREE.sRGBEncoding;

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const tick = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };

  return { scene, camera, renderer, controls, tick };
}
