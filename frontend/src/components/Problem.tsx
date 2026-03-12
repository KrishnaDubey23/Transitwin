"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

export function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="problem"
      className="py-24 px-6 bg-white border-t border-[#E5E5E5]"
    >
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-sans text-3xl sm:text-4xl text-[#111111] text-center mb-6 tracking-tight"
        >
          COMMUTING SHOULD NOT
          <br />
          WASTE YOUR TIME.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-[#6B6B6B] max-w-2xl mx-auto mb-16"
        >
          Traffic congestion, inefficient routes, and disconnected transport
          systems turn every commute into a stressful experience. We built
          TransitWin to change that.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-[#E5E5E5] bg-white p-8 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <X className="h-6 w-6 text-[#6B6B6B]" />
              <h3 className="font-semibold text-[#111111]">
                Before TransitWin
              </h3>
            </div>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>• Traffic delays</li>
              <li>• Confusing routes</li>
              <li>• Lost commute time</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-[#E5E5E5] bg-white p-8 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <Check className="h-6 w-6 text-[#22C55E]" />
              <h3 className="font-semibold text-[#111111]">
                With TransitWin
              </h3>
            </div>
            <ul className="space-y-3 text-[#6B6B6B]">
              <li>• Optimized routes</li>
              <li>• Faster travel</li>
              <li>• Lower emissions</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
