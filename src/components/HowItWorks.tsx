"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  Database,
  Brain,
  Settings,
  Compass,
} from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Enter your route",
    description: "Input origin and destination",
  },
  {
    icon: Database,
    title: "Collect traffic data",
    description: "Aggregate real-time mobility feeds",
  },
  {
    icon: Brain,
    title: "AI predicts congestion",
    description: "LSTM models forecast traffic",
  },
  {
    icon: Settings,
    title: "Route optimization engine",
    description: "Multi-criteria optimization",
  },
  {
    icon: Compass,
    title: "Best route recommendation",
    description: "Get your smart commute",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="py-24 px-6 bg-white border-t border-[#E5E5E5]"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-dm-serif)] text-3xl sm:text-4xl text-[#111111] text-center mb-16 tracking-tight"
        >
          How It Works
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 overflow-x-auto pb-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="flex flex-col items-center text-center min-w-[180px]"
            >
              <div className="rounded-full border-2 border-[#E5E5E5] bg-white w-14 h-14 flex items-center justify-center mb-4 shrink-0">
                <step.icon className="h-6 w-6 text-[#111111]" />
              </div>
              <p className="text-xs font-medium text-[#6B6B6B] mb-1">
                Step {i + 1}
              </p>
              <h3 className="font-semibold text-[#111111] mb-2">{step.title}</h3>
              <p className="text-sm text-[#6B6B6B]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
