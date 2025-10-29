import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, BookOpen, GraduationCap } from 'lucide-react'; // Imported GraduationCap

// Structured data for contact links, using verified profiles
const contactLinks = [
  { 
    title: "Email", 
    value: "premraichura7@gmail.com", 
    href: "mailto:premraichura7@gmail.com", 
    icon: Mail, 
    color: "text-highlight" 
  },
  { 
    title: "LinkedIn", 
    value: "prem-raichura", 
    href: "https://www.linkedin.com/in/prem-raichura", 
    icon: Linkedin, 
    color: "text-blue-400" 
  },
  { 
    title: "GitHub", 
    value: "prem-raichura", 
    href: "https://github.com/prem-raichura", 
    icon: Github, 
    color: "text-text" 
  },
  { 
    title: "ORCID", 
    value: "0009-0000-4289-1276", 
    href: "https://orcid.org/0009-0000-4289-1276", 
    icon: BookOpen, 
    color: "text-green-500" 
  },
  { 
    title: "Google Scholar", 
    value: "Prem Raichura",
    href: "https://scholar.google.com/citations?user=-nfY-p8AAAAJ&hl=en&oi=ao", 
    icon: GraduationCap, 
    color: "text-yellow-500" 
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <motion.div 
        className="container mx-auto max-w-6xl px-4 md:px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.h2 
          className="text-5xl font-bold mb-6 flex items-center justify-center gap-3 font-handwritten"
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
        >
          Let's Connect 🤝
        </motion.h2>
        <motion.p 
          className="text-lg text-accent mb-12 max-w-2xl mx-auto"
          variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2 } } }}
        >
          Ready to discuss your next project? <br /> Let's collaborate—my inbox is always open.
        </motion.p>

        {/* Grid for Contact Links - Now handles 5 items gracefully */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-6">
          {contactLinks.map((link, i) => (
            <motion.a 
              key={i}
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-secondary/60 backdrop-blur-lg rounded-xl flex flex-col items-center justify-center border border-white/10 transition-all duration-300 hover:border-highlight hover:shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 150, delay: i * 0.1 }}
            >
              <link.icon size={28} className={`${link.color} mb-2`} /> 
              <p className="text-sm text-accent font-sans">{link.title}</p>
              <p className="text-xl font-semibold text-text truncate w-full px-1">{link.value}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;