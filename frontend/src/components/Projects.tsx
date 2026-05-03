import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const projects = [
  { title: "Smart Campus IoT", desc: "Deploying IoT sensors across campus for automated energy management and security alerts.", tech: "ESP32, MQTT, React" },
  { title: "AI Resume Builder", desc: "An LLM-powered tool that helps students tailor their resumes to specific job descriptions.", tech: "Python, OpenAI, Next.js" },
  { title: "Open Source CLI", desc: "A custom CLI tool built in Rust to automate standard IEEE chapter workflows.", tech: "Rust, GitHub Actions" },
];

export default function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section id="Projects" className="py-24 px-6 max-w-4xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16 text-gray-900">Initiatives</motion.h2>
      <div className="flex flex-col gap-4">
        {projects.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
            className="rounded-2xl p-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent hover:via-blue-500 transition-all duration-500 pointer-events-auto">
            <div className="bg-white rounded-2xl p-6 cursor-pointer" onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">{p.title}</h3>
                <motion.span animate={{ rotate: expanded === i ? 180 : 0 }} className="text-gray-400 text-2xl leading-none">↓</motion.span>
              </div>
              <AnimatePresence>
                {expanded === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="text-gray-500 mt-4 leading-relaxed">{p.desc}</p>
                    <div className="mt-4 flex gap-2">{p.tech.split(', ').map(t => <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{t}</span>)}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
