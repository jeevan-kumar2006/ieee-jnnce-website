import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
          Innovate. Build. Lead.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          The official IEEE Student Branch at JNNCE. Empowering the next generation of technologists, builders, and leaders.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
          <a href="#Join-Us" className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20">
            Join Us
          </a>
          <a href="#Events" className="px-8 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 bg-white rounded-lg font-medium transition-colors">
            Explore Events
          </a>
        </motion.div>
      </div>
    </section>
  );
}
