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
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2); // width,height,depth

// ################### CREATING OWN BUFFER GEOMETRY ####################

// To store buffer geometry data we are going to use Float32Array

// Ways to create and fill Float32Array

//  const positionsArray = new Float32Array(9);

// // value of 1st vertex
// positionsArray[0] = 0; // x coordinate
// positionsArray[1] = 0; // y coordinate
// positionsArray[2] = 0; // z coordinate
// // value of 2nd vertex
// positionsArray[3] = 0;
// positionsArray[4] = 1;
// positionsArray[5] = 0;
// // value of 3rd vertex
// positionsArray[6] = 1;
// positionsArray[7] = 0;
// positionsArray[8] = 0;

const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);

// now we have to convert this Float32Array to a BufferAttribute

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// "3" corresponds to how much values compose  one vertex

// now we can add this BufferAttribute to our BufferGeometry
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", positionsAttribute);

// Material
const material = new THREE.MeshBasicMaterial({
  wireframe: true, // to view triangles that makes plane
  color: "#162355",
});

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

  // Handle pixel ratio
  // To get the current pixel ratio we use window.devicePixelRatio
  // To update the renderer accordingly, we can update the renderer we use
  renderer.setPixelRatio(window.devicePixelRatio);
});

// Listen to double click event

window.addEventListener("dblclick", () => {
  console.log("double click");
  // document.fullscreenElement : to see if the user is in fullscreen mode

  // if (!document.fullscreenElement) {
  //   // To go to fullscreen mode use requestFullScreen() on the concerned element (our <canvas />)
  //   canvas.requestFullscreen();
  // } else {
  //   document.exitFullscreen();
  // }

  // IMP : for safari we need to add prefixed versions

  const fullScreenElement =
    document.fullscreenElement || document.webkitFullScreenElement;

  if (!fullScreenElement) {
    // To go to fullscreen mode use requestFullScreen() on the concerned element (our <canvas />)
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
    canvas.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
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
// Handle pixel ratio
// To get the current pixel ratio we use window.devicePixelRatio
// To update the renderer accordingly, we can update the renderer we use
renderer.setPixelRatio(window.devicePixelRatio);

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
