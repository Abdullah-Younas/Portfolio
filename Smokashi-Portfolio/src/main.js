import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import getStarfield from './getStarfield.js';

// Play sound on click
document.body.addEventListener('click', function() {
  const audio = document.getElementById('amb');
  audio.play();
  audio.volume = 0.2;
});

let astronautModel; // to hold the loaded model
const randomAxis = new THREE.Vector3(
  Math.random(),
  Math.random(),
  Math.random()
).normalize(); // random direction for rotation

const cardWidth = 1;
const cardHeight = 1.5;
const totalCards = 9;
const radius = 2;

const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight);

// Get initial window size
let w = window.innerWidth;
let h = window.innerHeight;

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Create camera
const fov = 90;
const aspect = w / h;
const near = 0.1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = -2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 6;
controls.autoRotate = true;
controls.autoRotateSpeed = -0.2;

const stars = getStarfield();
scene.add(stars);

const light = new THREE.HemisphereLight(0xffffff, 0xffffff);
light.intensity = 3;
scene.add(light);

const gltfLoader = new GLTFLoader();

gltfLoader.load('Asstro.glb', (gltf) => {
  astronautModel = gltf.scene;
  astronautModel.scale.set(0.1, 0.1, 0.1);
  scene.add(astronautModel);
}, undefined, (error) => {
  console.error('Error loading glTF model', error);
});

const loader = new THREE.TextureLoader();

for (let i = 0; i < totalCards; i++) {
  const texture = loader.load(`./H${totalCards - 1 - i}.png`); // Or JPG, WebP, etc.

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true, // required if your image has transparency
    opacity: 2,
    side: THREE.DoubleSide
  });

  const card = new THREE.Mesh(geometry, material);

  const angle = (i / totalCards) * Math.PI * 2 + Math.PI;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  card.position.set(x, 0, z);
  card.lookAt(0, 0, 0); // Face toward center
  card.rotateY(Math.PI);
  scene.add(card);
}

function animate() {
  requestAnimationFrame(animate);

  // Ensure astronautModel is loaded before rotating
  if (astronautModel) {
    astronautModel.rotateOnAxis(new THREE.Vector3(1, 1, 1), 0.001);
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();

// Resize event listener
window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;

  // Update renderer size
  renderer.setSize(w, h);

  // Update camera aspect ratio and projection matrix
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case '1':
      window.open("https://smochat.pages.dev/", "_blank");
      break;
    case '2':
      window.open("https://sencdec.pages.dev/", "_blank");
      break;
    case '3':
      window.open("https://boardify-n2t.pages.dev/", "_blank");
      break;
    case '4':
      window.open("https://smokashi.itch.io/haze", "_blank");
      break;
    case '5':
      window.open("https://keyboard-cowboys.pages.dev/success-home", "_blank");
      break;
    case '6':
      window.open("https://smokashi.itch.io/wooshy", "_blank");
      break;
    case '7':
      window.open("https://whispern.pages.dev/", "_blank");
      break;
    case '8':
      window.open("https://github.com/Abdullah-Younas", "_blank");
      break;
    case '0':
      window.open("https://smokashi.itch.io/", "_blank");
      break;
    // Add more keys if needed
    default:
      break;
  }
});