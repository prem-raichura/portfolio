import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
// import { Analytics } from "@vercel/analytics/react"
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PlexusBackground from './components/PlexusBackground';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
    {/* <Analytics /> */}
      <AnimatePresence>
        {loading && <Loader onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>
      {!loading && (
        <>
          <PlexusBackground />
          <Navbar />
          <main className="pt-20 md:pt-0">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;