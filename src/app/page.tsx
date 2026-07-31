'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { ShaderBackground } from '@/components/animations/ShaderBackground';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Credentials } from '@/components/sections/Credentials';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';
import { AIChatWidget } from '@/components/ui/AIChatWidget';
import { SystemTelemetry } from '@/components/ui/SystemTelemetry';

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="relative min-h-screen">
      {/* Neo-Brutal Loading Screen */}
      <LoadingScreen />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#4F8EFF] z-[120] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* WebGL Shader Background */}
      <ShaderBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Credentials />

      {/* System Performance & Telemetry HUD */}
      <SystemTelemetry />

      <Contact />

      {/* Floating RUDY AI Assistant */}
      <AIChatWidget />

      {/* Footer */}
      <Footer />
    </main>
  );
}
