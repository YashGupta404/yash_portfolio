import { Suspense, useRef, forwardRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CinemaSceneProps {
  mousePosition: { x: number; y: number };
  children?: React.ReactNode;
}

// ============================================================================
// CAMERA CONTROLLER - Subtle parallax movement
// ============================================================================

const CameraController = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const { camera } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    targetRotation.current.x = mousePosition.y * 0.02;
    targetRotation.current.y = mousePosition.x * 0.02;

    camera.rotation.x += (targetRotation.current.x - camera.rotation.x) * 0.015;
    camera.rotation.y += (targetRotation.current.y - camera.rotation.y) * 0.015;
  });

  return null;
};

// ============================================================================
// CINEMA SCREEN - Old projector screen with flicker
// ============================================================================

const CinemaScreen = forwardRef<THREE.Mesh>((_, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const screenRef = ref || meshRef;

  useFrame((state) => {
    const mesh = (screenRef as React.RefObject<THREE.Mesh>).current;
    if (mesh) {
      const material = mesh.material as THREE.MeshStandardMaterial;
      // Authentic old projector flicker
      const time = state.clock.elapsedTime;
      const flicker = 0.95 +
        Math.sin(time * 24) * 0.02 +
        Math.sin(time * 37) * 0.015 +
        Math.sin(time * 53) * 0.01 +
        (Math.random() > 0.97 ? -0.1 : 0); // Random flicker drops
      material.emissiveIntensity = Math.max(0.3, flicker * 0.5);
    }
  });

  return (
    <mesh ref={screenRef as React.RefObject<THREE.Mesh>} position={[0, 0.5, -6]}>
      <planeGeometry args={[12, 7]} />
      <meshStandardMaterial
        color="#f5f0e5"
        emissive="#fff8e8"
        emissiveIntensity={0.4}
        roughness={0.98}
        metalness={0}
      />
    </mesh>
  );
});

CinemaScreen.displayName = 'CinemaScreen';

// ============================================================================
// SCREEN FRAME - Classic movie theater screen frame
// ============================================================================

const ScreenFrame = () => {
  return (
    <group position={[0, 0.5, -5.9]}>
      {/* Top border - ornate */}
      <mesh position={[0, 3.7, 0]}>
        <boxGeometry args={[13, 0.5, 0.15]} />
        <meshStandardMaterial color="#1a1008" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Bottom border */}
      <mesh position={[0, -3.0, 0]}>
        <boxGeometry args={[13, 0.5, 0.15]} />
        <meshStandardMaterial color="#1a1008" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Left border */}
      <mesh position={[-6.2, 0.35, 0]}>
        <boxGeometry args={[0.5, 7.2, 0.15]} />
        <meshStandardMaterial color="#1a1008" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Right border */}
      <mesh position={[6.2, 0.35, 0]}>
        <boxGeometry args={[0.5, 7.2, 0.15]} />
        <meshStandardMaterial color="#1a1008" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Gold trim - top */}
      <mesh position={[0, 3.4, 0.08]}>
        <boxGeometry args={[12.5, 0.08, 0.02]} />
        <meshStandardMaterial color="#c9a54d" emissive="#8b7355" emissiveIntensity={0.3} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Gold trim - bottom */}
      <mesh position={[0, -2.7, 0.08]}>
        <boxGeometry args={[12.5, 0.08, 0.02]} />
        <meshStandardMaterial color="#c9a54d" emissive="#8b7355" emissiveIntensity={0.3} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

// ============================================================================
// VINTAGE PROJECTOR - Visible on LEFT side with light beam
// ============================================================================

const VintageProjector = () => {
  const groupRef = useRef<THREE.Group>(null);
  const topReelRef = useRef<THREE.Mesh>(null);
  const bottomReelRef = useRef<THREE.Mesh>(null);
  const lightBeamRef = useRef<THREE.Mesh>(null);
  const innerBeamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Spin film reels
    if (topReelRef.current) {
      topReelRef.current.rotation.z = time * 2;
    }
    if (bottomReelRef.current) {
      bottomReelRef.current.rotation.z = time * 2.5;
    }

    // Light beam flicker
    if (lightBeamRef.current) {
      const material = lightBeamRef.current.material as THREE.MeshBasicMaterial;
      const flicker = 0.9 + Math.sin(time * 30) * 0.05 + Math.sin(time * 47) * 0.03;
      material.opacity = 0.35 * flicker;
    }
    if (innerBeamRef.current) {
      const material = innerBeamRef.current.material as THREE.MeshBasicMaterial;
      const flicker = 0.9 + Math.sin(time * 30) * 0.05;
      material.opacity = 0.2 * flicker;
    }

    // Subtle projector vibration
    if (groupRef.current) {
      groupRef.current.position.y = 2.5 + Math.sin(time * 25) * 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[-9, 2.5, 2]} rotation={[0, 0.3, 0]}>
      {/* PROJECTOR BODY */}
      <mesh castShadow>
        <boxGeometry args={[1, 0.8, 1.2]} />
        <meshStandardMaterial color="#2a2420" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Top panel */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[1.05, 0.1, 1.25]} />
        <meshStandardMaterial color="#1a1614" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* FILM REELS */}
      {/* Top reel (supply) */}
      <group position={[0, 0.9, -0.2]}>
        <mesh ref={topReelRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
          <meshStandardMaterial color="#1a1614" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Reel spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <mesh
            key={angle}
            position={[Math.cos(angle * Math.PI / 180) * 0.25, 0.05, Math.sin(angle * Math.PI / 180) * 0.25]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <boxGeometry args={[0.03, 0.07, 0.4]} />
            <meshStandardMaterial color="#2a2420" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        {/* Center hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
          <meshStandardMaterial color="#3a3430" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Film on reel */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.38, 0.06, 32]} />
          <meshStandardMaterial color="#3a2a1a" metalness={0.2} roughness={0.8} />
        </mesh>
      </group>

      {/* Bottom reel (take-up) */}
      <group position={[0, -0.6, -0.2]}>
        <mesh ref={bottomReelRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.07, 32]} />
          <meshStandardMaterial color="#1a1614" metalness={0.85} roughness={0.2} />
        </mesh>
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <mesh
            key={angle}
            position={[Math.cos(angle * Math.PI / 180) * 0.2, 0.04, Math.sin(angle * Math.PI / 180) * 0.2]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <boxGeometry args={[0.025, 0.06, 0.32]} />
            <meshStandardMaterial color="#2a2420" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
          <meshStandardMaterial color="#3a3430" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>

      {/* LENS HOUSING */}
      <group position={[0.55, 0, 0.3]} rotation={[0, 0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.15, 0.35, 24]} />
          <meshStandardMaterial color="#1a1614" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Lens glass - glowing */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 24]} />
          <meshStandardMaterial
            color="#fff8e0"
            emissive="#ffdd88"
            emissiveIntensity={2}
            transparent
            opacity={0.95}
          />
        </mesh>
        {/* Lens glow effect */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial
            color="#ffeeaa"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* LIGHT BEAM - Projecting to screen */}
      <mesh
        ref={lightBeamRef}
        position={[5, -0.8, -3.5]}
        rotation={[0.15, 0.45, 0.05]}
      >
        <coneGeometry args={[5, 14, 32, 1, true]} />
        <meshBasicMaterial
          color="#fff8e0"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner brighter beam */}
      <mesh
        ref={innerBeamRef}
        position={[4.5, -0.7, -3]}
        rotation={[0.15, 0.45, 0.05]}
      >
        <coneGeometry args={[3, 12, 24, 1, true]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Projector spotlight */}
      <spotLight
        position={[0.5, 0, 0.4]}
        target-position={[12, -2, -8]}
        angle={0.35}
        penumbra={0.3}
        intensity={8}
        color="#fff4e0"
        castShadow
      />

      {/* Warm glow around projector */}
      <pointLight position={[0, 0, 0.5]} intensity={2} color="#ffaa44" distance={6} />

      {/* Power indicator */}
      <mesh position={[0.4, 0.3, 0.55]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={3} />
      </mesh>
    </group>
  );
};

// ============================================================================
// DUST PARTICLES in projector beam
// ============================================================================

const DustInBeam = ({ count = 500 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute along beam path from projector to screen
      const t = Math.random();
      const startX = -8;
      const endX = 0;
      const spread = 1 + t * 4;

      positions[i * 3] = startX + (endX - startX) * t + (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = 2 - t * 1.5 + (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = 2 - t * 8 + (Math.random() - 0.5) * spread * 0.5;

      speeds[i] = Math.random() * 0.3 + 0.1;
    }

    return { positions, speeds };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;

    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle floating motion
      positions[i3] += Math.sin(time * 0.5 + i * 0.1) * 0.002;
      positions[i3 + 1] += particles.speeds[i] * 0.002 + Math.cos(time * 0.7 + i) * 0.001;
      positions[i3 + 2] += Math.sin(time * 0.3 + i * 0.05) * 0.001;

      // Reset particles
      if (positions[i3 + 1] > 5) {
        positions[i3 + 1] = -2;
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffe8c4"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ============================================================================
// RETRO THEATER ENVIRONMENT
// ============================================================================

const RetroTheater = () => {
  return (
    <group>
      {/* Dark theater background */}
      <mesh position={[0, 0, -8]}>
        <planeGeometry args={[40, 25]} />
        <meshStandardMaterial color="#0a0604" roughness={0.98} />
      </mesh>

      {/* Floor - dark carpet */}
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#1a0a08" roughness={0.95} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#080402" roughness={0.98} />
      </mesh>

      {/* Left wall - deep red velvet */}
      <mesh position={[-14, 2, -2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#2a0a0a" roughness={0.92} />
      </mesh>

      {/* Right wall */}
      <mesh position={[14, 2, -2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#2a0a0a" roughness={0.92} />
      </mesh>
    </group>
  );
};

// ============================================================================
// MAIN CINEMA SCENE
// ============================================================================

const CinemaScene = ({ mousePosition }: CinemaSceneProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 1, 10], fov: 50 }}>
        <CameraController mousePosition={mousePosition} />

        <Suspense fallback={null}>
          {/* Very dim ambient light - dark theater */}
          <ambientLight intensity={0.03} color="#fff8e0" />

          {/* Theater environment */}
          <RetroTheater />

          {/* Cinema screen */}
          <CinemaScreen />
          <ScreenFrame />

          {/* Visible projector on the LEFT with light beam */}
          <VintageProjector />

          {/* Dust particles in the projector beam */}
          <DustInBeam count={400} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CinemaScene;
