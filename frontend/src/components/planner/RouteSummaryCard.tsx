"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Car } from "lucide-react";
import type { RouteOption } from "./types";

interface RouteSummaryCardProps {
  route: RouteOption | null;
}

export function RouteSummaryCard({ route }: RouteSummaryCardProps) {
  if (!route) return null;

  const modeLabels: Record<string, string> = {
    walk: "Walk",
    metro: "Local train",
    bus: "Bus",
    car: "Car",
  };
  const transportUsed = route.legs
    .map((l) => modeLabels[l.mode] ?? l.mode)
    .join(" + ");

  const hasCost = "estimatedCost" in route;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-sm"
    >
      <h3 className="font-semibold text-[#111111] mb-4">Route Summary</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-[#FAFAFA] p-3">
          <Clock className="h-4 w-4 text-[#22C55E] mb-1" />
          <p className="text-xs text-[#6B6B6B]">Total Time</p>
          <p className="font-semibold text-[#111111]">{route.totalTime} min</p>
        </div>
        <div className="rounded-lg bg-[#FAFAFA] p-3">
          <MapPin className="h-4 w-4 text-[#22C55E] mb-1" />
          <p className="text-xs text-[#6B6B6B]">Total Distance</p>
          <p className="font-semibold text-[#111111]">{route.totalDistance} km</p>
        </div>
        <div className="rounded-lg bg-[#FAFAFA] p-3">
          <Car className="h-4 w-4 text-[#22C55E] mb-1" />
          <p className="text-xs text-[#6B6B6B]">Transport Used</p>
          <p className="font-semibold text-[#111111] text-sm">{transportUsed}</p>
        </div>
        {hasCost && (
          <div className="rounded-lg bg-[#FAFAFA] p-3 sm:col-span-3">
            <p className="text-xs text-[#6B6B6B]">Estimated Cost</p>
            <p className="font-semibold text-[#111111]">₹{route.estimatedCost}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
