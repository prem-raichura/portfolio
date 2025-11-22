import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AchievementCard from './AchievementCard';
import AchievementModal from './AchievementModal';
import { Award, ShieldCheck, Brain } from 'lucide-react';

// --- DATA ---
const achievementsData = [
  {
    icon: <ShieldCheck size={24} />,
    title: "Secure Park Project Grant",
    description: "M. M. Patel Students Research Project Cell, KSV",
    images: [
      "/images/ach1_img1.jpg",
      "/images/ach1_img2.jpg",
      "/images/ach1_img3.jpg",
      "/images/ach1_img4.jpg",
      "/images/ach1_img5.jpg",
      "/images/ach1_img6.jpg",
    ],
    linkedin: "https://www.linkedin.com/posts/dhairya-darji-072428284_securepark-edgeai-iot-ugcPost-7395134624517140480-XXQC?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEWrPP0BvxFARbxi45Dn_ZZJyLeGNqN4OI4",
  },
  {
    icon: <Brain  size={24} />,
    title: "Research Paper Grant - TrafficEye",
    description: "M. M. Patel Students Research Project Cell, KSV",
    images: [
      "/images/ach2_img1.jpg",
      "/images/ach2_img2.jpg",
      "/images/ach2_img3.jpg",
    ],
    linkedin: "https://www.linkedin.com/posts/mmpsrpc_ksv-researchexcellence-studentachievement-activity-7363819147824103424-BWH3?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEWrPP0BvxFARbxi45Dn_ZZJyLeGNqN4OI4",
  },
];
// --- END DATA ---

const Achievements = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const openModal = (item) => {
    setSelectedAchievement(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAchievement(null);
  };

  return (
    <>
      <section id="achievements" className="py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Heading */}
          <motion.h2
            className="text-5xl font-bold text-center mb-14 flex items-center justify-center gap-3 font-handwritten z-[9999]"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Achievements 🏆
          </motion.h2>

          {/* --- Responsive Grid Layout --- */}
          <div
            className={`grid gap-5 justify-center ${
              achievementsData.length === 1
                ? "grid-cols-1"
                : achievementsData.length === 2
                ? "grid-cols-1 sm:grid-cols-2 justify-center"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {achievementsData.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <div className="w-full max-w-[420px] md:max-w-[480px] lg:max-w-[440px]">
                  <AchievementCard
                    index={i}
                    item={ach}
                    onClick={() => openModal(ach)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Modal --- */}
      <AnimatePresence>
        {showModal && (
            <AchievementModal
                item={selectedAchievement}
                allAchievements={achievementsData}
                onClose={closeModal}
            />
        )}
      </AnimatePresence>
    </>
  );
};

export default Achievements;
