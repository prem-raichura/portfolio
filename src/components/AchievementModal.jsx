import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Linkedin} from "lucide-react";

const modalContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
    scale: 0.96,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: (direction) => ({
    x: direction > 0 ? -150 : 150,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

const AchievementModal = ({ item, onClose, allAchievements = [] }) => {
  if (!item) return null;

  const [currentIndex, setCurrentIndex] = useState(
    allAchievements.findIndex((ach) => ach.title === item.title)
  );
  const [direction, setDirection] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentItem = allAchievements[currentIndex] || item;

  // Auto image slider
  useEffect(() => {
    if (!currentItem.images || currentItem.images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === currentItem.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [currentItem]);

  // Navigation handlers
  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < allAchievements.length - 1) {
      setDirection(1);
      setCurrentSlide(0);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentSlide(0);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      {/* MODAL CONTENT */}
      <motion.div
        key={currentItem.title}
        custom={direction}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-gradient-to-b from-secondary/80 to-primary/80 rounded-2xl p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto scrollbar-custom relative border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
      >
        {/* CLOSE BUTTON */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-accent hover:text-highlight transition z-20"
        >
          <X size={26} />
        </motion.button>

        {/* INNER CONTENT */}
        <motion.div
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-5"
          >
            {currentItem.icon &&
              React.cloneElement(currentItem.icon, { size: 30 })}
            <h2 className="text-3xl font-bold text-text drop-shadow-sm">
              {currentItem.title}
            </h2>
          </motion.div>

          {/* IMAGE SLIDER */}
          <motion.div
            variants={itemVariants}
            className="relative w-full h-80 md:h-[22rem] rounded-xl mb-6 overflow-hidden border border-white/10 bg-transparent flex items-center justify-center shadow-inner"
          >
            <AnimatePresence mode="wait">
              <motion.picture
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex items-center justify-center w-full h-full"
              >
                {/* WebP first */}
                <source
                  srcSet={currentItem.images[currentSlide].replace(".jpg", ".webp")}
                  type="image/webp"
                />

                {/* JPG fallback */}
                <img
                  src={currentItem.images[currentSlide]}
                  alt={currentItem.title}
                  loading="lazy"
                  className="
                    max-w-full max-h-full object-contain 
                    blur-md transition-all duration-500
                  "
                  onLoad={(e) => e.target.classList.remove("blur-md")}
                />
              </motion.picture>
            </AnimatePresence>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div
            variants={itemVariants}
            className="relative flex flex-col md:flex-row items-center justify-between gap-4 w-full max-w-2xl mx-auto"
            >
            {/* DESCRIPTION BOX */}
            <div className="flex-1 rounded-xl p-6 bg-gradient-to-r from-primary/30 via-secondary/40 to-primary/30 border border-white/10 shadow-inner overflow-hidden flex items-center justify-center text-center">
                <p className="text-accent font-mono leading-relaxed text-base z-10">
                    {currentItem.description}
                </p>
            </div>

            {/* LINKEDIN BUTTON (conditionally rendered) */}
            {currentItem.linkedin && currentItem.linkedin.trim() !== "" && (
                <a
                href={currentItem.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-highlight border border-highlight/30 hover:bg-highlight/10 transition-all duration-300 shrink-0"
                >
                <Linkedin size={18} strokeWidth={2} />
                View on LinkedIn
                </a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* OUTSIDE NAV BUTTONS (NO MOVEMENT / NO HOVER SHIFT) */}
      {allAchievements.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/40 hover:bg-primary/60 backdrop-blur-md text-highlight p-3 rounded-full border border-white/20 shadow-lg transition z-[60]"
            >
              <ChevronLeft size={28} />
            </button>
          )}
          {currentIndex < allAchievements.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/40 hover:bg-primary/60 backdrop-blur-md text-highlight p-3 rounded-full border border-white/20 shadow-lg transition z-[60]"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </>
      )}
    </motion.div>
  );
};

export default AchievementModal;
