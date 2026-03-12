"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-[#FAFAFA] border-t border-[#E5E5E5]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl text-[#111111] mb-6 tracking-tight">
          START YOUR SMART COMMUTE TODAY
        </h2>
        <Link
          href="#demo"
          className="inline-block rounded-full bg-[#111111] px-10 py-4 text-base font-medium text-white transition-all hover:bg-[#333333] shadow-lg hover:shadow-xl"
        >
          Try TransitWin
        </Link>
      </motion.div>
    </section>
  );
}
