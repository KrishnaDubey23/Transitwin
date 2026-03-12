"use client";

import { motion } from "framer-motion";
import type { RouteOption } from "@/components/planner/types";

interface SelectedRouteSummaryProps {
  route: RouteOption;
  source: string;
  destination: string;
}

export function SelectedRouteSummary({
  route,
  source,
  destination,
}: SelectedRouteSummaryProps) {
  const modeLabels: Record<string, string> = {
    walk: "Walk",
    metro: "Local train",
    bus: "Bus",
    car: "Car",
  };
  const transportType = route.legs
    .map((l) => modeLabels[l.mode] ?? l.mode)
    .join(" → ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Selected Route</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-xs text-[#6B6B6B]">Source</p>
          <p className="font-medium text-[#111111]">{source}</p>
        </div>
        <div>
          <p className="text-xs text-[#6B6B6B]">Destination</p>
          <p className="font-medium text-[#111111]">{destination}</p>
        </div>
        <div>
          <p className="text-xs text-[#6B6B6B]">Transport Mode</p>
          <p className="font-medium text-[#111111]">
            {modeLabels[route.legs.find((l) => l.mode !== "walk")?.mode ?? "walk"] ?? "Walk"}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#6B6B6B]">Route Type</p>
          <p className="font-medium text-[#111111]">{transportType}</p>
        </div>
        <div>
          <p className="text-xs text-[#6B6B6B]">Estimated Time</p>
          <p className="font-medium text-[#111111]">{route.totalTime} minutes</p>
        </div>
        <div>
          <p className="text-xs text-[#6B6B6B]">Distance</p>
          <p className="font-medium text-[#111111]">{route.totalDistance} km</p>
        </div>
      </div>
    </motion.div>
  );
}
