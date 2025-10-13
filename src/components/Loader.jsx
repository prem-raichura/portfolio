import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  const totalDuration = 1.5; 
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const calculatedProgress = Math.min(100, Math.ceil((elapsed / (totalDuration * 1000)) * 100));
      setProgress(calculatedProgress);

      if (calculatedProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(onLoadingComplete, 300);
      }
    };

    requestAnimationFrame(updateProgress);
    
    const completionTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(onLoadingComplete, 300);
    }, totalDuration * 1000 + 500); // Total duration + buffer

    return () => clearTimeout(completionTimer);
  }, [onLoadingComplete]);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0, delay: 0.2 },
        opacity: { duration: 0.1, delay: 0.2 }
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Code Bracket SVG */}
        <motion.div 
          className="w-24 h-24"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
            <motion.path
              d="M 30 50 L 50 70 L 70 50 L 50 30 Z" // Stylized bracket shape
              fill="none"
              stroke="var(--highlight)"
              strokeWidth="3"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>
        </motion.div>
        
        {/* Percentage Counter */}
        <motion.p
          className="text-2xl text-highlight font-sans mt-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {progress}%
        </motion.p>
        <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="text-lg text-accent mt-6 font-sans"
      >
        LOADING DATA STREAM...
      </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;