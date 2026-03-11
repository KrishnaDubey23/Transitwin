"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Car, Train, Bus } from "lucide-react";

export function Demo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="demo"
      className="py-24 px-6 bg-[#FAFAFA] border-t border-[#E5E5E5]"
    >
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-[family-name:var(--font-dm-serif)] text-3xl sm:text-4xl text-[#111111] text-center mb-6 tracking-tight"
        >
          Demo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center text-[#6B6B6B] mb-12"
        >
          Interactive product preview
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-lg overflow-hidden"
        >
          <div className="mb-6">
            <p className="font-semibold text-[#111111] text-lg">
              Andheri → BKC
            </p>
          </div>

          {/* Animated route lines mockup */}
          <div className="relative h-64 bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 400 256"
              preserveAspectRatio="none"
            >
              {[1, 2, 3].map((i) => (
                <motion.path
                  key={i}
                  d={
                    i === 1
                      ? "M 20 200 Q 100 180 200 140 T 380 80"
                      : i === 2
                      ? "M 20 220 Q 120 160 200 120 T 380 100"
                      : "M 20 240 Q 80 200 200 160 T 380 120"
                  }
                  fill="none"
                  stroke={i === 2 ? "#22C55E" : "#E5E5E5"}
                  strokeWidth={i === 2 ? 3 : 2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.6 }}
                  animate={isInView ? { pathLength: 1, opacity: i === 2 ? 1 : 0.6 } : {}}
                  transition={{
                    pathLength: {
                      duration: 1.5,
                      delay: 0.3 + i * 0.2,
                    },
                  }}
                />
              ))}
            </svg>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-[#6B6B6B]">
              <Car className="h-5 w-5" />
              <span>Car → 25 min</span>
            </div>
            <div className="flex items-center gap-3 text-[#22C55E] font-medium">
              <Train className="h-5 w-5" />
              <span>Metro → 18 min (fastest)</span>
            </div>
            <div className="flex items-center gap-3 text-[#6B6B6B]">
              <Bus className="h-5 w-5" />
              <span>Bus → 22 min</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
