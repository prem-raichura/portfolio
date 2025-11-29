// AchievementCard.jsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin } from "lucide-react";

/**
 * Full-optimized AchievementCard
 * - memo-friendly (do not recreate JSX in data)
 * - efficient slider using a single interval per card
 * - lazy loads images with WebP-first <picture>
 * - retains all animations exactly
 */

const slideVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const AchievementCard = React.memo(({ item, index, onClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);

  // Pre-calc images safely (fallback to empty array)
  const images = Array.isArray(item.images) ? item.images : [];

  // Start auto-slider only if more than 1 image
  useEffect(() => {
    isMountedRef.current = true;
    if (!images || images.length <= 1) return;

    // Slightly stagger intervals so many cards don't slide at once
    const base = 4000;
    const stagger = Math.min(800, index * 120);
    intervalRef.current = setInterval(() => {
      // safe update avoiding stale closures
      setCurrentSlide((prev) => (prev >= images.length - 1 ? 0 : prev + 1));
    }, base + stagger);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      isMountedRef.current = false;
    };
  }, [images, index]);

  // Reset slide to 0 when item changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [item]);

  // click handler wrapped
  const handleClick = useCallback(
    (e) => {
      if (typeof onClick === "function") onClick(item);
    },
    [onClick, item]
  );

  const currentImage = images.length ? images[currentSlide] : null;

  return (
    <motion.div
      className="bg-transparent backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 ring-1 ring-inset ring-white/10 h-full flex flex-col cursor-pointer hover:shadow-xl hover:shadow-black/40 transition-all"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      onClick={handleClick}
      role="button"
      aria-label={`Open achievement ${item.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <div className="relative w-full h-72 md:h-80 lg:h-80 bg-transparent flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentImage && (
            <motion.picture
              key={currentImage + currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex items-center justify-center w-full h-full"
            >
              {/* WebP first (if present) */}
              <source
                srcSet={currentImage.replace(/\.jpe?g|\.png$/i, ".webp")}
                type="image/webp"
              />
              <img
                src={currentImage}
                alt={item.title || "achievement image"}
                loading="lazy"
                className="object-contain w-full h-full blur-sm transition-all duration-500"
                onLoad={(e) => e.currentTarget.classList.remove("blur-sm")}
                draggable={false}
              />
            </motion.picture>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-secondary/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            {/* item.icon should be a stable element from data (see Achievements.jsx) */}
            {item.icon ? React.cloneElement(item.icon, { size: 24 }) : null}
            <h3 className="text-2xl font-bold text-text mb-1">{item.title}</h3>
          </div>

          {item.linkedin && item.linkedin.trim() !== "" && (
            <a
              href={item.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-creamm hover:text-highlight transition-colors"
              aria-label={`Open LinkedIn for ${item.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>

        <p className="text-base text-accent flex-grow leading-relaxed font-mono">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
});

export default AchievementCard;
