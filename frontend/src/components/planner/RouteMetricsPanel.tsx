"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Banknote } from "lucide-react";
import type { RouteOption } from "./types";

interface RouteMetricsPanelProps {
  routes: RouteOption[];
}

export function RouteMetricsPanel({ routes }: RouteMetricsPanelProps) {
  if (routes.length === 0) return null;

  const fastest = Math.min(...routes.map((r) => r.totalTime));
  const shortest = Math.min(...routes.map((r) => r.totalDistance));
  const lowestCost = Math.min(...routes.map((r) => r.estimatedCost));

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-sm"
    >
      <h3 className="font-semibold text-[#111111] mb-4">Route Comparison</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-3 text-center">
          <Clock className="h-4 w-4 text-[#22C55E] mx-auto mb-2" />
          <p className="text-xs text-[#6B6B6B]">Fastest</p>
          <p className="font-semibold text-[#111111]">{fastest} min</p>
        </div>
        <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-3 text-center">
          <MapPin className="h-4 w-4 text-[#22C55E] mx-auto mb-2" />
          <p className="text-xs text-[#6B6B6B]">Shortest</p>
          <p className="font-semibold text-[#111111]">{shortest} km</p>
        </div>
        <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-3 text-center">
          <Banknote className="h-4 w-4 text-[#22C55E] mx-auto mb-2" />
          <p className="text-xs text-[#6B6B6B]">Lowest Cost</p>
          <p className="font-semibold text-[#111111]">₹{lowestCost}</p>
        </div>
      </div>
    </motion.div>
  );
}
