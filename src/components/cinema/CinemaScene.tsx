import { Suspense, useRef, forwardRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import DustParticles from './DustParticles';
import ProjectorModel from './ProjectorModel';

interface CinemaSceneProps {
  mousePosition: { x: number; y: number };
  children?: React.ReactNode;
}

const CameraController = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const { camera } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    // Subtle camera movement based on mouse
    targetRotation.current.x = mousePosition.y * 0.03;
    targetRotation.current.y = mousePosition.x * 0.03;

    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.02;
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.02;
    
    // Slight breathing motion
    camera.position.z = 8 + Math.sin(Date.now() * 0.0005) * 0.05;
  });

  return null;
};

// Cinema screen that will display content
const CinemaScreen = forwardRef<THREE.Mesh>((_, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const screenRef = ref || meshRef;

  useFrame((state) => {
    const mesh = (screenRef as React.RefObject<THREE.Mesh>).current;
    if (mesh) {
      const material = mesh.material as THREE.MeshStandardMaterial;
      // Authentic projector flicker
      const flicker = 
        Math.sin(state.clock.elapsedTime * 24) * 0.015 +
        Math.sin(state.clock.elapsedTime * 37) * 0.01 +
        Math.sin(state.clock.elapsedTime * 53) * 0.008 +
        0.97;
      material.emissiveIntensity = 0.4 * flicker;
    }
  });

  return (
    <mesh ref={screenRef as React.RefObject<THREE.Mesh>} position={[0, 0, -4]} receiveShadow>
      <planeGeometry args={[10, 6]} />
      <meshStandardMaterial
        color="#f8f4ec"
        emissive="#f8f4ec"
        emissiveIntensity={0.4}
        roughness={0.95}
        metalness={0}
      />
    </mesh>
  );
});

CinemaScreen.displayName = 'CinemaScreen';

// Screen frame/border
const ScreenFrame = () => {
  return (
    <group position={[0, 0, -3.95]}>
      {/* Top border */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[11, 0.4, 0.2]} />
        <meshStandardMaterial color="#0a0806" roughness={0.9} />
      </mesh>
      {/* Bottom border */}
      <mesh position={[0, -3.2, 0]}>
        <boxGeometry args={[11, 0.4, 0.2]} />
        <meshStandardMaterial color="#0a0806" roughness={0.9} />
      </mesh>
      {/* Left border */}
      <mesh position={[-5.2, 0, 0]}>
        <boxGeometry args={[0.4, 6.8, 0.2]} />
        <meshStandardMaterial color="#0a0806" roughness={0.9} />
      </mesh>
      {/* Right border */}
      <mesh position={[5.2, 0, 0]}>
        <boxGeometry args={[0.4, 6.8, 0.2]} />
        <meshStandardMaterial color="#0a0806" roughness={0.9} />
      </mesh>
    </group>
  );
};

const TheaterEnvironment = () => {
  return (
    <group>
      {/* Back wall behind screen */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[25, 15]} />
        <meshStandardMaterial color="#050403" roughness={0.98} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -5, 2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 20]} />
        <meshStandardMaterial color="#0d0a08" roughness={0.95} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 6, 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[25, 20]} />
        <meshStandardMaterial color="#080604" roughness={0.98} />
      </mesh>

      {/* Side walls with subtle red velvet */}
      <mesh position={[-12, 0, 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#1a0a08" roughness={0.95} />
      </mesh>
      <mesh position={[12, 0, 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#1a0a08" roughness={0.95} />
      </mesh>
    </group>
  );
};

const CinemaScene = ({ mousePosition }: CinemaSceneProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 55 }}>
        <CameraController mousePosition={mousePosition} />
        
        <Suspense fallback={null}>
          {/* Ambient lighting - very dark theater */}
          <ambientLight intensity={0.05} color="#ffeecc" />
          
          {/* Theater environment */}
          <TheaterEnvironment />
          
          {/* Cinema screen */}
          <CinemaScreen />
          <ScreenFrame />
          
          {/* Projector on the right side */}
          <ProjectorModel position={[6, 2.5, 5]} />
          
          {/* Dust particles in projector beam */}
          <DustParticles count={180} />

          {/* Subtle environment for reflections */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CinemaScene;
