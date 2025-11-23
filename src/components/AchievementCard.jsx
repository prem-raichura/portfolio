import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin } from "lucide-react";

const AchievementCard = ({ item, index, onClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto image slider
  useEffect(() => {
    if (!item.images || item.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === item.images.length - 1 ? 0 : prev + 1
      );
    }, 4000 + index * 200); // slightly slower interval
    return () => clearInterval(timer);
  }, [item.images, index]);

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      className="bg-transparent backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 ring-1 ring-inset ring-white/10 h-full flex flex-col cursor-pointer hover:shadow-xl hover:shadow-black/40 transition-all"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* --- Image / Slider Section --- */}
      <div className="relative w-full h-72 md:h-80 lg:h-80 bg-transparent flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.picture
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex items-center justify-center w-full h-full"
          >
            {/* Prefer WebP */}
            <source
              srcSet={item.images[currentSlide].replace(".jpg", ".webp")}
              type="image/webp"
            />

            {/* JPG fallback */}
            <img
              src={item.images[currentSlide]}
              alt={item.title}
              loading="lazy"
              className="
                object-contain w-full h-full
                blur-sm transition-all duration-500
              "
              onLoad={(e) => e.target.classList.remove("blur-sm")}
            />
          </motion.picture>
        </AnimatePresence>
      </div>

      {/* --- Card Content --- */}
      <div className="p-6 flex flex-col flex-grow bg-secondary/60">
        {/* Header section: Icon, Title, and optional LinkedIn */}
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
            {item.icon}
            <h3 className="text-2xl font-bold text-text mb-1">{item.title}</h3>
            </div>

            {/* LinkedIn button (only if link exists) */}
            {item.linkedin && item.linkedin.trim() !== "" && (
            <a
                href={item.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-creamm hover:text-highlight transition-colors"
            >
                <Linkedin size={20} />
            </a>
            )}
        </div>

        {/* Description */}
        <p className="text-base text-accent flex-grow leading-relaxed font-mono">
            {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
