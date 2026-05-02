import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Team from './components/Team';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DotGridBackground from './components/DotGridBackground'; // Import here

export default function App() {
  return (
    <main className="relative overflow-x-hidden h-screen">
      {/* Background Layer */}
      <DotGridBackground />

      {/* Content Layer - z-10 ensures it sits above the dots */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Events />
        <Team />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
