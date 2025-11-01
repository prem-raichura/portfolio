import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, BookOpen, Code2 } from "lucide-react";

// ------------------ COMBINED DATA ------------------
const timelineData = [
  {
    type: "publication",
    title: "TrafficEye: Intelligent Traffic Optimization Using Deep Learning Approach",
    description: `Published in IEEE 2025 International Conference on Artificial Intelligence and Machine Vision (AIMV).\nAuthors: Prem Raichura, Charmi Padh, Rohan Thakar, Zalak Vachhani, Himani Trivedi.`,
    tags: ["YOLO", "Deep Learning", "Vehicle Detection"],
    githubLink: null,
    liveLink: "https://doi.org/10.1109/AIMV66517.2025.11203522",
  },
  {
    type: "project",
    title: "Traffic density & detection",
    description:
      "An AI-powered web application that uses the YOLOv5su model trained on the IITMhetra dataset to detect and analyze vehicles in uploaded images or videos — built for accurate, real-time-capable traffic monitoring.",
    tags: ["FastAPI", "React", "Vite","YOLOv5","Traffic Analysis", "Vehicle Detection", "AI/ML"],
    githubLink: "https://github.com/prem-raichura/Vehicle-Dencity-and-Detection-App",
    liveLink: "https://vehicle-dencity-and-detection-app.vercel.app/",
  },
  {
    type: "project",
    title: "TrafficEye",
    description:
      "Custom-trained YOLOv5, YOLOv7, YOLOv4, and YOLOv8 models on the IITMHETRA dataset for real-time vehicle detection and traffic density analysis.",
    tags: ["YOLO", "AI/ML", "Deep Learning", "OpenCV"],
    githubLink: "https://github.com/prem-raichura/TrafficEye",
    liveLink: null,
  },
  {
    type: "project",
    title: "Prompt-Injection-Prevention",
    description:
      "A hybrid AI tool that detects unsafe prompts using rules and a machine learning model to prevent misuse of LLMs.",
    tags: ["AI Safety", "Machine Learning", "Prompt Filtering"],
    githubLink: "https://github.com/prem-raichura/Prompt-Injection-Prevention",
    liveLink: null,
  },
  {
    type: "project",
    title: "WealthEquity Website",
    description:
      "Official website for WealthEquity, a financial education and equity research platform, featuring responsive design, smooth animations, and modern glassmorphism UI built with React, Vite, and Tailwind CSS.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Vercel"],
    githubLink: null,
    liveLink: "https://wealthequity-website.vercel.app/",
  },
  {
    type: "project",
    title: "Bolton Real Estate Website",
    description:
      "A fully responsive real estate website showcasing property listings, detailed property pages, and contact functionality, built for a seamless user experience with modern web design principles.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "php"],
    githubLink: null,
    liveLink: "https://boltonrealestate.co.uk/",
  }


];

// ------------------ TIMELINE ITEM ------------------
const TimelineItem = ({ item, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const isLeft = index % 2 === 0;

  const cardVariants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={ref}
      className={`flex items-center w-full my-16 ${
        isLeft ? "justify-start" : "justify-end"
      }`}
    >
      <div className={`w-full md:w-10/12 ${isLeft ? "pr-8" : "pl-8"}`}>
        <motion.div
          className="p-6 mx-6 my-1 bg-secondary/60 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg"
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-text flex items-center gap-2">
              {item.type === "publication" && (
                <BookOpen size={20} className="text-blue-400" />
              )}
              {item.type === "project" && (
                <Code2 size={20} className="text-green-400" />
              )}
              {item.title}
            </h3>
            <div className="flex items-center gap-4 text-accent flex-shrink-0 ml-4">
              {item.githubLink && (
                <a
                  href={item.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-highlight transition-colors"
                >
                  <Github size={20} />
                </a>
              )}
              {item.liveLink && (
                <a
                  href={item.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-highlight transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="text-accent mb-6 font-mono" style={{ whiteSpace: "pre-line" }}>
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <div
                key={tag}
                className="bg-primary/70 text-creamm px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ------------------ MAIN COMPONENT ------------------
const projects = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 flex items-center justify-center gap-3 font-handwritten"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Projects & Research 🚀
        </motion.h2>

        <div className="relative">
          {/* Two vertical timeline lines */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1.5 bg-secondary rounded-full origin-top hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute top-0 right-0 h-full w-1.5 bg-secondary rounded-full origin-top hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          />

          <div className="relative">
            {timelineData.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default projects;
