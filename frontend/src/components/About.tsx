import { motion } from 'framer-motion';
const cards = [{ title: "Learn", icon: "📚" }, { title: "Build", icon: "🛠️" }, { title: "Network", icon: "🌐" }];

export default function About() {
  return (
    <section id="About" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold mb-6 text-gray-900">More than just a club.</h2>
          <p className="text-gray-600 leading-relaxed mb-4">At IEEE JNNCE, we bridge the gap between academic curriculum and industry standards. We foster an environment where students can collaborate on real-world projects.</p>
          <p className="text-gray-600 leading-relaxed">Whether you are a seasoned coder or just starting, our community provides the resources and mentorship you need to succeed.</p>
        </motion.div>
        <div className="relative h-72 flex items-center justify-center">
          {cards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }} viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="absolute w-56 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-default"
              style={{ left: `${50 + (i - 1) * 30}%`, top: `${50 + (i - 1) * 15}%`, transform: 'translate(-50%, -50%)', zIndex: i + 1 }}>
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
