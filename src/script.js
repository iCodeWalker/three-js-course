// import three js library
import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// ##################### Grouping ##################

// Create a group
const group = new THREE.Group();

// Applying transformation on group
group.position.y = 1;
group.scale.y = 1.4;
group.rotation.y = 1;

// Adding group to scene
scene.add(group);

// -------- Creating Objects ----------
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff00ff })
);
cube3.position.x = 2;
// -------------------------------------

// Adding objects to group
group.add(cube1);
group.add(cube2);
group.add(cube3);

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1); // width,height,depth
// Material
const material = new THREE.MeshBasicMaterial({ color: "#162355" });

// Mesh
const mesh = new THREE.Mesh(geometry, material);
// Do position related stuff before render()

// ################ POSITION ##############
mesh.position.x = 0.7;
mesh.position.y = -0.7;
mesh.position.y = -0.6;
// can also use "set" method to set values of x,y,z
// mesh.position.set(0.7, -0.1, 1);

// gives us the distance between center of the scene and postion of mesh.
// console.log(mesh.position.length());

// gives distance between some random point and object.
// console.log(mesh.position.distanceTo(new THREE.Vector3(1, 1, 1)));

// Takes the length of the vector and reduces it to 1.
// mesh.position.normalize();

// ################ SCALE ##############

mesh.scale.x = 2;
mesh.scale.y = 0.5;
mesh.scale.z = 0.5;

// mesh.scale.set(0.5, 0.5, 0.5);

// ################ ROTATION ##############

mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.z = Math.PI * 0.25;

// add the Object/Mesh to the scene
// scene.add(mesh);

// Create Axis Helper
const axisHelper = new THREE.AxesHelper(); // can increase length of axis using arg
scene.add(axisHelper);

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

// Makes the camera to look at a specific position
// camera.lookAt(mesh.position);

// gives us distance between camera and object
// console.log(mesh.position.distanceTo(camera.position));

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
