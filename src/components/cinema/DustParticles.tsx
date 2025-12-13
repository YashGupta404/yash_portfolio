import { useRef, useMemo, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DustParticlesProps {
  count?: number;
}

const DustParticles = forwardRef<THREE.Points, DustParticlesProps>(({ count = 200 }, ref) => {
  const internalRef = useRef<THREE.Points>(null);
  const meshRef = ref || internalRef;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Concentrate particles in the projector beam area
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.random() * 8 - 2;
      sizes[i] = Math.random() * 0.04 + 0.01;
      speeds[i] = Math.random() * 0.3 + 0.1;
    }

    return { positions, sizes, speeds };
  }, [count]);

  useFrame((state) => {
    const mesh = (meshRef as React.RefObject<THREE.Points>).current;
    if (!mesh) return;

    const positions = mesh.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Floating motion with turbulence
      positions[i3] += Math.sin(time * 0.5 + i) * 0.002;
      positions[i3 + 1] += particles.speeds[i] * 0.003;
      positions[i3 + 2] += Math.cos(time * 0.3 + i * 0.5) * 0.001;

      // Reset particles that float too high
      if (positions[i3 + 1] > 3) {
        positions[i3 + 1] = -3;
        positions[i3] = (Math.random() - 0.5) * 6;
        positions[i3 + 2] = Math.random() * 8 - 2;
      }
    }

    mesh.geometry.attributes.position.needsUpdate = true;
    
    // Subtle rotation for natural floating feel
    mesh.rotation.y = Math.sin(time * 0.1) * 0.02;
  });

  return (
    <points ref={meshRef as React.RefObject<THREE.Points>}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffe8c4"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

DustParticles.displayName = 'DustParticles';

export default DustParticles;
