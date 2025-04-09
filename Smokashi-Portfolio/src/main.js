import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
  color:0xccff,
  flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const light = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(light);
function animate(t = 0){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();