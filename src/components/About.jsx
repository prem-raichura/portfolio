import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const codeComments = [
  ["🧑‍💻 Open VS Code", "😎 Open 20 tabs in browser", "😳 Stare at code", "❓ Question life choices", "😅 Add a semicolon;", "✅ Feel GREAT"],
  ["// I don't always test my code...", "// my assistants do.", "// I call them 'users'."],
  ["🔥 In case of fire:", "   1. git commit -a -m", "   2. git push", "   3. leave the building"],
  ["If the computer knows:", "I am missing a semicolon;", "why won't it add it itself?"],
  ["It's not a bug,", "it's an undocumented feature."],
  ["Talk is cheap. Show me the code.", "Linus Torvalds"],
];

const About = () => {
  const cardRef = useRef(null);

  // motion-controlled tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // rotating text
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % codeComments.length);
    }, 7500);
    return () => clearInterval(interval);
  }, []);

  const textAnimationVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 20 } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    }),
    []
  );

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-primary/80 overflow-hidden">
      <motion.div
        className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-stretch"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.3 }}
      >
        {/* LEFT TEXT SIDE */}
        <motion.div
          className="flex flex-col justify-center"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.7,
                ease: "easeOut"
              }
            }
          }}
        >
          <h2 className="text-4xl font-bold mb-6 flex items-center font-handwritten">
            Hey there! I'm Prem
            <motion.span
              className="ml-3 text-3xl"
              animate={{ rotate: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              aria-hidden="true"
            >
              👋
            </motion.span>
          </h2>

          <div className="text-accent text-lg space-y-4 leading-relaxed font-mono">
            <p>
              I'm a developer who enjoys building things with code — especially when it involves
              <span className="text-text"> algorithms, creativity,</span> and
              <span className="text-text"> real-world problem solving.</span>
            </p>
            <p>
              I thrive on turning complex challenges into smooth, clean user interfaces and robust backend systems.
            </p>
          </div>
        </motion.div>

        {/* RIGHT TILT CARD */}
        <div className="relative" style={{ perspective: 1000 }}>
          <motion.div
            ref={cardRef}
            className="relative h-full"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.7,
                  ease: "easeOut"
                }
              }
            }}
          >
            {/* glow border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-highlight to-cyan-400 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            {/* actual card */}
            <div
              className="relative h-full bg-secondary/60 backdrop-blur-xl rounded-xl p-6 border border-white/10 font-mono text-base text-accent shadow-2xl ring-1 ring-inset ring-white/10 flex flex-col"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="text-left flex-grow flex items-center" style={{ transform: "translateZ(20px)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    variants={textAnimationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
                  >
                    {codeComments[currentIndex].map((line, i) => (
                      <p key={i} className="leading-relaxed">
                        {line.startsWith("//") ? (
                          <>
                            <span className="text-green-500/80 mr-3 select-none">//</span>
                            <span>{line.substring(3)}</span>
                          </>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
