"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Route, Car, TreePine } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6 bg-white bg-grid-pattern overflow-hidden">
      {/* Faint city skyline */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#E5E5E5]/20 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="font-[family-name:var(--font-dm-serif)] text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.15] text-[#111111] tracking-tight">
            Commute smarter,
            <br />
            not harder.
          </h1>
          <h2 className="font-[family-name:var(--font-dm-serif)] text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.15] text-[#111111] tracking-tight mt-4">
            The calm side of
            <br />
            urban mobility.
          </h2>
          <p className="inline-block mt-6 text-[#22C55E] text-sm font-medium">
            with TransitWin
          </p>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-2xl mx-auto text-[#6B6B6B] text-lg leading-relaxed mb-12"
        >
          TransitWin analyzes traffic, transport networks, and real-time mobility
          data to recommend the fastest and most sustainable routes for daily
          commuters.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          <Link
            href="#demo"
            className="rounded-full bg-[#111111] px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#333333] shadow-sm"
          >
            Find Smart Route
          </Link>
          <Link
            href="#demo"
            className="rounded-full border border-[#E5E5E5] bg-white px-8 py-3.5 text-sm font-medium text-[#111111] transition-all hover:border-[#111111] hover:bg-[#FAFAFA]"
          >
            View Live Traffic
          </Link>
        </motion.div>

        {/* Supporting Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <SupportCard
            icon={<Car className="h-6 w-6" />}
            title="Live Traffic Visualization"
            description="Real-time congestion detection for smarter commuting decisions."
          />
          <SupportCard
            icon={<Route className="h-6 w-6" />}
            title="Multi Transport Routes"
            description="Combine metro, bus, and road travel into optimized routes."
          />
          <SupportCard
            icon={<TreePine className="h-6 w-6" />}
            title="Carbon Friendly Travel"
            description="Choose routes that reduce urban emissions and support sustainable mobility."
          />
        </motion.div>
      </div>
    </section>
  );
}

function SupportCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="text-[#111111] mb-3">{icon}</div>
      <h3 className="font-medium text-[#111111] mb-2">{title}</h3>
      <p className="text-sm text-[#6B6B6B] leading-relaxed">{description}</p>
    </motion.div>
  );
}
