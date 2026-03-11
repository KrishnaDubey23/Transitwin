"use client";

import { motion } from "framer-motion";
import type { Trip } from "./SavedTrips";

interface MapReplayProps {
  trip: Trip | null;
}

export function MapReplay({ trip }: MapReplayProps) {
  return (
    <motion.div
      layout
      className="rounded-xl border border-[#E5E5E5] bg-white overflow-hidden shadow-sm"
    >
      <div className="px-6 py-4 border-b border-[#E5E5E5]">
        <h2 className="font-semibold text-[#111111]">Map replay</h2>
        <p className="text-xs text-[#6B6B6B] mt-0.5">
          {trip
            ? `Previously used route: ${trip.from} → ${trip.to}`
            : "Select a trip to view the route"}
        </p>
      </div>
      <div className="relative h-64 min-h-[200px] bg-[#FAFAFA]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 256"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Grid */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 32}
              x2="400"
              y2={i * 32}
              stroke="#E5E5E5"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 36}
              y1="0"
              x2={i * 36}
              y2="256"
              stroke="#E5E5E5"
              strokeWidth="0.5"
            />
          ))}
          {/* Route path - animated on load when trip selected */}
          {trip && (
            <motion.path
              d="M 40 200 Q 120 160 200 120 T 360 80"
              fill="none"
              stroke="#22C55E"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.8 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
          )}
          {/* Origin marker */}
          <circle cx="40" cy="200" r="8" fill="#22C55E" />
          <circle cx="40" cy="200" r="5" fill="white" />
          {/* Destination marker */}
          <circle cx="360" cy="80" r="8" fill="#111111" />
          <circle cx="360" cy="80" r="5" fill="white" />
        </svg>
      </div>
    </motion.div>
  );
}
