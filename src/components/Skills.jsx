import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code, Server, Database, Cloud, BrainCircuit, PenTool } from 'lucide-react';

// Skills data analyzed from your profiles
const skillsData = [
  {
    icon: <Code size={32} className="text-highlight" />,
    title: "Languages",
    skills: ["Python", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    icon: <Server size={32} className="text-highlight" />,
    title: "Backend",
    skills: ["Php", "Laravel", "Django", "Flask", "RESTful APIs"],
  },
  {
    icon: <BrainCircuit size={32} className="text-highlight" />,
    title: "AI & Machine Learning",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "OpenCv"],
  },
  {
    icon: <Database size={32} className="text-highlight" />,
    title: "Databases",
    skills: ["MongoDB", "MySQL", "Firebase"],
  },
  {
    icon: <Cloud size={32} className="text-highlight" />,
    title: "DevOps & Cloud",
    skills: ["Git", "GitHub Actions (CI/CD)", "Vercel"],
  },
  {
    icon: <Code size={32} className="text-highlight" />,
    title: "Frontend",
    skills: ["React.js", "Framer Motion", "Tailwind CSS"],
  },
];

// Reusable SkillCard component with the new design
const SkillCard = ({ category, index }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, rgba(0, 229, 255, 0.1), transparent 80%)`;

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      key={index}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative bg-secondary/60 backdrop-blur-xl rounded-xl p-8 border border-white/10 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-highlight/20 overflow-hidden"
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } } }}
      whileHover={{ y: -8 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="flex items-center gap-4 mb-6">
        <div className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
          {category.icon}
        </div>
        <h3 className="text-2xl font-bold text-text relative">
          {category.title}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-full"></span>
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map(skill => (
          <div key={skill} className="bg-primary/70 text-creamm px-3 py-1 rounded-full text-sm">
            {skill}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-32 bg-background">
      <motion.div
        className="container mx-auto max-w-6xl px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.h2 
          className="text-4xl font-bold text-center mb-16"
          variants={{ hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
        >
          My Technical Toolkit
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, i) => (
            <SkillCard key={i} category={category} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;