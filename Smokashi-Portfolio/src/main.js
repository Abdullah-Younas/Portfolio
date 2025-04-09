import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import getStarfield from './getStarfield.js';
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
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color:0xccff,
  flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const stars = getStarfield();
scene.add(stars);

const light = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(light);
function animate(t = 0){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();