import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import useCurrentSlide from "./useCurrentSlide";

export default function useThreeBasicScene(
  slideId: string,
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
  controls.maxPolarAngle = Math.PI / 2;

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

  // function to execute on each frame, with setter to use in the app
  let tick = () => {};
  function onEachFrame(callback: () => void) {
    tick = callback;
  }

  // run the WebGL loop only when the slide is active
  const { isCurrentSlide, onSlideEnter } = useCurrentSlide(slideId);
  onSlideEnter(loop);

  function loop() {
    tick();
    // console.log("rendering", slideId); // check that only the current slide is rendered
    if (isCurrentSlide.value) requestAnimationFrame(loop);
  }

  return { scene, camera, renderer, controls, onEachFrame };
}
