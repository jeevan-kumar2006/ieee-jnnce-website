import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Event } from '../types';
import { fetchEvents } from '../api';

function Skeleton() { return <div className="bg-gray-100 rounded-2xl h-48 animate-pulse" />; }

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { fetchEvents().then(d => { setEvents(d); setLoading(false); }); }, []);

  return (
    <section id="Events" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-center mb-16 text-gray-900">Upcoming Events</motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {loading ? Array(3).fill(<Skeleton />) : events.map((event, i) => (
          <motion.div key={event.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.1)' }}
            className="p-6 bg-white border border-gray-100 rounded-2xl transition-shadow duration-300 flex flex-col justify-between shadow-sm pointer-events-auto">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">{event.tag}</span>
                <span className="text-xs text-gray-400">{event.date}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{event.title}</h3>
              <p className="text-gray-500 text-sm">{event.desc}</p>
            </div>
            <div className="mt-6 flex gap-3">
              <span className="text-sm text-blue-500 font-medium cursor-pointer hover:translate-x-1 transition-transform inline-block pointer-events-auto">Learn More →</span>
              {event.brochure && <a href={`http://127.0.0.1:5000${event.brochure}`} target="_blank" rel="noreferrer" className="text-sm text-gray-500 font-medium hover:text-blue-500 pointer-events-auto">Brochure ↗</a>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
