import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import {
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Cpu,
  Globe,
  Layout,
  X,
} from "lucide-react";

// ---------------- ICON MAP (stable, no re-render) ----------------
const ICONS = {
  research: <BookOpen size={20} className="text-blue-400" />,
  webapp: <Globe size={20} className="text-indigo-500" />,
  website: <Layout size={20} className="text-cyan-500" />,
  models: <Cpu size={20} className="text-yellow-400" />,
  project: <Code2 size={20} className="text-green-400" />,
};

// ---------------- TIMELINE DATA (static) ----------------
const timelineData = [
  {
    type: "research",
    title: "TrafficEye: Intelligent Traffic Optimization Using Deep Learning Approach",
    description: `Published in IEEE 2025 International Conference on Artificial Intelligence and Machine Vision (AIMV).\nAuthors: Prem Raichura, Charmi Padh, Rohan Thakar, Zalak Vachhani, Himani Trivedi.`,
    tags: ["YOLO", "Deep Learning", "Vehicle Detection"],
    githubLink: null,
    liveLink: "https://doi.org/10.1109/AIMV66517.2025.11203522",
  },
  {
    type: "webapp",
    title: "Traffic density & detection web app",
    description:
      "An AI-powered web application that uses the YOLOv5su model trained on the IITMhetra dataset to detect and analyze vehicles in uploaded images or videos — built for accurate, real-time-capable traffic monitoring.",
    tags: ["FastAPI", "React", "Vite", "YOLOv5", "Traffic Analysis", "Vehicle Detection", "AI/ML"],
    githubLink: "https://github.com/prem-raichura/Vehicle-Density-and-Detection-App",
    liveLink: "https://vehicle-density-and-detection-app.vercel.app/",
  },
  {
    type: "website",
    title: "WealthEquity Website",
    description:
      "Official website for WealthEquity, a financial education and equity research platform, featuring responsive design, smooth animations, and modern glassmorphism UI built with React, Vite, and Tailwind CSS.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Vercel"],
    githubLink: null,
    liveLink: "https://wealthequity-website.vercel.app/",
  },
  {
    type: "models",
    title: "TrafficEye models",
    description:
      "Custom-trained YOLOv5, YOLOv7, YOLOv4, and YOLOv8 models on the IITMHETRA dataset for real-time vehicle detection and traffic density analysis.",
    tags: ["YOLO", "AI/ML", "Deep Learning", "OpenCV"],
    githubLink: "https://github.com/prem-raichura/TrafficEye",
    liveLink: null,
  },
  {
    type: "models",
    title: "Prompt-Injection-Prevention",
    description:
      "A hybrid AI tool that detects unsafe prompts using rules and a machine learning model to prevent misuse of LLMs.",
    tags: ["AI Safety", "Machine Learning", "Prompt Filtering"],
    githubLink: "https://github.com/prem-raichura/Prompt-Injection-Prevention",
    liveLink: null,
  },
  {
    type: "website",
    title: "Bolton Real Estate Website",
    description:
      "A fully responsive real estate website showcasing property listings, detailed property pages, and contact functionality, built for a seamless user experience with modern web design principles.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Php"],
    githubLink: null,
    liveLink: "https://boltonrealestate.co.uk/",
  },
];

// ---------------- PROJECT CARD (MEMOIZED) ----------------
const ProjectCard = React.memo(({ item }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-secondary/70 border border-white/10 backdrop-blur-xl rounded-xl p-6 shadow-md hover:border-highlight/30 transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-text flex items-center gap-2">
          {ICONS[item.type]} {item.title}
        </h3>

        <div className="flex gap-3">
          {item.githubLink && (
            <a href={item.githubLink} target="_blank" rel="noopener noreferrer" aria-label="View GitHub">
              <Github size={20} className="text-accent hover:text-highlight" />
            </a>
          )}
          {item.liveLink && (
            <a href={item.liveLink} target="_blank" rel="noopener noreferrer" aria-label="Open live project">
              <ExternalLink size={20} className="text-accent hover:text-highlight" />
            </a>
          )}
        </div>
      </div>

      <p className="text-accent mb-6 font-mono whitespace-pre-line">{item.description}</p>

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="bg-primary/70 text-creamm px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

// ---------------- TIMELINE ITEM (MEMOIZED) ----------------
const TimelineItem = React.memo(({ item, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const isLeft = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div ref={ref} className={`flex items-center w-full my-16 ${isLeft ? "justify-start" : "justify-end"}`}>
      <div className={`w-full md:w-10/12 ${isLeft ? "pr-8" : "pl-8"}`}>
        <motion.div
          className="p-6 mx-6 my-1 bg-secondary/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg"
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-text flex items-center gap-2">
              {ICONS[item.type]} {item.title}
            </h3>

            <div className="flex items-center gap-4 text-accent flex-shrink-0 ml-4">
              {item.githubLink && (
                <a href={item.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github size={20} className="hover:text-highlight transition-colors" />
                </a>
              )}
              {item.liveLink && (
                <a href={item.liveLink} target="_blank" rel="noopener noreferrer" aria-label="Live Project">
                  <ExternalLink size={20} className="hover:text-highlight transition-colors" />
                </a>
              )}
            </div>
          </div>

          <p className="text-accent mb-6 font-mono whitespace-pre-line">{item.description}</p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="bg-primary/70 text-creamm px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
});

// ---------------- MAIN COMPONENT ----------------
const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    return filter === "all"
      ? timelineData
      : timelineData.filter((p) => p.type === filter);
  }, [filter]);

  const topFour = timelineData.slice(0, 4);

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">

        {/* Heading */}
        <motion.h2
          className="text-5xl font-bold text-center mb-16 flex items-center justify-center gap-3 font-handwritten"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Projects & Research 🚀
        </motion.h2>

        {/* TIMELINE */}
        <div className="relative">
          {/* Left Line */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1.5 bg-secondary rounded-full origin-top hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          />
          {/* Right Line */}
          <motion.div
            className="absolute top-0 right-0 h-full w-1.5 bg-secondary rounded-full origin-top hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          />

          {/* Timeline Items */}
          <div className="relative">
            {topFour.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-10">
          <motion.button
            onClick={() => setShowModal(true)}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            className="relative px-8 py-3 font-semibold rounded-xl overflow-hidden border border-highlight text-highlight transition-colors duration-300"
          >
            <div className="relative z-10 flex items-center justify-center">
              {/* Default */}
              <motion.span
                variants={{
                  rest: { y: 0, opacity: 1 },
                  hover: { y: -24, opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                Show More
              </motion.span>

              {/* Hover */}
              <motion.span
                variants={{
                  rest: { y: 24, opacity: 0 },
                  hover: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 right-0 text-white"
              >
                Show More
              </motion.span>
            </div>

            {/* Fill */}
            <motion.div
              variants={{
                rest: { y: "100%" },
                hover: { y: "0%" },
              }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 z-0 bg-gradient-to-r from-highlight to-accent"
            />

            {/* Glow */}
            <motion.div
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-0 rounded-xl bg-white/10 blur-[3px]"
            />
          </motion.button>
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-gradient-to-b from-secondary/80 to-primary/80 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto relative border border-white/10 shadow-2xl backdrop-blur-xl scrollbar-custom"
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-accent hover:text-highlight transition z-20"
                aria-label="Close modal"
              >
                <X size={26} />
              </motion.button>

              {/* Filter Buttons */}
              <div className="relative flex flex-wrap justify-center gap-3 mb-10 mt-4 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner">
                {["all", "research", "webapp", "website", "models"].map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    className={`relative px-5 py-2.5 text-lg rounded-full font-semibold transition-all duration-300 
                      ${filter === cat ? "text-white" : "text-accent hover:text-highlight"} 
                      after:content-[''] after:absolute after:left-1/2 after:bottom-[8px] after:h-[2px] after:w-[65%] 
                      after:-translate-x-1/2 after:bg-current after:rounded-full 
                      after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out 
                      hover:after:scale-x-100 ${filter === cat ? "after:scale-x-100" : ""}`}
                  >
                    {filter === cat && (
                      <motion.div
                        layoutId="bubble"
                        transition={{ type: "spring", stiffness: 300, damping: 26 }}
                        className="absolute inset-0 rounded-2xl bg-highlight/90 shadow-md"
                      />
                    )}
                    <span className="relative z-10">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Filtered Projects */}
              <motion.div
                layout
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pb-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((item) => (
                    <motion.div
                      key={item.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProjectCard item={item} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
