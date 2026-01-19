
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

// Type workarounds for R3F intrinsic elements failing TS checks
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const TorusGeometry = 'torusGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const MeshBasicMaterial = 'meshBasicMaterial' as any;

const FloatingCore: React.FC = () => {
  // Fix: Used any for refs as THREE namespace exports are not recognized correctly in this environment
  const coreRef = useRef<any>(null);
  const ringRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.5;
      coreRef.current.rotation.z = time * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.2;
      ringRef.current.rotation.y = time * 0.4;
    }
  });

  return (
    <Group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1.5, 64, 64]} ref={coreRef}>
          <MeshDistortMaterial
            color="#0ea5e9"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={1}
          />
        </Sphere>
      </Float>

      <Group ref={ringRef}>
        {[...Array(3)].map((_, i) => (
          <Mesh key={i} rotation={[Math.PI / (i + 1), 0, 0]}>
            <TorusGeometry args={[2.5 + i * 0.5, 0.02, 16, 100]} />
            <MeshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={2} />
          </Mesh>
        ))}
      </Group>

      <Mesh rotation={[Math.PI / 2, 0, 0]}>
        <TorusGeometry args={[4, 0.01, 16, 200]} />
        <MeshBasicMaterial color="#1e293b" transparent opacity={0.5} />
      </Mesh>
    </Group>
  );
};

export default FloatingCore;
