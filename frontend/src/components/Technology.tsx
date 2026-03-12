"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techStack = {
  Frontend: ["React", "Next.js", "Tailwind", "Mapbox"],
  Backend: ["FastAPI", "Node.js", "REST APIs"],
  "AI Models": [
    "LSTM Traffic Prediction",
    "Crowd Density Model",
    "Route Optimization",
  ],
  "Data Sources": ["Maps APIs", "Transport APIs", "GPS Data"],
};

export function Technology() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="technology"
      className="py-24 px-6 bg-[#FAFAFA] border-t border-[#E5E5E5]"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-sans text-3xl sm:text-4xl text-[#111111] text-center mb-16 tracking-tight"
        >
          Technology
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Architecture Diagram Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl border border-[#E5E5E5] bg-white p-8 shadow-sm"
          >
            <h3 className="font-semibold text-[#111111] mb-6">
              System Architecture
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["User Input", "API Gateway", "AI Engine", "Maps API"].map(
                (node, i) => (
                  <div
                    key={node}
                    className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-4 text-center text-sm font-medium text-[#111111]"
                  >
                    {node}
                  </div>
                )
              )}
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
              <div className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
            </div>
          </motion.div>

          {/* Tech Stack List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            {Object.entries(techStack).map(([category, items], i) => (
              <div key={category}>
                <h4 className="font-semibold text-[#111111] mb-3">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-[#E5E5E5] bg-white px-3 py-1.5 text-sm text-[#6B6B6B]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
