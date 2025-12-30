import { useRef, useMemo, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DustParticlesProps {
  count?: number;
}

const DustParticles = forwardRef<THREE.Points, DustParticlesProps>(({ count = 300 }, ref) => {
  const internalRef = useRef<THREE.Points>(null);
  const meshRef = ref || internalRef;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    const brightnesses = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Concentrate more particles in the projector beam path
      const inBeam = Math.random() < 0.7; // 70% in beam

      if (inBeam) {
        // Particles in the light beam cone
        const distance = Math.random() * 9;
        const angle = (Math.random() - 0.5) * 0.6; // Cone angle
        const spread = distance * 0.35;

        positions[i * 3] = Math.cos(angle) * spread + 3; // X
        positions[i * 3 + 1] = Math.sin(angle) * spread - 0.5; // Y
        positions[i * 3 + 2] = -distance + 4; // Z (toward screen)

        brightnesses[i] = 0.7 + Math.random() * 0.3; // Brighter in beam
      } else {
        // Ambient particles outside beam
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = Math.random() * 10 - 3;

        brightnesses[i] = 0.1 + Math.random() * 0.2; // Dimmer outside beam
      }

      // Varied particle sizes
      sizes[i] = Math.random() * 0.06 + 0.02;

      // Varied speeds for natural motion
      speeds[i] = Math.random() * 0.4 + 0.15;

      // Random phase for Brownian motion
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, sizes, speeds, phases, brightnesses };
  }, [count]);

  useFrame((state) => {
    const mesh = (meshRef as React.RefObject<THREE.Points>).current;
    if (!mesh) return;

    const positions = mesh.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const phase = particles.phases[i];

      // Brownian motion (random walk)
      const brownianX = Math.sin(time * 1.5 + phase) * 0.003 +
        Math.sin(time * 3.2 + phase * 1.3) * 0.002;
      const brownianY = Math.cos(time * 1.8 + phase * 0.7) * 0.002 +
        Math.sin(time * 2.5 + phase * 1.8) * 0.0015;
      const brownianZ = Math.cos(time * 2.1 + phase * 1.5) * 0.0025;

      // Apply Brownian motion
      positions[i3] += brownianX;
      positions[i3 + 1] += particles.speeds[i] * 0.004 + brownianY; // Slow upward drift
      positions[i3 + 2] += brownianZ;

      // Slight drift toward screen (simulating air current from projector)
      positions[i3 + 2] -= 0.002;

      // Reset particles that float too high or too far
      if (positions[i3 + 1] > 4) {
        positions[i3 + 1] = -3;
        positions[i3] = (Math.random() - 0.5) * 8 + 2;
        positions[i3 + 2] = Math.random() * 6;
      }

      // Reset particles that drift too far back
      if (positions[i3 + 2] < -6) {
        positions[i3 + 2] = 5;
        positions[i3] = (Math.random() - 0.5) * 8 + 2;
        positions[i3 + 1] = (Math.random() - 0.5) * 4;
      }
    }

    mesh.geometry.attributes.position.needsUpdate = true;

    // Very subtle rotation for natural floating feel
    mesh.rotation.y = Math.sin(time * 0.08) * 0.015;
    mesh.rotation.x = Math.cos(time * 0.06) * 0.01;
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
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffe8c4"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});

DustParticles.displayName = 'DustParticles';

export default DustParticles;
