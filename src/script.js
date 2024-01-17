// import three js library
import * as THREE from "three";

// ################## CUSTOM CONTROLS ####################

// To be able to view the objects from different angles we need to have custom controls for camera.
// Get the coordinates of the mouse

// Create a cursor variable to store the value

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  console.log(cursor.x);
});

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5); // width,height,depth
// Material
const material = new THREE.MeshBasicMaterial({ color: "#162355" });

// Mesh
const mesh = new THREE.Mesh(geometry, material);

// add the Object/Mesh to the scene
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};
// ################# Camera #####################

// --------------- Perspective Camera

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1, //near
  100 //far
);

// ---------------- Orthographic Camera

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.z = 2;
// camera.position.y = 2;
camera.position.z = 2;
scene.add(camera);

// Makes the camera to look at a specific position
camera.lookAt(mesh.position);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// renderer.render(scene, camera);

// ############### Clock
const clock = new THREE.Clock();

const rotateCude = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Object
  // mesh.rotation.y = elapsedTime;

  // Update the camera
  camera.position.x = cursor.x * 3;
  camera.position.y = cursor.y * 3;
  camera.lookAt(mesh.position);
  // Render
  renderer.render(scene, camera);
  // Call rotateCube again on next frame.
  window.requestAnimationFrame(rotateCude);
};

rotateCude();
