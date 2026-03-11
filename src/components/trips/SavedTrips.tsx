"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Car, Train, Bus, Bookmark } from "lucide-react";

export interface Trip {
  id: string;
  from: string;
  to: string;
  travelTime: string;
  distance: string;
  transportType: "Car" | "Metro" | "Bus";
}

const savedTrips: Trip[] = [
  {
    id: "1",
    from: "Home",
    to: "Office",
    travelTime: "22 min",
    distance: "11 km",
    transportType: "Metro",
  },
  {
    id: "2",
    from: "Airport",
    to: "Hotel",
    travelTime: "35 min",
    distance: "18 km",
    transportType: "Car",
  },
];

const transportIcons = {
  Car,
  Metro: Train,
  Bus,
};

interface SavedTripsProps {
  selectedTrip: Trip | null;
  onSelectTrip: (trip: Trip) => void;
}

export function SavedTrips({ selectedTrip, onSelectTrip }: SavedTripsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4 flex items-center gap-2">
        <Bookmark className="h-4 w-4 text-[#22C55E]" />
        Saved trips
      </h2>
      <div className="space-y-2">
        {savedTrips.map((trip) => {
          const Icon = transportIcons[trip.transportType];
          const isSelected = selectedTrip?.id === trip.id;
          return (
            <button
              key={trip.id}
              type="button"
              onClick={() => onSelectTrip(trip)}
              className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                isSelected
                  ? "border-[#22C55E] bg-[#22C55E]/5"
                  : "border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#E5E5E5]"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E5E5E5]">
                <MapPin className="h-4 w-4 text-[#111111]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#111111]">
                  {trip.from} → {trip.to}
                </p>
                <p className="text-xs text-[#6B6B6B] flex items-center gap-1 mt-0.5">
                  <Icon className="h-3 w-3" />
                  {trip.transportType} • {trip.travelTime}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
