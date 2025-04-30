import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CalEmbed from './components/CalEmbed';
import Footer from './components/Footer';
import { setupAnimations } from './utils/animations';

function App() {
  useEffect(() => {
    // Initialize animations
    const cleanup = setupAnimations();

    // Clean up animation listeners when component unmounts
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <CalEmbed />
      </main>
      <Footer />
    </div>
  );
}

export default App;
