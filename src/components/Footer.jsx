import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, BookOpen, Instagram, Twitter, Mail, GraduationCap } from 'lucide-react';

const socialLinks = [
  { icon: Mail, label: 'Email', href: "mailto:premraichura7@gmail.com" },
  { icon: Linkedin, label: 'LinkedIn', href: "https://www.linkedin.com/in/prem-raichura" },
  { icon: Github, label: 'GitHub', href: "https://github.com/prem-raichura" },
  { icon: BookOpen, label: 'ORCID', href: "https://orcid.org/0009-0000-4289-1276" },
  { icon: GraduationCap, label: 'Google Scholar', href: "https://scholar.google.com/citations?user=-nfY-p8AAAAJ&hl=en&oi=ao" },
  { icon: Instagram, label: 'Instagram', href: "https://www.instagram.com/_.prem___7/" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // --- ADDED: Visitor Count ---
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    fetch("https://hits.sh/premraichura.me.json")
      .then((res) => res.json())
      .then((data) => setVisitors(data.hits))
      .catch(() => setVisitors("Error"));
  }, []);
  // -----------------------------

  return (
    <footer className="py-10 bg-primary/80 border-t border-secondary/50 relative z-50">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

          {/* Copyright */}
          <p className="text-accent text-xm text-center sm:text-left">
            &copy; {currentYear} Prem Raichura. Crafted with passion and code.
          </p>

          {/* --- ADDED COUNTER DISPLAY --- */}
          <p className="text-accent text-sm">
            Visitors: {visitors !== null ? visitors : "..."}
          </p>
          {/* -------------------------------- */}

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-highlight transition-colors"
                aria-label={`Link to ${link.label}`}
                whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
