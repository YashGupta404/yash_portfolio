import { useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectorModelProps {
  position?: [number, number, number];
}

const ProjectorModel = forwardRef<THREE.Group, ProjectorModelProps>(({ position = [5, 2, 4] }, ref) => {
  const groupRef = useRef<THREE.Group>(null);
  const reel1Ref = useRef<THREE.Mesh>(null);
  const reel2Ref = useRef<THREE.Mesh>(null);
  const lightConeRef = useRef<THREE.Mesh>(null);
  const flickerRef = useRef(0);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Spin film reels
    if (reel1Ref.current) {
      reel1Ref.current.rotation.z = time * 2;
    }
    if (reel2Ref.current) {
      reel2Ref.current.rotation.z = -time * 1.5;
    }

    // Flicker the light beam
    if (lightConeRef.current) {
      flickerRef.current = Math.sin(time * 30) * 0.05 + Math.sin(time * 47) * 0.03 + 0.92;
      const material = lightConeRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.08 * flickerRef.current;
    }

    // Subtle projector vibration
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 15) * 0.003;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, -Math.PI / 4, 0]}>
      {/* Projector body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.8]} />
        <meshStandardMaterial color="#1a1614" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Projector top */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.6]} />
        <meshStandardMaterial color="#252220" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Film reel 1 (top left) */}
      <group position={[-0.25, 0.45, -0.1]}>
        <mesh ref={reel1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 24]} />
          <meshStandardMaterial color="#0a0908" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Reel spokes */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, (angle * Math.PI) / 180]} position={[0, 0, 0]}>
            <boxGeometry args={[0.35, 0.02, 0.02]} />
            <meshStandardMaterial color="#1a1815" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Center hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
          <meshStandardMaterial color="#2a2520" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Film reel 2 (top right) */}
      <group position={[0.25, 0.4, -0.1]}>
        <mesh ref={reel2Ref} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 24]} />
          <meshStandardMaterial color="#0a0908" metalness={0.9} roughness={0.2} />
        </mesh>
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, (angle * Math.PI) / 180]} position={[0, 0, 0]}>
            <boxGeometry args={[0.25, 0.02, 0.02]} />
            <meshStandardMaterial color="#1a1815" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Lens housing */}
      <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 16]} />
        <meshStandardMaterial color="#2a2520" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Lens glass */}
      <mesh position={[0, 0, 0.58]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshStandardMaterial 
          color="#ffeedd" 
          emissive="#ffcc88"
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Light beam cone - pointing toward screen */}
      <mesh ref={lightConeRef} position={[-2.5, -0.5, -1.5]} rotation={[0.1, -0.7, 0]}>
        <coneGeometry args={[2.5, 8, 32, 1, true]} />
        <meshBasicMaterial
          color="#ffefd5"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Projector spotlight */}
      <spotLight
        position={[0, 0, 0.6]}
        target-position={[-8, -2, -6]}
        angle={0.3}
        penumbra={0.5}
        intensity={3}
        color="#ffefd5"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Warm glow around projector */}
      <pointLight position={[0, 0.3, 0]} intensity={0.3} color="#ff9944" distance={2} />
    </group>
  );
});

ProjectorModel.displayName = 'ProjectorModel';

export default ProjectorModel;
