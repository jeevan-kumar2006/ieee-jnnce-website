export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} IEEE JNNCE Student Branch. All rights reserved.
        </div>
        <div className="flex gap-6 text-gray-500">
          {['Instagram', 'LinkedIn', 'GitHub', 'Email'].map((link) => (
            <a 
              key={link} 
              href="#" 
              className="hover:text-blue-400 transition-colors duration-300 text-sm"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
