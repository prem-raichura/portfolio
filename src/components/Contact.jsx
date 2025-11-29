import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, BookOpen, GraduationCap } from "lucide-react";

// ❇️ Memoized data so icons & objects are not recreated every render
const contactLinks = [
  {
    title: "Email",
    value: "premraichura7@gmail.com",
    href: "mailto:premraichura7@gmail.com",
    icon: Mail,
    color: "text-highlight",
  },
  {
    title: "LinkedIn",
    value: "prem-raichura",
    href: "https://www.linkedin.com/in/prem-raichura",
    icon: Linkedin,
    color: "text-blue-400",
  },
  {
    title: "GitHub",
    value: "prem-raichura",
    href: "https://github.com/prem-raichura",
    icon: Github,
    color: "text-text",
  },
  {
    title: "ORCID",
    value: "0009-0000-4289-1276",
    href: "https://orcid.org/0009-0000-4289-1276",
    icon: BookOpen,
    color: "text-green-500",
  },
  {
    title: "Google Scholar",
    value: "Prem Raichura",
    href: "https://scholar.google.com/citations?user=-nfY-p8AAAAJ&hl=en&oi=ao",
    icon: GraduationCap,
    color: "text-yellow-500",
  },
];

const Contact = () => {
  const links = useMemo(() => contactLinks, []);

  return (
    <section id="contact" className="py-20 md:py-32">
      <motion.div
        className="container mx-auto max-w-6xl px-4 md:px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {/* Heading */}
        <motion.h2
          className="text-5xl font-bold mb-6 flex items-center justify-center gap-3 font-handwritten"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Let's Connect 🤝
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg text-accent mb-12 max-w-2xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.2 },
            },
          }}
        >
          Ready to discuss your next project?
          <br />
          My inbox is always open.
        </motion.p>

        {/* Contact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-6">
          {links.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${link.title}`}
              className="
                group p-4 bg-secondary/60 backdrop-blur-lg rounded-xl flex flex-col items-center 
                justify-center border border-white/10 transition-all duration-500 
                hover:border-highlight hover:shadow-[0_0_25px_rgba(230,0,122,0.3)] hover:bg-secondary/80 
                hover:-translate-y-1 hover:scale-[1.05]
              "
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 150,
                delay: i * 0.1,
              }}
            >
              {/* Icon */}
              <link.icon
                size={30}
                className={`${link.color} mb-2 transition-transform duration-500 group-hover:scale-110`}
              />

              {/* Title */}
              <p className="text-xl text-accent font-sans">{link.title}</p>

              {/* Value */}
              <p className="text-xl font-semibold text-text truncate w-full px-1">
                {link.value}
              </p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
