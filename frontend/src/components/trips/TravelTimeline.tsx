"use client";

import { motion } from "framer-motion";
import { Train, Car, Bus } from "lucide-react";
import type { Trip } from "./SavedTrips";

interface TravelTimelineProps {
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
}

const transportIcons = { Car, "Local train": Train, Bus };

export function TravelTimeline({ trips, onSelectTrip }: TravelTimelineProps) {
  const timeline = trips.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Recent Trips</h2>
      <div className="space-y-0">
        {timeline.map((trip, i) => {
          const Icon = transportIcons[trip.transportType];
          const isLast = i === timeline.length - 1;
          return (
            <button
              key={trip.id}
              type="button"
              onClick={() => onSelectTrip(trip)}
              className="flex w-full items-start gap-4 py-4 text-left hover:bg-[#FAFAFA] rounded-lg -mx-2 px-2 transition-colors"
            >
              <div className="flex flex-col items-center shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22C55E]/10">
                  <Icon className="h-4 w-4 text-[#22C55E]" />
                </div>
                {!isLast && <div className="w-0.5 flex-1 min-h-[24px] bg-[#E5E5E5] mt-1" />}
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-xs text-[#6B6B6B]">{trip.lastUsed ?? "Recently"}</p>
                <p className="font-medium text-[#111111]">{trip.from} → {trip.to}</p>
                <p className="text-xs text-[#6B6B6B] mt-0.5">{trip.transportType} • {trip.travelTime}</p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
