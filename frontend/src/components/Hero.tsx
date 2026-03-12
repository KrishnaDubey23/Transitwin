"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* 1. Background image - full cover */}
      <div className="absolute inset-0">
        <Image
          src="/background.jpeg"
          alt="Commuter city traffic background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. White transparent overlay - light touch for readability */}
      <div
        className="absolute inset-0 bg-white/20"
        aria-hidden
      />

      {/* 3. Hero content - centered vertically and horizontally, full viewport */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.15] text-[#111111] tracking-tight">
            Know the route before the road.
            <br />
            Travel smarter every day.
          </h1>
          <p className="inline-block mt-6 text-[#22C55E] text-sm font-medium">
            with TransitWin
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-2xl mx-auto mt-8 mb-12"
          >
            <p className="px-6 py-5 rounded-2xl bg-white/75 backdrop-blur-sm text-[#111111] text-lg leading-relaxed shadow-sm">
              TransitWin analyzes traffic, transport networks, and real-time
              mobility data to recommend the fastest and most sustainable routes
              for daily commuters.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/dashboard/planner"
              className="rounded-full bg-[#111111] px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#333333] shadow-sm"
            >
              Find Smart Route
            </Link>
            <Link
              href="/dashboard/traffic"
              className="rounded-full border-2 border-[#111111] bg-white/80 px-8 py-3.5 text-sm font-medium text-[#111111] transition-all hover:bg-[#111111] hover:text-white"
            >
              View Live Traffic
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
