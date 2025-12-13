import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ProjectorLight = () => {
  const lightRef = useRef<THREE.SpotLight>(null);
  const coneRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (lightRef.current) {
      // Subtle flicker effect
      const flicker = Math.sin(state.clock.elapsedTime * 20) * 0.1 + 0.9;
      lightRef.current.intensity = 2 * flicker;
    }

    if (coneRef.current) {
      // Subtle opacity variation
      const material = coneRef.current.material as THREE.MeshBasicMaterial;
      const flicker = Math.sin(state.clock.elapsedTime * 15) * 0.02 + 0.08;
      material.opacity = flicker;
    }
  });

  return (
    <group position={[0, 4, -8]}>
      {/* Projector light source */}
      <spotLight
        ref={lightRef}
        position={[0, 0, 0]}
        target-position={[0, 0, 5]}
        angle={0.4}
        penumbra={0.5}
        intensity={2}
        color="#ffefd5"
        castShadow
      />

      {/* Visible light beam cone */}
      <mesh ref={coneRef} position={[0, -2, 4]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[3, 8, 32, 1, true]} />
        <meshBasicMaterial
          color="#ffefd5"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Projector box */}
      <mesh position={[0, 0, -1]}>
        <boxGeometry args={[0.8, 0.6, 1]} />
        <meshStandardMaterial color="#2a2520" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Film reels */}
      <group position={[-0.5, 0.5, -1]}>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
          <meshStandardMaterial color="#1a1815" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
      <group position={[0.5, 0.5, -1]}>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
          <meshStandardMaterial color="#1a1815" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

export default ProjectorLight;
