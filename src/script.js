// import three js library
import * as THREE from "three";
console.log(THREE);

// ################ Creating first scene : ###################
// To create a scene we need 4 elements:
// 1. A Scene that will contain objects
// 2. An Object
// 3. A Camera
// 4. A Renderer

// Scene : scene is like a container. Where we put all the objects, a camera , lights and many things
// To create a scene we use
const scene = new THREE.Scene();

// Objects can be many things : Primitive geometries, imported models, particles, lights etc.
// To create a visible object we need to create a "Mesh". Mesh is combination of "Geometry" and "Material".

// To create a geometry. Cube
const geometry = new THREE.BoxGeometry(1, 1, 1); // width,height,depth
// To create a material
const material = new THREE.MeshBasicMaterial({ color: "#162355" });

// To Instantiate a mesh
const mesh = new THREE.Mesh(geometry, material);

// Now we have to add this Object/Mesh to the scene

scene.add(mesh);
// just adding mesh to scene won't let it visible on screen.
// we need a point of view and for that we use camera

// Camera : Camera is just serve as a Point of view. Can have multiple camera and switch between them.

// 1st arg FOV : Vertical vision angle, like a cone, like we see from eye. In degree
// 2nd arg aspect ratio : width of render divided by height of render

// For now we are using custom sizes. Later we will use viewport

const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
scene.add(camera);

// Renderer : Render the scene from the camera point of view
// result is drawn into a canvas
// a canvas is an HTML element in which we can draw something
// three.js will use WebGL to draw the render inside the canvas

// create a canvas in the html file.

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

// we need to provide size to the renderer
// use setSize() method to update the size of the renderer

renderer.setSize(sizes.width, sizes.height);

// First renderer, to call the renderer use render() method on renderer with "scene" and "camera" as parameter

renderer.render(scene, camera);
