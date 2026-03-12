"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface TransitStopsListProps {
  stops: string[];
  routeLabel?: string;
}

export function TransitStopsList({ stops, routeLabel }: TransitStopsListProps) {
  if (stops.length === 0) return null;

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-[#111111] mb-4">Transit Stops</h3>
      {routeLabel && (
        <p className="text-sm text-[#6B6B6B] mb-3">{routeLabel}</p>
      )}
      <div className="space-y-2">
        {stops.map((stop, i) => (
          <motion.div
            key={`${stop}-${i}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            <MapPin className="h-4 w-4 shrink-0 text-[#22C55E]" />
            <span className="text-sm text-[#111111]">{stop}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
