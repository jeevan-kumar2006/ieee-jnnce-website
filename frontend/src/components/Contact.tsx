import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContact } from '../api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitContact(form);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="Contact" className="py-24 px-6 max-w-2xl mx-auto relative">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-16"
      >
        Get in Touch
      </motion.h2>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-3 rounded-xl text-sm font-medium z-10"
          >
            Message sent successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>
        <textarea
          placeholder="Your Message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Send Message"
          )}
        </motion.button>
      </form>
    </section>
  );
}
