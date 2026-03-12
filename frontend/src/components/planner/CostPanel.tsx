"use client";

import { motion } from "framer-motion";
import { Car, Train, Bus } from "lucide-react";
import type { RouteOption } from "./types";

interface CostPanelProps {
  routes: RouteOption[];
}

function getPrimaryMode(route: RouteOption): string {
  const motorized = route.legs.find((l) => l.mode !== "walk");
  if (motorized) {
    if (motorized.mode === "metro") return "Local train";
    return motorized.mode.charAt(0).toUpperCase() + motorized.mode.slice(1);
  }
  return "Walk";
}

const modeIcons: Record<string, typeof Car> = { Car, "Local train": Train, Metro: Train, Bus };

export function CostPanel({ routes }: CostPanelProps) {
  if (routes.length === 0) return null;

  const costByMode = routes.reduce(
    (acc, r) => {
      const mode = getPrimaryMode(r);
      if (!acc[mode] || acc[mode] > r.estimatedCost) {
        acc[mode] = r.estimatedCost;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-sm"
    >
      <h3 className="font-semibold text-[#111111] mb-4">Estimated Cost</h3>
      <div className="space-y-2">
        {Object.entries(costByMode).map(([mode, cost]) => {
          const Icon = modeIcons[mode] ?? Car;
          return (
            <div
              key={mode}
              className="flex items-center justify-between rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-[#6B6B6B]" />
                <span className="text-sm font-medium text-[#111111]">{mode}</span>
              </div>
              <span className="font-semibold text-[#111111]">₹{cost}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
