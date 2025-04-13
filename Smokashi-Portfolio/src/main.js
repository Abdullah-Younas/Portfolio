import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import getStarfield from './getStarfield.js';

function createTextTexture(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;

  const ctx = canvas.getContext('2d');

  // Background (optional)
  ctx.fillStyle = 'rgba(255, 255, 255, 0)'; // transparent
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Text styling
  ctx.fillStyle = 'black';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}


let astronautModel; // to hold the loaded model
const randomAxis = new THREE.Vector3(
  Math.random(),
  Math.random(),
  Math.random()
).normalize(); // random direction for rotation


const cardWidth = 1;
const cardHeight = 1.5;
const totalCards = 10;
const radius = 2;

const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.1 });

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 90;
const aspect = w / h;
const near = 0.1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 6
controls.autoRotate = true;
controls.autoRotateSpeed = .1;


const stars = getStarfield();
scene.add(stars);

const light = new THREE.HemisphereLight(0xffffff, 0xffffff);
light.intensity = 3;
scene.add(light);

const gltfLoader = new GLTFLoader();
let mixer;

gltfLoader.load('Asstro.glb', (gltf) => {
  astronautModel = gltf.scene;
  astronautModel.scale.set(0.1, 0.1, 0.1);
  scene.add(astronautModel);
}, undefined, (error) => {
  console.error('Error loading glTF model', error);
});

const loader = new THREE.TextureLoader();

for (let i = 0; i < totalCards; i++) {
  const texture = loader.load(`./H${i+1}.png`); // Or JPG, WebP, etc.

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true, // required if your image has transparency
    side: THREE.DoubleSide
  });

  const card = new THREE.Mesh(geometry, material);

  const angle = (i / totalCards) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  card.position.set(x, 0, z);
  card.lookAt(0, 0, 0);       // Face toward center
  card.rotateY(Math.PI); 
  scene.add(card);
}

function animate(){
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}
animate();

document.addEventListener("keydown", function(event) {
  if(event.key === "1"){
    window.open("https://smochat.pages.dev/", "_blank");
  } else if(event.key === "2"){
    window.open("https://sencdec.pages.dev/", "_blank");
  } else if(event.key === "3"){
    window.open("https://boardify-n2t.pages.dev/", "_blank");
  } else if(event.key === "4"){
    window.open("https://smokashi.itch.io/haze", "_blank");
  } else if(event.key === "5"){
    window.open("https://keyboard-cowboys.pages.dev/", "_blank");
  } else if(event.key === "6"){
    window.open("https://smokashi.itch.io/wooshy", "_blank");
  } else if(event.key === "7"){
    window.open("https://smochat.pages.dev/", "_blank");
  } else if(event.key === "8"){
    window.open("https://smochat.pages.dev/", "_blank");
  } else if(event.key === "9"){
    window.open("https://github.com/Abdullah-Younas?tab=repositories", "_blank");
  } else if(event.key === "0"){
    window.open("https://smokashi.itch.io/", "_blank");
  }
})