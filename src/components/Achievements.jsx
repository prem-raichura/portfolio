// Achievements.jsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AchievementCard from "./AchievementCard";
import AchievementModal from "./AchievementModal";
import { ShieldCheck, Brain } from "lucide-react";

/**
 * Main Achievements container
 * - uses stable icon elements in the data (not recreated each render)
 * - memoized card components handle internal behavior
 * - accessibility + headings preserved
 */

const achievementsData = [
  {
    icon: <ShieldCheck size={24} />,
    title: "Secure Park Project Grant",
    description: "M. M. Patel Students Research Project Cell, KSV",
    images: [
      "/images/ach1_img1.webp",
      "/images/ach1_img2.webp",
      "/images/ach1_img3.webp",
      "/images/ach1_img4.webp",
      "/images/ach1_img5.webp",
      "/images/ach1_img6.webp",
    ],
    linkedin:
      "https://www.linkedin.com/posts/dhairya-darji-072428284_securepark-edgeai-iot-ugcPost-7395134624517140480-XXQC?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEWrPP0BvxFARbxi45Dn_ZZJyLeGNqN4OI4",
  },
  {
    icon: <Brain size={24} />,
    title: "Research Paper Grant - TrafficEye",
    description: "M. M. Patel Students Research Project Cell, KSV",
    images: ["/images/ach2_img1.webp", "/images/ach2_img2.webp", "/images/ach2_img3.webp"],
    linkedin:
      "https://www.linkedin.com/posts/mmpsrpc_ksv-researchexcellence-studentachievement-activity-7363819147824103424-BWH3?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEWrPP0BvxFARbxi45Dn_ZZJyLeGNqN4OI4",
  },
];

const Achievements = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const openModal = (item) => {
    setSelectedAchievement(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // small timeout to allow modal exit animation to finish if needed
    setTimeout(() => setSelectedAchievement(null), 300);
  };

  // keep stable reference for modal list
  const allAchievements = useMemo(() => achievementsData, []);

  return (
    <>
      <section id="achievements" className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.h2
            className="text-5xl font-bold text-center mb-14 flex items-center justify-center gap-3 font-handwritten z-[9999]"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Achievements 🏆
          </motion.h2>

          <div
            className={`grid gap-5 justify-center ${
              allAchievements.length === 1
                ? "grid-cols-1"
                : allAchievements.length === 2
                ? "grid-cols-1 sm:grid-cols-2 justify-center"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {allAchievements.map((ach, i) => (
              <motion.div
                key={ach.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="w-full max-w-[420px] md:max-w-[480px] lg:max-w-[440px]">
                  <AchievementCard index={i} item={ach} onClick={openModal} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showModal && selectedAchievement && (
          <AchievementModal
            item={selectedAchievement}
            allAchievements={allAchievements}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Achievements;
