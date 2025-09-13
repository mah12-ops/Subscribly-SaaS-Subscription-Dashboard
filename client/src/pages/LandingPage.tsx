// src/pages/LandingPage.tsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";

export default function LandingPage() {
  return (
    <div className="bg-dark min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
