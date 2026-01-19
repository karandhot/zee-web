// Added missing imports for THREE and lucide
import * as THREE from 'three';
import * as lucide from 'lucide';

// Initialize Lucide Icons
lucide.createIcons();

// --- 3D SCENE SETUP ---
const initThree = () => {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x0ea5e9, 2);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Core Sphere
  const geometry = new THREE.IcosahedronGeometry(2, 15);
  const material = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.5
  });
  const core = new THREE.Mesh(geometry, material);
  scene.add(core);

  // Orbital Rings
  const rings = [];
  const ringCount = 3;
  for (let i = 0; i < ringCount; i++) {
    const ringGeo = new THREE.TorusGeometry(3.5 + i * 0.8, 0.02, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, emissive: 0x6366f1, emissiveIntensity: 2 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    scene.add(ring);
    rings.push(ring);
  }

  // Stars background
  const starGeo = new THREE.BufferGeometry();
  const starCount = 2000;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 50;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  camera.position.z = 10;

  // Animation Loop
  const animate = () => {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;
    
    // Animate Core
    core.rotation.y += 0.005;
    core.scale.setScalar(1 + Math.sin(time * 2) * 0.05);

    // Animate Rings
    rings.forEach((ring, idx) => {
      ring.rotation.z += 0.005 * (idx + 1);
      ring.rotation.x += 0.002;
    });

    renderer.render(scene, camera);
  };

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
};

// --- CHART LOGIC ---
const initChart = () => {
  const line = document.getElementById('chart-line');
  const area = document.getElementById('chart-area');
  const tpsDisplay = document.getElementById('live-tps');
  
  if (!line || !area || !tpsDisplay) return;

  let points = Array.from({ length: 20 }, () => 50 + Math.random() * 20);

  const updateChart = () => {
    // Shift points
    points.shift();
    const lastVal = points[points.length - 1];
    const nextVal = Math.max(20, Math.min(90, lastVal + (Math.random() - 0.5) * 40));
    points.push(nextVal);

    // Generate path data
    let d = `M 0 ${100 - points[0]}`;
    for (let i = 1; i < points.length; i++) {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - points[i];
      d += ` L ${x} ${y}`;
    }

    line.setAttribute('d', d);
    area.setAttribute('d', d + ` L 100 100 L 0 100 Z`);

    // Update display
    const simulatedTps = Math.floor(600 + nextVal * 8);
    tpsDisplay.innerText = simulatedTps + "k";
  };

  setInterval(updateChart, 1500);
  updateChart();
};

// Start
document.addEventListener('DOMContentLoaded', () => {
  initThree();
  initChart();
});