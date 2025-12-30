import { useRef, forwardRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectorModelProps {
  position?: [number, number, number];
}

// ============================================================================
// VINTAGE FILM PROJECTOR - LEFT SIDE (Like Reference Image)
// ============================================================================

const ProjectorModel = forwardRef<THREE.Group, ProjectorModelProps>(({ position = [-7, 1.5, 4] }, ref) => {
  const groupRef = useRef<THREE.Group>(null);
  const topReelRef = useRef<THREE.Group>(null);
  const bottomReelRef = useRef<THREE.Group>(null);
  const filmStripRef = useRef<THREE.Group>(null);
  const lightConeRef = useRef<THREE.Mesh>(null);
  const innerLightRef = useRef<THREE.Mesh>(null);
  const lensGlowRef = useRef<THREE.Mesh>(null);
  const flickerRef = useRef(0);
  const filmScrollRef = useRef(0);

  // Film strip sprocket holes positions
  const sprocketPositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 20; i++) {
      positions.push(i * 0.12 - 1.2);
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Spin film reels at realistic 24fps equivalent speed
    if (topReelRef.current) {
      topReelRef.current.rotation.z = time * 1.8;
    }
    if (bottomReelRef.current) {
      bottomReelRef.current.rotation.z = time * 2.4;
    }

    // Scroll film strip
    filmScrollRef.current = (time * 0.5) % 0.24;
    if (filmStripRef.current) {
      filmStripRef.current.position.y = filmScrollRef.current;
    }

    // Authentic projector flicker (24fps shutter effect)
    if (lightConeRef.current) {
      const shutterPhase = (time * 24) % 1;
      const shutterFlicker = shutterPhase < 0.5 ? 1 : 0.92;

      flickerRef.current =
        shutterFlicker *
        (0.88 +
          Math.sin(time * 31) * 0.04 +
          Math.sin(time * 47) * 0.025 +
          Math.sin(time * 67) * 0.015);

      const material = lightConeRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.22 * flickerRef.current;
    }

    // Inner light beam
    if (innerLightRef.current) {
      const material = innerLightRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.15 * flickerRef.current;
    }

    // Lens glow pulsing
    if (lensGlowRef.current) {
      const material = lensGlowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.7 + Math.sin(time * 4) * 0.2;
      lensGlowRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.05);
    }

    // Projector body vibration from motor
    if (groupRef.current) {
      groupRef.current.position.y = position[1] +
        Math.sin(time * 22) * 0.003 +
        Math.sin(time * 35) * 0.002;
      groupRef.current.rotation.z = Math.sin(time * 18) * 0.001;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, Math.PI * 0.15, 0]}>

      {/* ================================================================== */}
      {/* MAIN PROJECTOR BODY */}
      {/* ================================================================== */}

      {/* Base platform */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 0.9]} />
        <meshStandardMaterial color="#1a1816" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Main housing - lower section */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <boxGeometry args={[0.9, 0.6, 0.7]} />
        <meshStandardMaterial color="#2a2826" metalness={0.65} roughness={0.4} />
      </mesh>

      {/* Main housing - upper section */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.7, 0.5, 0.6]} />
        <meshStandardMaterial color="#252321" metalness={0.6} roughness={0.45} />
      </mesh>

      {/* Film gate housing */}
      <mesh position={[0, 0.1, 0.32]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.12]} />
        <meshStandardMaterial color="#1a1816" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Side panels with ventilation */}
      {[-0.38, 0.38].map((x, i) => (
        <group key={`side-${i}`} position={[x, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.05, 0.8, 0.65]} />
            <meshStandardMaterial color="#1e1c1a" metalness={0.65} roughness={0.45} />
          </mesh>
          {/* Vent slots */}
          {[-0.2, -0.1, 0, 0.1, 0.2].map((y, j) => (
            <mesh key={j} position={[0.03 * (i === 0 ? -1 : 1), y, 0]}>
              <boxGeometry args={[0.02, 0.03, 0.4]} />
              <meshStandardMaterial color="#0a0908" metalness={0.8} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ================================================================== */}
      {/* FILM STRIP (Vertical, on the left side) */}
      {/* ================================================================== */}

      <group position={[-0.55, 0.3, 0]} ref={filmStripRef}>
        {/* Film strip base */}
        <mesh>
          <boxGeometry args={[0.1, 2.4, 0.02]} />
          <meshStandardMaterial
            color="#2a1a0a"
            metalness={0.2}
            roughness={0.8}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Sprocket holes - left side */}
        {sprocketPositions.map((y, i) => (
          <group key={`sprocket-left-${i}`}>
            <mesh position={[-0.035, y, 0.01]}>
              <boxGeometry args={[0.02, 0.06, 0.02]} />
              <meshStandardMaterial color="#0a0806" metalness={0.1} roughness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Sprocket holes - right side */}
        {sprocketPositions.map((y, i) => (
          <group key={`sprocket-right-${i}`}>
            <mesh position={[0.035, y, 0.01]}>
              <boxGeometry args={[0.02, 0.06, 0.02]} />
              <meshStandardMaterial color="#0a0806" metalness={0.1} roughness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Film frames (simulated) */}
        {sprocketPositions.filter((_, i) => i % 3 === 0).map((y, i) => (
          <mesh key={`frame-${i}`} position={[0, y, 0.012]}>
            <planeGeometry args={[0.06, 0.08]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#3a3020" : "#2a2015"}
              metalness={0.1}
              roughness={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* ================================================================== */}
      {/* TOP FILM REEL (Supply reel - larger) */}
      {/* ================================================================== */}

      <group ref={topReelRef} position={[-0.35, 0.85, -0.05]}>
        {/* Reel disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.06, 48]} />
          <meshStandardMaterial color="#0a0908" metalness={0.92} roughness={0.15} />
        </mesh>

        {/* Reel flanges */}
        {[-0.035, 0.035].map((z, i) => (
          <mesh key={`flange-top-${i}`} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.48, 0.48, 0.01, 48]} />
            <meshStandardMaterial color="#1a1816" metalness={0.85} roughness={0.2} />
          </mesh>
        ))}

        {/* Spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <mesh
            key={`spoke-top-${i}`}
            position={[
              Math.cos(angle * Math.PI / 180) * 0.22,
              Math.sin(angle * Math.PI / 180) * 0.22,
              0
            ]}
            rotation={[Math.PI / 2, 0, angle * Math.PI / 180]}
          >
            <boxGeometry args={[0.04, 0.05, 0.38]} />
            <meshStandardMaterial color="#1a1815" metalness={0.8} roughness={0.25} />
          </mesh>
        ))}

        {/* Center hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 24]} />
          <meshStandardMaterial color="#2a2520" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Film wound on reel */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.35, 0.04, 48]} />
          <meshStandardMaterial color="#3a2a1a" metalness={0.3} roughness={0.75} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* BOTTOM FILM REEL (Take-up reel - smaller) */}
      {/* ================================================================== */}

      <group ref={bottomReelRef} position={[-0.35, -0.45, -0.05]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.05, 48]} />
          <meshStandardMaterial color="#0a0908" metalness={0.92} roughness={0.15} />
        </mesh>

        {[-0.03, 0.03].map((z, i) => (
          <mesh key={`flange-bottom-${i}`} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.01, 48]} />
            <meshStandardMaterial color="#1a1816" metalness={0.85} roughness={0.2} />
          </mesh>
        ))}

        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh
            key={`spoke-bottom-${i}`}
            position={[
              Math.cos(angle * Math.PI / 180) * 0.16,
              Math.sin(angle * Math.PI / 180) * 0.16,
              0
            ]}
            rotation={[Math.PI / 2, 0, angle * Math.PI / 180]}
          >
            <boxGeometry args={[0.035, 0.045, 0.26]} />
            <meshStandardMaterial color="#1a1815" metalness={0.8} roughness={0.25} />
          </mesh>
        ))}

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 24]} />
          <meshStandardMaterial color="#2a2520" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Less film on take-up reel */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.15, 0.035, 48]} />
          <meshStandardMaterial color="#3a2a1a" metalness={0.3} roughness={0.75} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* LENS ASSEMBLY */}
      {/* ================================================================== */}

      <group position={[0.15, 0.1, 0.4]}>
        {/* Lens barrel */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.15, 0.25, 24]} />
          <meshStandardMaterial color="#1a1816" metalness={0.82} roughness={0.28} />
        </mesh>

        {/* Lens rings */}
        {[0.02, 0.08, 0.14].map((z, i) => (
          <mesh key={`ring-${i}`} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13 - i * 0.01, 0.015, 8, 32]} />
            <meshStandardMaterial color="#2a2826" metalness={0.75} roughness={0.35} />
          </mesh>
        ))}

        {/* Front lens element (glass) */}
        <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
          <meshStandardMaterial
            color="#ffeedd"
            emissive="#ffcc88"
            emissiveIntensity={1.2}
            transparent
            opacity={0.92}
            metalness={0.1}
            roughness={0.05}
          />
        </mesh>

        {/* Lens flare/glow */}
        <mesh ref={lensGlowRef} position={[0, 0, 0.18]}>
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial
            color="#ffeedd"
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Outer glow rings */}
        {[0.25, 0.35, 0.45].map((radius, i) => (
          <mesh key={`glow-ring-${i}`} position={[0, 0, 0.17 - i * 0.01]}>
            <ringGeometry args={[radius - 0.02, radius, 32]} />
            <meshBasicMaterial
              color="#ffddbb"
              transparent
              opacity={0.15 - i * 0.04}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      {/* ================================================================== */}
      {/* LIGHT BEAM (Prominent, pointing at screen) */}
      {/* ================================================================== */}

      {/* Main visible light cone */}
      <mesh
        ref={lightConeRef}
        position={[4.5, -0.3, -1.8]}
        rotation={[0.08, Math.PI * 0.42, 0]}
      >
        <coneGeometry args={[4.2, 12, 48, 1, true]} />
        <meshBasicMaterial
          color="#fff8e8"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner brighter cone */}
      <mesh
        ref={innerLightRef}
        position={[4, -0.25, -1.5]}
        rotation={[0.08, Math.PI * 0.42, 0]}
      >
        <coneGeometry args={[3.2, 10, 32, 1, true]} />
        <meshBasicMaterial
          color="#fffaf0"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Core light beam */}
      <mesh
        position={[3.5, -0.2, -1.2]}
        rotation={[0.08, Math.PI * 0.42, 0]}
      >
        <coneGeometry args={[1.8, 8, 24, 1, true]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* ================================================================== */}
      {/* LIGHTING */}
      {/* ================================================================== */}

      {/* Main projector spotlight */}
      <spotLight
        position={[0.15, 0.1, 0.5]}
        target-position={[12, -1, -8]}
        angle={0.4}
        penumbra={0.35}
        intensity={6}
        color="#ffefd5"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Lens glow light */}
      <pointLight
        position={[0.15, 0.1, 0.5]}
        intensity={3}
        color="#ffddaa"
        distance={10}
        decay={2}
      />

      {/* Body ambient warmth */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#ff9944" distance={3} />

      {/* Motor indicator light (red) */}
      <mesh position={[0.3, 0.25, 0.35]}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial
          color="#ff4444"
          emissive="#ff0000"
          emissiveIntensity={2}
        />
      </mesh>
      <pointLight position={[0.3, 0.25, 0.35]} intensity={0.4} color="#ff0000" distance={0.4} />

      {/* Film transport indicator (green) */}
      <mesh position={[0.25, 0.25, 0.35]}>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshStandardMaterial
          color="#44ff44"
          emissive="#00ff00"
          emissiveIntensity={1.5}
        />
      </mesh>
      <pointLight position={[0.25, 0.25, 0.35]} intensity={0.3} color="#00ff00" distance={0.3} />

      {/* ================================================================== */}
      {/* ADDITIONAL MECHANICAL DETAILS */}
      {/* ================================================================== */}

      {/* Film guide rollers */}
      {([
        { pos: [-0.45, 0.5, 0.02] as [number, number, number], size: 0.03 },
        { pos: [-0.45, -0.1, 0.02] as [number, number, number], size: 0.03 },
        { pos: [-0.15, 0.3, 0.35] as [number, number, number], size: 0.025 },
        { pos: [-0.15, -0.1, 0.35] as [number, number, number], size: 0.025 },
      ]).map((roller, i) => (
        <mesh key={`roller-${i}`} position={roller.pos} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[roller.size, roller.size, 0.15, 16]} />
          <meshStandardMaterial color="#2a2826" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}

      {/* Control knobs */}
      {([
        { pos: [0.45, 0.15, 0.2] as [number, number, number], size: 0.04 },
        { pos: [0.45, -0.05, 0.2] as [number, number, number], size: 0.035 },
        { pos: [0.45, -0.25, 0.2] as [number, number, number], size: 0.04 },
      ]).map((knob, i) => (
        <group key={`knob-${i}`} position={knob.pos}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[knob.size, knob.size, 0.03, 16]} />
            <meshStandardMaterial color="#1a1816" metalness={0.75} roughness={0.3} />
          </mesh>
          {/* Knob grip lines */}
          {[0, 45, 90, 135].map((angle, j) => (
            <mesh
              key={j}
              position={[0.016, 0, 0]}
              rotation={[angle * Math.PI / 180, 0, Math.PI / 2]}
            >
              <boxGeometry args={[0.002, knob.size * 1.8, 0.002]} />
              <meshStandardMaterial color="#0a0908" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Manufacturer plate */}
      <mesh position={[0, -0.55, 0.36]}>
        <boxGeometry args={[0.25, 0.08, 0.005]} />
        <meshStandardMaterial color="#2a2520" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
});

ProjectorModel.displayName = 'ProjectorModel';

export default ProjectorModel;
