// import three js library
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ################## CUSTOM CONTROLS ####################

// To be able to view the objects from different angles we need to have custom controls for camera.
// Get the coordinates of the mouse

// Create a cursor variable to store the value of coordinates of the mouse

// Create canvas
const canvas = document.querySelector(".webgl");

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  console.log(cursor.x, cursor.y);
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
  width: window.innerWidth,
  height: window.innerHeight,
};

// To handle resizing of the window
// we need to know when the window is being resized, we need to listen to "resize" event

window.addEventListener("resize", () => {
  // update sizes object
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  // we need to change the aspect ratio of the camera to resize the canvas
  camera.aspect = sizes.width / sizes.height;

  // when we update the aspect ratio, we need to alert the camera about the change that they need to update the
  // projection matrix
  camera.updateProjectionMatrix();

  // Now we need to update the renderer
  renderer.setSize(sizes.width, sizes.height);
});

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

// ####################### Orbital control #####################

const controls = new OrbitControls(camera, canvas);
// To change controls target and update the controls after it.
// controls.target.y = 2
// controls.update()
// Makes the camera to look at a specific position

// To disable controls
// controls.enabled = false;

// To add damping, the damping will smooth the animation by adding some kind of acceleration or friction
controls.enableDamping = true;
camera.lookAt(mesh.position);

// Renderer

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
  // camera.position.x = cursor.x * 3;
  // camera.position.y = cursor.y * 3;

  // can move the camera around the center of the scene by using Math.sin(), Math.cos() and Math.PI
  // When we combine cos on one axis and sin on another axis with the same angle we get the position on the circle.

  // camera.position.x = Math.sin(cursor.x * 10) * 3;
  // camera.position.z = Math.cos(cursor.x * 10) * 3;
  // using static "10" we will get multiple roatations when we move mouse our the canvas

  // For moving camera around x-axis
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // // For moving camera around y-axis
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // #################### USING BUILT-IN CONTROL ##################

  // Here we need to update the controls after every frame render
  controls.update();

  // Render
  renderer.render(scene, camera);
  // Call rotateCube again on next frame.
  window.requestAnimationFrame(rotateCude);
};

rotateCude();
