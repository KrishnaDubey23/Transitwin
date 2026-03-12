"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Route,
  Train,
  Map,
  Building2,
} from "lucide-react";

const features = [
  {
    icon: Route,
    title: "Smart Route Optimization",
    description: "Get the fastest route considering real-time traffic and transport schedules.",
  },
  {
    icon: Train,
    title: "Multi Transport Integration",
    description: "Seamlessly combine metro, bus, cab, and walking for optimal journeys.",
  },
  {
    icon: Map,
    title: "Real-Time Traffic Visualization",
    description: "Live congestion maps help you make informed commuting decisions.",
  },
  {
    icon: Building2,
    title: "Smart City Mobility Insights",
    description: "Urban planning data for smarter, more connected cities.",
  },
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="features"
      className="py-24 px-6 bg-[#FAFAFA] border-t border-[#E5E5E5]"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-dm-serif)] text-3xl sm:text-4xl text-[#111111] text-center mb-6 tracking-tight"
        >
          Features
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-8 w-8 text-[#111111] mb-4" />
              <h3 className="font-semibold text-[#111111] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
