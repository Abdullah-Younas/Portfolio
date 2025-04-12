import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import getStarfield from './getStarfield.js';

let astronautModel; // to hold the loaded model
const randomAxis = new THREE.Vector3(
  Math.random(),
  Math.random(),
  Math.random()
).normalize(); // random direction for rotation


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
controls.maxDistance = 7;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.1;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color:0xccff,
  flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
//scene.add(mesh);

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

function animate(){
  requestAnimationFrame(animate);

  // Rotate the astronaut if it's loaded
  if (astronautModel) {
    astronautModel.rotateOnAxis(new THREE.Vector3(0,-1,0), 0.0005); // adjust speed as needed
  }
  //controls.rotateOnAxis(new THREE.Vector3(0,1,0), 0.05);

  controls.update();
  renderer.render(scene, camera);
}
animate();