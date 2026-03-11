"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, TrafficCone, Zap, Globe } from "lucide-react";

const visionItems = [
  {
    icon: Brain,
    title: "AI Mobility Intelligence",
    description: "Predictive models for seamless urban travel.",
  },
  {
    icon: TrafficCone,
    title: "Smart Traffic Signal Systems",
    description: "IoT-connected signals for adaptive flow.",
  },
  {
    icon: Zap,
    title: "EV Charging Integration",
    description: "Plan routes with charging stops for EVs.",
  },
  {
    icon: Globe,
    title: "Global Smart City Network",
    description: "Scale to cities worldwide.",
  },
];

export function Vision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="vision"
      className="py-24 px-6 bg-white border-t border-[#E5E5E5]"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-dm-serif)] text-3xl sm:text-4xl text-[#111111] text-center mb-6 tracking-tight"
        >
          Vision
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center text-[#6B6B6B] mb-16"
        >
          Long-term roadmap for smarter mobility
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-6 shadow-sm"
            >
              <item.icon className="h-8 w-8 text-[#111111] mb-4" />
              <h3 className="font-semibold text-[#111111] mb-2">{item.title}</h3>
              <p className="text-sm text-[#6B6B6B]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
