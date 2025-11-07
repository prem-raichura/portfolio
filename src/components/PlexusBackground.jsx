import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const PlexusPoints = ({ count = 150, maxDistance = 3.5, mouse }) => {
  const pointsRef = useRef();
  const linesRef = useRef();
  const { viewport } = useThree();

  // Store initial positions and add velocities
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      temp.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01),
      });
    }
    return temp;
  }, [count]);

  const linePositions = useMemo(() => {
    return new Float32Array(count * count * 6);
  }, [count]);

  // For 3D mouse interaction
  const mouse3D = new THREE.Vector3();
  const repulsionRadius = 3;
  const repulsionStrength = 0.08;

  useFrame((state, delta) => {
    // Project 2D mouse into 3D space
    mouse3D.set(
      (mouse.current.x * viewport.width) / 2,
      (mouse.current.y * viewport.height) / 2,
      0
    );

    const positions = pointsRef.current.geometry.attributes.position.array;
    const lines = linesRef.current.geometry.attributes.position.array;
    let lineCount = 0;
    const time = state.clock.getElapsedTime() * 0.1;

    for (let i = 0; i < count; i++) {
      const p = particles[i].position;
      const v = particles[i].velocity;

      const curlForce = new THREE.Vector3(
        Math.sin(p.y * 0.5 + time),
        Math.cos(p.x * 0.5 + time),
        Math.sin(p.z * 0.5 + time)
      ).multiplyScalar(0.0005); // SPEED REDUCED EVEN MORE
      v.add(curlForce);

      // Mouse repulsion
      const dist = p.distanceTo(mouse3D);
      if (dist < repulsionRadius) {
        const force = (1 - dist / repulsionRadius) * repulsionStrength;
        const dir = p.clone().sub(mouse3D).normalize().multiplyScalar(force);
        v.add(dir);
      }

      // Apply velocity and damping
      p.add(v);
      v.multiplyScalar(0.98); // Damping

      // Boundary check (wrap around)
      if (p.y > 25) p.y = -25;
      if (p.y < -25) p.y = 25;
      if (p.x > 25) p.x = -25;
      if (p.x < -25) p.x = 25;
      if (p.z > 25) p.z = -25;
      if (p.z < -25) p.z = 25;

      positions[i * 3 + 0] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;

      // Check for line connections
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j].position;
        const dist = p.distanceTo(p2);

        if (dist < maxDistance) {
          if (lineCount >= count * count) break; // Safety break
          
          lines[lineCount * 6 + 0] = p.x;
          lines[lineCount * 6 + 1] = p.y;
          lines[lineCount * 6 + 2] = p.z;
          lines[lineCount * 6 + 3] = p2.x;
          lines[lineCount * 6 + 4] = p2.y;
          lines[lineCount * 6 + 5] = p2.z;
          lineCount++;
        }
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineCount * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={new Float32Array(count * 3)} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          color="#00E5FF" 
          emissive="#00E5FF"
          emissiveIntensity={1.5}
          size={0.08} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending} 
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count * count} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#9CA3AF" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
};

const PlexusBackground = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    // Normalize mouse position from -1 to 1
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <div className="fixed inset-0 -z-10" onMouseMove={handleMouseMove}>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} >
        <ambientLight intensity={0.5} />
        <PlexusPoints mouse={mouse} />
        <EffectComposer>
          <Bloom 
            intensity={0.4}
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default PlexusBackground;