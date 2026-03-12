"use client";

import { motion } from "framer-motion";
import { Car, Train, Bus, Footprints } from "lucide-react";
import type { RouteOption } from "./types";

const modeIcons = { walk: Footprints, metro: Train, bus: Bus, car: Car };
const modeLabels: Record<string, string> = {
  walk: "Walk",
  metro: "Local train",
  bus: "Bus",
  car: "Car",
};
const modeColors = {
  walk: "bg-[#22C55E]/20 text-[#22C55E]",
  metro: "bg-blue-500/20 text-blue-600",
  bus: "bg-amber-500/20 text-amber-600",
  car: "bg-[#6B6B6B]/20 text-[#6B6B6B]",
};

interface RouteBreakdownPanelProps {
  route: RouteOption | null;
}

export function RouteBreakdownPanel({ route }: RouteBreakdownPanelProps) {
  if (!route) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-sm"
    >
      <h3 className="font-semibold text-[#111111] mb-4">Route Breakdown</h3>
      <div className="space-y-3">
        {route.legs.map((leg, i) => {
          const Icon = modeIcons[leg.mode];
          return (
            <div
              key={i}
              className="flex gap-3 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-3"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${modeColors[leg.mode]}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#111111]">
                  {i + 1}. {modeLabels[leg.mode] ?? leg.mode}
                </p>
                <p className="text-sm text-[#6B6B6B]">
                  {leg.from} → {leg.to}
                </p>
                {leg.details && (
                  <p className="text-xs text-[#6B6B6B] mt-0.5">{leg.details}</p>
                )}
                <p className="mt-1 text-sm font-medium text-[#111111]">
                  {leg.duration} min
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
