import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import * as THREE from "three";

/* -------------------------------------------------------
   MultiColor 3D Shape (Optimized but same animation)
------------------------------------------------------- */
const MultiColorShape = React.memo(() => {
  const meshRef = useRef();

  // Safe initial scale
  const [scale, setScale] = useState(() => (typeof window !== "undefined" && window.innerWidth < 768 ? 1.5 : 1.8));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setScale(1.5);
      else setScale(1.8);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const uniforms = useMemo(() => ({ u_time: { value: 0.0 } }), []);

  const vertexShader = useMemo(
    () => `
      varying vec3 vNormal;
      void main() { 
        vNormal = normal; 
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
      }
    `,
    []
  );

  const fragmentShader = useMemo(
    () => `
      precision mediump float;
      uniform float u_time;
      varying vec3 vNormal;

      vec3 rainbow(float t) {
        return vec3(
          0.5 + 0.5 * cos(6.28318 * (t)),
          0.5 + 0.5 * cos(6.28318 * (t + 0.333)),
          0.5 + 0.5 * cos(6.28318 * (t + 0.666))
        );
      }

      void main() {
        float timeFactor = u_time * 0.2;
        vec3 color = rainbow((vNormal.x + vNormal.y + vNormal.z) * 0.33 + timeFactor);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;
      meshRef.current.material.uniforms.u_time.value = t;
      meshRef.current.scale.setScalar(scale + Math.sin(t) * 0.1);
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 1]}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={true}
      />
    </Icosahedron>
  );
});

/* -------------------------------------------------------
   HERO SECTION (SEO + Performance)
------------------------------------------------------- */

const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen w-full relative overflow-hidden"
      aria-label="Hero section"
    >
      <div className="container mx-auto max-w-6xl h-full flex flex-col md:flex-row 
                      items-center justify-center md:justify-between px-4 md:px-8">

        {/* LEFT CONTENT */}
        <div className="relative z-10 w-full md:w-3/5 text-center md:text-left">
          
          {/* Proper SEO h1 */}
          <motion.h1
            className="text-4xl md:text-7xl font-black text-white font-handwritten"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Prem Raichura
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg md:text-2xl text-pink-400 mt-6 font-handwritten"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            A Backend Developer Architecting Robust Systems.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {/* Resume Button */}
            <a
              href="/files/resume.pdf"
              download
              aria-label="Download resume"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 bg-white 
                         text-black font-medium rounded-lg shadow-lg hover:bg-gray-100 
                         transition-all duration-300"
            >
              <ArrowUpRight size={18} />
              Resume
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/prem-raichura"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub profile"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 border 
                         border-white text-white font-medium rounded-lg hover:bg-white hover:text-black 
                         transition-all duration-300"
            >
              <Github size={18} />
              GitHub
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Canvas */}
        <div className="relative w-full md:w-2/5 h-1/2 md:h-full">
          <Canvas
            gl={{ alpha: true }}
            style={{ background: "transparent" }}
            className="absolute inset-0 z-0"
            camera={{ position: [0, 0, 5] }} // added camera for stable render
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={1.0} />
              <MultiColorShape />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.4}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Hero;
