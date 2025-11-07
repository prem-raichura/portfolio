import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { title: "About", href: "#about" },
  { title: "Skills", href: "#skills" },
  { title: "Projects", href: "#projects" },
  { title: "Achievements", href: "#achievements" },
  { title: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };
  
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 + 0.3, ease: "easeOut" },
    }),
  };

  return (
    <>
      <motion.div
        className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="container mx-auto max-w-6xl bg-primary/60 backdrop-blur-lg rounded-xl flex justify-between items-center p-4 border border-white/10">
          
          <a href="#home" className="relative inline-block">
            <span className="text-4xl font-bold text-text font-handwritten">
              Prem Raichura
            </span>
            <svg
              className="absolute left-0 w-full h-4 -bottom-2"
              viewBox="0 0 210 25"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M 5 20 C 60 10, 150 10, 205 20"
                className="stroke-text"
                strokeWidth="4"
                fill="none"
                strokeLinecap="square"
                strokeDasharray="2 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
              />
            </svg>
          </a>
          
          <div className="hidden md:flex items-center space-x-8 text-accent">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-highlight transition-colors relative group font-handwritten text-2xl">
                {link.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-text focus:outline-none">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <button onClick={toggleMenu} className="absolute top-6 right-6 text-text focus:outline-none">
              <X size={32} />
            </button>
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-4xl text-accent hover:text-highlight transition-colors font-handwritten"
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {link.title}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;