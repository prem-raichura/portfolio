// AchievementModal.jsx
import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

/**
 * Fully optimized modal:
 * - The modal container is memoized
 * - The image slider inside uses its own interval and only re-renders the <picture>
 * - Navigation buttons prevent unintended reflows
 * - All animations preserved
 */

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

const AchievementModal = React.memo(({ item, onClose, allAchievements = [] }) => {
  if (!item) return null;

  const initialIndex = useMemo(
    () => Math.max(0, allAchievements.findIndex((ach) => ach.title === item.title)),
    [allAchievements, item]
  );

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const currentItem = allAchievements[currentIndex] || item;
  const images = Array.isArray(currentItem.images) ? currentItem.images : [];

  useEffect(() => {
    setCurrentSlide(0);
  }, [currentIndex]);

  // slider interval for modal — single interval, cleared appropriately
  useEffect(() => {
    if (!images || images.length <= 1) return;
    // clear existing interval first
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [images]);

  const handleNext = useCallback(
    (e) => {
      e.stopPropagation();
      if (currentIndex < allAchievements.length - 1) {
        setDirection(1);
        setCurrentIndex((p) => p + 1);
        setCurrentSlide(0);
      }
    },
    [currentIndex, allAchievements.length]
  );

  const handlePrev = useCallback(
    (e) => {
      e.stopPropagation();
      if (currentIndex > 0) {
        setDirection(-1);
        setCurrentIndex((p) => p - 1);
        setCurrentSlide(0);
      }
    },
    [currentIndex]
  );

  // close on ESC
  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === "Escape") onClose();
      if (ev.key === "ArrowRight") handleNext(ev);
      if (ev.key === "ArrowLeft") handlePrev(ev);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        // onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${currentItem.title} details`}
      >
        <motion.div
          key={currentItem.title}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-b from-secondary/80 to-primary/80 rounded-2xl p-6 max-w-3xl w-full max-h-[85vh] overflow-y-auto scrollbar-custom relative border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-accent hover:text-highlight transition z-20"
            aria-label="Close modal"
          >
            <X size={26} />
          </motion.button>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              {currentItem.icon ? React.cloneElement(currentItem.icon, { size: 28 }) : null}
              <h2 className="text-2xl md:text-3xl font-bold text-text drop-shadow-sm">
                {currentItem.title}
              </h2>
            </div>

            {/* Image slider */}
            <div className="relative w-full h-72 md:h-[22rem] rounded-xl mb-4 overflow-hidden border border-white/10 bg-transparent flex items-center justify-center shadow-inner">
              <AnimatePresence mode="wait">
                {images && images.length > 0 && (
                  <motion.picture
                    key={images[currentSlide] || `blank-${currentSlide}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <source
                      srcSet={(images[currentSlide] || "").replace(/\.jpe?g|\.png$/i, ".webp")}
                      type="image/webp"
                    />
                    <img
                      src={images[currentSlide]}
                      alt={currentItem.title}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain blur-md transition-all duration-500"
                      onLoad={(e) => e.currentTarget.classList.remove("blur-md")}
                    />
                  </motion.picture>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 rounded-xl p-4 bg-gradient-to-r from-primary/30 via-secondary/40 to-primary/30 border border-white/10 shadow-inner overflow-hidden">
                <p className="text-accent font-mono leading-relaxed text-base">{currentItem.description}</p>
              </div>

              {currentItem.linkedin && currentItem.linkedin.trim() !== "" && (
                <a
                  href={currentItem.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-highlight border border-highlight/30 hover:bg-highlight/10 transition-all duration-300 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Open LinkedIn"
                >
                  <Linkedin size={18} strokeWidth={2} />
                  View on LinkedIn
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* nav buttons (kept outside modal to avoid reflow) */}
        {allAchievements.length > 1 && (
          <>
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/40 hover:bg-primary/60 backdrop-blur-md text-highlight p-3 rounded-full border border-white/20 shadow-lg transition z-[60]"
                aria-label="Previous achievement"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {currentIndex < allAchievements.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/40 hover:bg-primary/60 backdrop-blur-md text-highlight p-3 rounded-full border border-white/20 shadow-lg transition z-[60]"
                aria-label="Next achievement"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

export default AchievementModal;
