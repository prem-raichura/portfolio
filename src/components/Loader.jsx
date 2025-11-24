import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Loader = ({ onDone }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.section
      className="h-screen w-full bg-black flex flex-col items-center justify-start relative overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* SOFT BACKGROUND GLOW */}
      <div className="absolute inset-0 opacity-[0.15] blur-[120px] pointer-events-none" />

      {/* NAVBAR SKELETON */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 drop-shadow-xl">
        <div className="container mx-auto max-w-6xl bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 flex justify-between items-center shadow-[0_0_25px_rgba(255,255,255,0.05)]">

          {/* Left Name Placeholder */}
          <div className="relative space-y-2">
            <div className="h-10 w-40 rounded-md skeleton-pro" />
            <div className="h-2 w-32 rounded-md skeleton-pro" />
          </div>

          {/* Right Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="h-6 w-16 rounded skeleton-pro" />
            <div className="h-6 w-16 rounded skeleton-pro" />
            <div className="h-6 w-20 rounded skeleton-pro" />
            <div className="h-6 w-28 rounded skeleton-pro" />
            <div className="h-6 w-20 rounded skeleton-pro" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <div className="h-8 w-8 rounded-md skeleton-pro" />
          </div>
        </div>
      </div>

      {/* HERO CONTENT SKELETON */}
      <div className="container mx-auto max-w-6xl h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-8 mt-28">

        {/* LEFT COLUMN */}
        <div className="w-full md:w-3/5 flex flex-col gap-6">

          <div className="h-14 w-72 rounded-md skeleton-pro" />
          <div className="h-8 w-96 rounded-md skeleton-pro" />
          <div className="h-8 w-80 rounded-md skeleton-pro" />

          <div className="flex gap-4 mt-4">
            <div className="h-14 w-36 rounded-lg skeleton-pro" />
            <div className="h-14 w-36 rounded-lg skeleton-pro" />
          </div>
        </div>

        {/* RIGHT SPHERE SKELETON */}
        <div className="w-full md:w-2/5 flex justify-center mt-16 md:mt-0 relative">
          <div className="h-[25rem] w-[30rem] skeleton-pro ring-1 ring-white/10 shadow-[0_0_40px_rgba(255,255,255,0.08)] polygon-10" />
        </div>


      </div>
    </motion.section>
  );
};

export default Loader;
