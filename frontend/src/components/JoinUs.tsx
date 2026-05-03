import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitApplication } from '../api';

export default function JoinUs() {
  const [form, setForm] = useState({ name: '', email: '', dept: '', year: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error
    
    try {
      await submitApplication(form);
      setSuccess(true);
      setForm({ name: '', email: '', dept: '', year: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to submit. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Join-Us" className="py-24 px-6 max-w-2xl mx-auto relative">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-4 text-gray-900">Join Our Community</motion.h2>
      <p className="text-center text-gray-500 mb-12">Fill out the form below to apply for membership.</p>

      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="absolute top-28 left-1/2 -translate-x-1/2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-xl text-sm font-medium z-10 shadow-sm">
            Application submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm pointer-events-auto">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <div className="grid md:grid-cols-2 gap-6">
          <input type="text" placeholder="Full Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
          <input type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <select required value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="" disabled selected>Department</option>
            <option>CSE</option><option>ISE</option><option>ECE</option><option>EEE</option><option>Mech</option><option>Civil</option>
          </select>
          <select required value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="" disabled selected>Year</option>
            <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
          </select>
        </div>
        <textarea placeholder="Why do you want to join IEEE?" required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-70 flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20">
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Submit Application"}
        </motion.button>
      </form>
    </section>
  );
}
