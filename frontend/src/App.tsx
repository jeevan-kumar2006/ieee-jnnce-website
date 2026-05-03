import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Team from './components/Team';
import Projects from './components/Projects';
import JoinUs from './components/JoinUs';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import DotGridBackground from './components/DotGridBackground';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <main className="relative overflow-x-hidden min-h-screen">
      <DotGridBackground />
      
      <div className="relative z-10 content-layer">
        {!showAdmin ? (
          <>
            <Navbar onAdminClick={() => setShowAdmin(true)} />
            <Hero />
            <About />
            <Events />
            <Team />
            <Projects />
            <JoinUs />
            <Footer />
          </>
        ) : (
          <AdminPanel onBack={() => setShowAdmin(false)} />
        )}
      </div>
    </main>
  );
}
