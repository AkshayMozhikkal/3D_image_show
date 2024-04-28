// import * as THREE from 'https://cdn.skypack.dev/three@v0.128.0/build/three.module.js';
// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

// const new_img = document.getElementById('new').getAttribute('data-file-url');
// console.log(new_img,"new image")

// const container = document.getElementById('model-container');
// const canvasWidth = 800;
// const canvasHeight = 500;

// // Create a renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(canvasWidth, canvasHeight);
// container.appendChild(renderer.domElement);

// // Create a camera
// const aspect = canvasWidth / canvasHeight;
// const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
// camera.position.set(0, 0, 2);

// // Update camera aspect ratio when the window is resized
// window.addEventListener('resize', () => {
//     const aspect = canvasWidth / canvasHeight;
//     camera.aspect = aspect;
//     camera.updateProjectionMatrix();
//     renderer.setSize(canvasWidth, canvasHeight);
// });

// // Create a scene
// const scene = new THREE.Scene();
// // Set light gray background color for the scene
// scene.background = new THREE.Color(0xdddddd);

// // Create OrbitControls for camera movement
// const controls = new OrbitControls(camera, renderer.domElement);


// // Load the GLB model dynamically
// const loader = new GLTFLoader();
// loader.load(new_img, function (gltf) {
//     const model = gltf.scene;
//     scene.add(model);
// });

// // Enable shadows for the renderer
// renderer.shadowMap.enabled = true;

// // Add lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Increase intensity to 0.8
// scene.add(ambientLight);


// // Calculate a direction vector from the center of the scene to the light
// const lightDirection = new THREE.Vector3(1, 1, 1).normalize();
// const directionalLight = new THREE.DirectionalLight(0xffffff, 6); // Decrease intensity to 0.6
// directionalLight.position.set(1, 1, 1); // Adjust position for better illumination
// directionalLight.castShadow = true;
// scene.add(directionalLight);



// // Render loop
// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }
// animate();


import * as THREE from 'https://cdn.skypack.dev/three@v0.128.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

const new_img = document.getElementById('new').getAttribute('data-file-url');
console.log(new_img, "new image")

const container = document.getElementById('model-container');
const canvasWidth = 800;
const canvasHeight = 500;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(canvasWidth, canvasHeight);
container.appendChild(renderer.domElement);

// Create a camera
const aspect = canvasWidth / canvasHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.set(0, 0, 2);

// Update camera aspect ratio when the window is resized
window.addEventListener('resize', () => {
    const aspect = canvasWidth / canvasHeight;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWidth, canvasHeight);
});

// Create a scene
const scene = new THREE.Scene();
// Set light gray background color for the scene
scene.background = new THREE.Color(0xdddddd);

// Create OrbitControls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);

// Load the model dynamically
if (new_img.endsWith('.glb')) {
    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(new_img, function (gltf) {
        const model = gltf.scene;
        scene.add(model);
    });
} else if (new_img.endsWith('.obj')) {
    // Load OBJ model
    const loader = new OBJLoader();
    loader.load(new_img, function (object) {
        scene.add(object);
    });
}

// Enable shadows for the renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows for smoother appearance

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Increase intensity to 1.2
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); // Increase intensity to 1.2
directionalLight.position.set(5, 5, 5); // Adjust position for better illumination
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024; // Shadow map size
directionalLight.shadow.mapSize.height = 1024; // Shadow map size
directionalLight.shadow.camera.near = 0.5; // Near plane
directionalLight.shadow.camera.far = 50; // Far plane
scene.add(directionalLight);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();


