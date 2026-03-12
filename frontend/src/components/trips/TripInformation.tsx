"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Car } from "lucide-react";
import type { Trip } from "./SavedTrips";

interface TripInformationProps {
  trip: Trip | null;
}

export function TripInformation({ trip }: TripInformationProps) {
  if (!trip) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
      >
        <h2 className="font-semibold text-[#111111] mb-4">Trip information</h2>
        <p className="text-[#6B6B6B] text-sm">
          Select a trip to view details
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={trip.id}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Trip information</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
            <Clock className="h-4 w-4 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Travel time</p>
            <p className="font-medium text-[#111111]">{trip.travelTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
            <MapPin className="h-4 w-4 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Distance</p>
            <p className="font-medium text-[#111111]">{trip.distance}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
            <Car className="h-4 w-4 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Transport type</p>
            <p className="font-medium text-[#111111]">{trip.transportType}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
