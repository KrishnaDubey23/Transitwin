"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Car, Leaf } from "lucide-react";

const stats = [
  {
    icon: Zap,
    value: 40,
    suffix: "%",
    label: "faster route discovery",
  },
  {
    icon: Car,
    value: 30,
    suffix: "%",
    label: "congestion reduction",
  },
  {
    icon: Leaf,
    value: 20,
    suffix: "%",
    label: "emission savings",
  },
];

export function Impact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);

  useEffect(() => {
    if (!isInView) return;
    const durations = [1500, 1800, 1200];
    const targets = [40, 30, 20];
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newValues = targets.map((target, i) => {
        const progress = Math.min(elapsed / durations[i], 1);
        return Math.round(target * progress);
      });
      setAnimatedValues(newValues);
      if (elapsed < Math.max(...durations)) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="impact"
      className="py-24 px-6 bg-white border-t border-[#E5E5E5]"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-dm-serif)] text-3xl sm:text-4xl text-[#111111] text-center mb-16 tracking-tight"
        >
          Impact
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 * i, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] p-8 text-center shadow-sm"
            >
              <stat.icon className="h-12 w-12 text-[#111111] mx-auto mb-4" />
              <p className="font-[family-name:var(--font-dm-serif)] text-5xl font-normal text-[#111111] mb-2">
                {animatedValues[i]}
                {stat.suffix}
              </p>
              <p className="text-[#6B6B6B]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
