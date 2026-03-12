"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function TrafficOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#111111]">Traffic overview</h2>
        <Link
          href="/dashboard/traffic"
          className="text-sm font-medium text-[#22C55E] hover:underline"
        >
          View full map →
        </Link>
      </div>
      <p className="text-sm text-[#6B6B6B] mb-4">
        Mini traffic map showing congestion level
      </p>
      <div className="relative h-48 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] overflow-hidden">
        {/* Simplified traffic map visualization */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 192"
          preserveAspectRatio="none"
        >
          {/* Grid */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 38}
              x2="400"
              y2={i * 38}
              stroke="#E5E5E5"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 44}
              y1="0"
              x2={i * 44}
              y2="192"
              stroke="#E5E5E5"
              strokeWidth="0.5"
            />
          ))}
          {/* Congestion zones - green (low), yellow (medium), red (high) */}
          <rect
            x="20"
            y="40"
            width="80"
            height="50"
            fill="#22C55E"
            fillOpacity="0.3"
            rx="4"
          />
          <rect
            x="120"
            y="80"
            width="100"
            height="60"
            fill="#EAB308"
            fillOpacity="0.35"
            rx="4"
          />
          <rect
            x="240"
            y="60"
            width="80"
            height="70"
            fill="#EF4444"
            fillOpacity="0.3"
            rx="4"
          />
          <rect
            x="340"
            y="100"
            width="50"
            height="50"
            fill="#22C55E"
            fillOpacity="0.3"
            rx="4"
          />
        </svg>
        {/* Legend */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <span className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
            Low
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Medium
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            High
          </span>
        </div>
      </div>
    </motion.div>
  );
}
