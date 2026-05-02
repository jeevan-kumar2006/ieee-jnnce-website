import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = ['About', 'Events', 'Team', 'Projects', 'Contact'];

export default function Navbar() {
  const [active, setActive] = useState('About');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    links.forEach((link) => {
      const el = document.getElementById(link);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 w-full z-50 bg-navy/60 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <a href="#" className="text-xl font-bold tracking-tight">
          IEEE <span className="text-blue-500">JNNCE</span>
        </a>
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="relative text-sm text-gray-400 hover:text-white transition-colors duration-300 py-1"
              onClick={() => setActive(link)}
            >
              {link}
              {active === link && (
                <motion.layoutId
                  layoutId="navbar-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
