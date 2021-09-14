import * as THREE from "three";
import useThreeBasicScene from "./useThreeBasicScene";

export default function useThreeComplexScene(canvas: HTMLCanvasElement) {
  const { scene, camera, renderer, controls, tick } = useThreeBasicScene(
    canvas,
    0
  );

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

  return { scene, camera, renderer, controls, tick };
}
