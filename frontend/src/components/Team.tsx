import { motion } from 'framer-motion';

const team = [
  { name: "Dr. A B C", role: "Branch Counselor", color: "from-blue-500 to-cyan-500" },
  { name: "Jane Doe", role: "Chairperson", color: "from-purple-500 to-pink-500" },
  { name: "John Smith", role: "Vice Chair", color: "from-orange-500 to-yellow-500" },
  { name: "Alice Lee", role: "Secretary", color: "from-green-500 to-emerald-500" },
];

export default function Team() {
  return (
    <section id="Team" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-16"
      >
        The Core Team
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotateY: 5, rotateX: 5 }}
            className="group flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-900/50 transition-colors duration-300"
            style={{ perspective: 1000 }}
          >
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
              {member.name.charAt(0)}
            </div>
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{member.role}</p>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">in</a>
              <a href="#" className="hover:text-blue-400 transition-colors">GH</a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
