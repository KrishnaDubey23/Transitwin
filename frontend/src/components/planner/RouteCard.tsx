"use client";

import { motion } from "framer-motion";
import { Car, Train, Bus, Footprints, MapPin } from "lucide-react";
import type { RouteOption } from "./types";

const modeIcons = { walk: Footprints, metro: Train, bus: Bus, car: Car };
const modeLabels: Record<string, string> = {
  walk: "Walk",
  metro: "Local train",
  bus: "Bus",
  car: "Car",
};

const TAG_STYLES = {
  fastest: "bg-[#22C55E] text-white",
  cheapest: "bg-blue-500 text-white",
  balanced: "bg-[#6B6B6B] text-white",
};

const RANK_LABELS: Record<number, string> = {
  1: "Best Route",
  2: "Second Best",
  3: "Third Option",
};

interface RouteCardProps {
  route: RouteOption;
  isSelected: boolean;
  onSelect: () => void;
}

export function RouteCard({ route, isSelected, onSelect }: RouteCardProps) {
  const displayType = route.legs
    .map((l) => modeLabels[l.mode] ?? l.mode)
    .join(" → ");

  const primaryMode = route.legs[0]?.mode ?? "car";
  const Icon = modeIcons[primaryMode];

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.01 }}
      className={`w-full rounded-xl border p-4 text-left transition-all ${
        isSelected
          ? "border-[#22C55E] bg-[#22C55E]/5"
          : "border-[#E5E5E5] bg-white hover:border-[#E5E5E5]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-[#111111]">
              Route {route.id.replace("route-", "")}
            </span>
            {route.tag && (
              <span
                className={`rounded px-2 py-0.5 text-xs font-medium ${
                  TAG_STYLES[route.tag]
                }`}
              >
                {route.tag.charAt(0).toUpperCase() + route.tag.slice(1)} Route
              </span>
            )}
            {route.rank && RANK_LABELS[route.rank] && (
              <span className="text-xs text-[#6B6B6B]">
                {RANK_LABELS[route.rank]}
              </span>
            )}
          </div>
          <p className="text-sm text-[#6B6B6B] flex items-center gap-1 flex-wrap">
            <Icon className="h-3.5 w-3.5" />
            {displayType}
          </p>
          <div className="mt-3 space-y-1">
            <p className="text-[#111111] font-medium">
              {route.totalTime} min · {route.totalDistance} km
            </p>
            <p className="text-sm text-[#6B6B6B]">
              Estimated cost: ₹{route.estimatedCost}
            </p>
          </div>
          {route.stops && route.stops.length > 0 && (
            <p className="mt-1 text-xs text-[#6B6B6B] truncate">
              {route.stops.join(" → ")}
            </p>
          )}
        </div>
        <div className="shrink-0 rounded-lg bg-[#FAFAFA] px-2 py-1 text-xs font-medium text-[#22C55E] flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          View on Map
        </div>
      </div>
    </motion.button>
  );
}
