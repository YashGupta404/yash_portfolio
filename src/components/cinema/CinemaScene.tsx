import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import DustParticles from './DustParticles';
import ProjectorLight from './ProjectorLight';

interface CinemaSceneProps {
  mousePosition: { x: number; y: number };
}

const CameraController = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const { camera } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    targetRotation.current.x = mousePosition.y * 0.05;
    targetRotation.current.y = mousePosition.x * 0.05;

    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.02;
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.02;
  });

  return null;
};

const Screen = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      const flicker = Math.sin(state.clock.elapsedTime * 30) * 0.02 + 0.98;
      material.emissiveIntensity = flicker * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <planeGeometry args={[8, 5]} />
      <meshStandardMaterial
        color="#f5f0e8"
        emissive="#f5f0e8"
        emissiveIntensity={0.3}
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
};

const TheaterWalls = () => {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#0a0908" roughness={0.95} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1512" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0d0b0a" roughness={0.95} />
      </mesh>

      {/* Side walls */}
      <mesh position={[-10, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#120f0d" roughness={0.95} />
      </mesh>
      <mesh position={[10, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#120f0d" roughness={0.95} />
      </mesh>
    </group>
  );
};

const CinemaScene = ({ mousePosition }: CinemaSceneProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
        <CameraController mousePosition={mousePosition} />
        
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          
          <TheaterWalls />
          <Screen />
          <ProjectorLight />
          <DustParticles count={150} />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CinemaScene;
