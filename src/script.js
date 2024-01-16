// import three js library
import * as THREE from "three";
import gsap from "gsap";

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1); // width,height,depth
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
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// renderer.render(scene, camera); // Move renderer.render() insside the function

// ################### ANIMATONS ###################

// For animations we need to update objects and do a render on each frame.
// We are going to do this inside a function. For this we can use a function window.requestAnimationFrame()

// ############### ADAPTATION FPS ##################
// ------------- Using TIME : Javascript method
let time = Date.now();

// ------------- Using Clock : Three js built in method
const clock = new THREE.Clock();

// ------------- Using gsap ----------------
// gsap handles requetAnimationFrame by itself so we don't need to pass it.
gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });

const animate = () => {
  // Update Object
  // mesh.position.x += 0.001;
  // mesh.position.y += 0.001;

  // The higher the frame rate the faster the animation
  // mesh.rotation.y += 0.01;

  // ############### ADAPTATION FPS ##################

  // ------------- Using TIME : Javascript method -------------
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // ------------- Using Clock : Three js built in method --------
  // const elapsedTime = clock.getElapsedTime();

  // --------------- Update Object ------------
  // --------------- Using TIME : Javascript method --------------
  // mesh.rotation.y += 0.001 * deltaTime;

  // --------------- Using Clock : Three js built in method -------------
  // mesh.rotation.y = elapsedTime;

  // One revolution in 1 sec;
  // mesh.rotation.y = elapsedTime * Math.PI * 2;

  // mesh.position.y = elapsedTime;

  // Moves the cube in clock wise direction
  // mesh.position.y = Math.cos(elapsedTime);
  // mesh.position.x = Math.sin(elapsedTime);

  // Moving the camera
  // Now camera is moving and cube is at its position
  // camera.position.y = Math.cos(elapsedTime);
  // camera.position.x = Math.sin(elapsedTime);
  // camera.lookAt(mesh.position);

  // Render
  renderer.render(scene, camera);

  // Calls animate function on the next frame.
  // A 60 FPS device will call this 60 times in one second
  window.requestAnimationFrame(animate);
};

animate();
