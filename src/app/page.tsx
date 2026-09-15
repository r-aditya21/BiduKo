"use client";
import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import MobileMenu from "@/components/MobileMenu";
import CursorDot from "@/components/CursorDot";
import ScrollObserver from "@/components/ScrollObserver";
import Footer from "@/components/Footer";

import Hero from "@/sections/Hero";
import Marquee from "@/sections/Marquee";
import SelectedWork from "@/sections/SelectedWork";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Process from "@/sections/Process";
import WhyBiduKo from "@/sections/WhyBiduKo";
import CtaSection from "@/sections/CtaSection";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <CursorDot />
      <ScrollObserver />
      <Navbar onMenuToggle={handleMenuToggle} menuOpen={menuOpen} />
      <MobileMenu open={menuOpen} onClose={handleMenuClose} />

      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <SelectedWork />
        <About />
        <Process />
        <WhyBiduKo />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
