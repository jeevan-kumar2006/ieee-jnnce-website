export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-24 py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} IEEE JNNCE Student Branch. All rights reserved.
        </div>
        <div className="flex gap-6 text-gray-500">
          {['Instagram', 'LinkedIn', 'GitHub', 'Email'].map((link) => (
            <a key={link} href="#" className="hover:text-blue-500 transition-colors duration-300 text-sm pointer-events-auto">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
