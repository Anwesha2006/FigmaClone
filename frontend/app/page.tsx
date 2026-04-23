"use client";

import { LandingNavbar } from "@/src/components/landing/LandingNavbar";
import { Hero } from "@/src/components/landing/Hero";
import { Features } from "@/src/components/landing/Features";
import { Preview } from "@/src/components/landing/Preview";
import { Testimonials } from "@/src/components/landing/Testimonials";
import { Pricing } from "@/src/components/landing/Pricing";
import { Footer } from "@/src/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LandingNavbar />
      <Hero />
      <Features />
      <Preview />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
}
