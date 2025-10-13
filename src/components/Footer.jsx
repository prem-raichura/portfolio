import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, BookOpen, Instagram, Twitter, Mail } from 'lucide-react'; // Imported Mail icon

// Data for social icons
const socialLinks = [
  { 
    icon: Github, 
    label: 'GitHub', 
    href: "https://github.com/prem-raichura", 
  },
  { 
    icon: Linkedin, 
    label: 'LinkedIn', 
    href: "https://www.linkedin.com/in/prem-raichura", 
  },
  { 
    icon: Mail,
    label: 'Email', 
    href: "mailto:premraichura7@gmail.com",
  },
  { 
    icon: Instagram, 
    label: 'Instagram', 
    href: "https://www.instagram.com/_.prem___7/",
  },
  // { 
  //   icon: Twitter, 
  //   label: 'X (Twitter)', 
  //   href: "https://x.com/your-username",
  // },
  { 
    icon: BookOpen, 
    label: 'ORCID', 
    href: "https://orcid.org/0009-0000-4289-1276", 
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-primary border-t border-secondary/50">
      {/* Container is critical for alignment with Hero/About sections */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Copyright/Attribution Text */}
          <p className="text-accent text-xm text-center sm:text-left">
            &copy; {currentYear} Prem Raichura. Crafted with passion and code.
          </p>
          
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