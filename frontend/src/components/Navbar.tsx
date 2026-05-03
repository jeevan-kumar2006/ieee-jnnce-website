import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = ['About', 'Events', 'Team', 'Projects', 'Join Us'];

export default function Navbar({ onAdminClick }: { onAdminClick: () => void }) {
  const [active, setActive] = useState('About');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { threshold: 0.3 });
    
    const ids = links.map(l => l === 'Join Us' ? 'Join-Us' : l);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <a href="#" className="text-xl font-bold tracking-tight text-gray-900">
          IEEE <span className="text-blue-500">JNNCE</span>
        </a>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <a key={link} href={`#${link === 'Join Us' ? 'Join-Us' : link}`}
                className="relative text-sm text-gray-600 hover:text-gray-900 transition-colors py-1">
                {link}
                {active === (link === 'Join Us' ? 'Join-Us' : link) && (
                  <motion.layoutId layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
                )}
              </a>
            ))}
          </div>
          <button onClick={onAdminClick} className="text-xs font-medium text-gray-500 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors pointer-events-auto">
            Admin
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
