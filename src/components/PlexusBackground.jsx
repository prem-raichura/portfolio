import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* --------------------------------------------------------
    PLEXUS POINTS (Optimized)
-------------------------------------------------------- */
const PlexusPoints = ({ count = 150, maxDistance = 3.5, mouse }) => {
  const pointsRef = useRef();
  const linesRef = useRef();

  const { viewport } = useThree();

  // Pre-allocated vectors (no GC churn in animation loop)
  const mouse3D = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  // Pre-generate particles (positions + velocities)
  const particles = useMemo(() => {
    const arr = new Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = {
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
      };
    }
    return arr;
  }, [count]);

  // One-time line buffer (fixed size)
  const linePositions = useMemo(
    () => new Float32Array(count * count * 6),
    [count]
  );

  /* --------------------------------------------------------
      ANIMATION LOOP (Optimized)
  -------------------------------------------------------- */
  useFrame((state) => {
    const positions = pointsRef.current.geometry.attributes.position.array;
    const lines = linesRef.current.geometry.attributes.position.array;

    let lineCount = 0;
    const time = state.clock.getElapsedTime() * 0.1;

    // Project mouse to 3D world
    mouse3D.set(
      (mouse.current.x * viewport.width) / 2,
      (mouse.current.y * viewport.height) / 2,
      0
    );

    for (let i = 0; i < count; i++) {
      const p = particles[i].position;
      const v = particles[i].velocity;

      // Curl force (unchanged, only optimized)
      v.x += Math.sin(p.y * 0.5 + time) * 0.0005;
      v.y += Math.cos(p.x * 0.5 + time) * 0.0005;
      v.z += Math.sin(p.z * 0.5 + time) * 0.0005;

      // Mouse repulsion (optimized)
      const dist = p.distanceTo(mouse3D);
      if (dist < 3) {
        dir.copy(p).sub(mouse3D).normalize();
        v.addScaledVector(dir, (1 - dist / 3) * 0.08);
      }

      // Apply velocity
      p.add(v);
      v.multiplyScalar(0.98); // damping

      // Boundary wrapping
      if (p.x > 25) p.x = -25;
      if (p.x < -25) p.x = 25;
      if (p.y > 25) p.y = -25;
      if (p.y < -25) p.y = 25;
      if (p.z > 25) p.z = -25;
      if (p.z < -25) p.z = 25;

      // Push positions to buffer
      const i3 = i * 3;
      positions[i3] = p.x;
      positions[i3 + 1] = p.y;
      positions[i3 + 2] = p.z;

      /* ----------------------------------------
          Line linking (optimized loop)
      ---------------------------------------- */
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j].position;
        if (p.distanceTo(p2) < maxDistance) {
          const l = lineCount * 6;

          lines[l] = p.x;
          lines[l + 1] = p.y;
          lines[l + 2] = p.z;

          lines[l + 3] = p2.x;
          lines[l + 4] = p2.y;
          lines[l + 5] = p2.z;

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
      {/* Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(count * 3)}
            count={count}
            itemSize={3}
          />
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

      {/* Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={count * count}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#9CA3AF"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

/* --------------------------------------------------------
    MAIN BACKGROUND WRAPPER
-------------------------------------------------------- */
const PlexusBackground = () => {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <div className="fixed inset-0 -z-10" onMouseMove={handleMouseMove}>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
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
