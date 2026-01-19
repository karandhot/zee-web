/**
 * Zeph Protocol - Main Application Script
 * Strictly Vanilla JavaScript (ES Modules)
 */

// Initialize Lucide Icons Globally
const initIcons = () => {
  const lucide = (window as any).lucide;
  if (lucide) {
    lucide.createIcons();
    console.log("Lucide Icons Initialized");
  } else {
    // Retry if script not yet available
    setTimeout(initIcons, 100);
  }
};

/**
 * 3D Background System - Powered by Three.js
 */
const initThreeScene = () => {
  const canvas = document.getElementById('three-canvas') as HTMLCanvasElement;
  if (!canvas || !(window as any).THREE) return;

  const THREE = (window as any).THREE;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x0ea5e9, 2);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Central Core Entity (Energy Sphere)
  const coreGeometry = new THREE.IcosahedronGeometry(2, 15);
  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.5
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(core);

  // Orbital Ring System
  const rings: any[] = [];
  const ringCount = 4;
  for (let i = 0; i < ringCount; i++) {
    const ringGeo = new THREE.TorusGeometry(3.5 + i * 1.2, 0.015, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ 
      color: i % 2 === 0 ? 0x0ea5e9 : 0x6366f1, 
      emissive: i % 2 === 0 ? 0x0ea5e9 : 0x6366f1, 
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    scene.add(ring);
    rings.push({
      mesh: ring,
      speedX: (Math.random() - 0.5) * 0.01,
      speedY: (Math.random() - 0.5) * 0.01
    });
  }

  // Distant Star Field
  const starGeo = new THREE.BufferGeometry();
  const starCount = 3000;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 80;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({ size: 0.04, color: 0xffffff, transparent: true, opacity: 0.5 });
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  camera.position.z = 12;

  // Animation Engine
  const renderLoop = () => {
    requestAnimationFrame(renderLoop);

    const time = Date.now() * 0.001;
    
    // Core rotation and pulse
    core.rotation.y += 0.003;
    core.rotation.x += 0.002;
    const pulse = 1 + Math.sin(time * 1.5) * 0.08;
    core.scale.set(pulse, pulse, pulse);

    // Orbital dynamics
    rings.forEach(r => {
      r.mesh.rotation.x += r.speedX;
      r.mesh.rotation.y += r.speedY;
    });

    // Slow camera drift
    camera.position.y = Math.sin(time * 0.5) * 0.5;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };

  // Responsive Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  renderLoop();
};

/**
 * Real-time SVG Performance Chart System
 */
const initPerformanceChart = () => {
  const line = document.getElementById('chart-line');
  const area = document.getElementById('chart-area');
  const tpsDisplay = document.getElementById('live-tps');
  
  if (!line || !area || !tpsDisplay) return;

  const dataPointsCount = 25;
  let values = Array.from({ length: dataPointsCount }, () => 40 + Math.random() * 20);

  const updateChart = () => {
    // Simulate network jitter and load spikes
    values.shift();
    const lastVal = values[values.length - 1];
    const trend = (Math.random() - 0.5) * 15;
    const loadSpike = Math.random() > 0.9 ? 30 : 0;
    const newVal = Math.max(10, Math.min(95, lastVal + trend + loadSpike));
    values.push(newVal);

    // Build SVG Path String
    let pathData = `M 0 ${100 - values[0]}`;
    for (let i = 1; i < values.length; i++) {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - values[i];
      pathData += ` L ${x} ${y}`;
    }

    line.setAttribute('d', pathData);
    area.setAttribute('d', `${pathData} L 100 100 L 0 100 Z`);

    // Update Counter (Simulating k-TPS)
    const currentTps = Math.floor(850 + newVal * 2.5);
    tpsDisplay.innerText = currentTps + "k";
  };

  // High-frequency updates for fluid movement
  setInterval(updateChart, 1200);
  updateChart();
};

/**
 * Application Entry Point
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log("ZEPH Engine Initialized");
  initIcons();
  initThreeScene();
  initPerformanceChart();
});