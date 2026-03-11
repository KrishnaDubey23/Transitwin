"use client";

import { motion } from "framer-motion";

interface PlannerMapProps {
  source?: string;
  destination?: string;
}

export function PlannerMap({ source, destination }: PlannerMapProps) {
  return (
    <div className="relative h-full min-h-[400px] rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid background */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 33}
            x2="400"
            y2={i * 33}
            stroke="#E5E5E5"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 33}
            y1="0"
            x2={i * 33}
            y2="400"
            stroke="#E5E5E5"
            strokeWidth="0.5"
          />
        ))}
        {/* Route paths */}
        <motion.path
          d="M 50 320 Q 100 280 200 200 T 350 80"
          fill="none"
          stroke="#22C55E"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.path
          d="M 50 340 Q 150 220 200 180 T 350 100"
          fill="none"
          stroke="#E5E5E5"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.path
          d="M 50 360 Q 120 300 200 220 T 350 120"
          fill="none"
          stroke="#E5E5E5"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
        {/* Origin marker */}
        <circle cx="50" cy="340" r="10" fill="#22C55E" />
        <circle cx="50" cy="340" r="6" fill="white" />
        {/* Destination marker */}
        <circle cx="350" cy="100" r="10" fill="#111111" />
        <circle cx="350" cy="100" r="6" fill="white" />
      </svg>
      {source && destination && (
        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-[#E5E5E5] bg-white/95 px-4 py-2 text-sm text-[#111111]">
          {source} → {destination}
        </div>
      )}
    </div>
  );
}
