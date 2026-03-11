import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Technology } from "@/components/Technology";
import { Impact } from "@/components/Impact";
import { Demo } from "@/components/Demo";
import { Vision } from "@/components/Vision";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Technology />
        <Impact />
        <Demo />
        <Vision />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
}
