"use client";

import { motion } from "framer-motion";
import { Route, Car, Clock, MapPin, Banknote, Leaf } from "lucide-react";
import type { Trip } from "./SavedTrips";

interface TripDetailsProps {
  trip: Trip | null;
}

export function TripDetails({ trip }: TripDetailsProps) {
  if (!trip) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-[#E5E5E5] bg-white p-8 shadow-sm"
      >
        <h2 className="font-semibold text-[#111111] mb-4">Trip Details</h2>
        <p className="text-[#6B6B6B] text-sm">Select a trip to view details</p>
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
      <h2 className="font-semibold text-[#111111] mb-5">Trip Details</h2>
      <div className="space-y-4">
        <DetailRow icon={Route} label="Route" value={`${trip.from} → ${trip.to}`} />
        <DetailRow icon={Car} label="Transport Mode" value={trip.transportType} />
        <DetailRow icon={Clock} label="Travel Time" value={trip.travelTime} />
        <DetailRow icon={MapPin} label="Distance" value={trip.distance} />
        {trip.estimatedCost != null && (
          <DetailRow icon={Banknote} label="Estimated Cost" value={`₹${trip.estimatedCost}`} />
        )}
        {trip.carbonImpact != null && (
          <DetailRow icon={Leaf} label="Carbon Impact" value={`${trip.carbonImpact} kg CO₂ saved`} />
        )}
        {trip.frequency != null && (
          <p className="text-sm text-[#6B6B6B] pt-2 border-t border-[#E5E5E5]">
            Used {trip.frequency} times this month
          </p>
        )}
      </div>
    </motion.div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Route;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
        <Icon className="h-4 w-4 text-[#22C55E]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#6B6B6B]">{label}</p>
        <p className="font-medium text-[#111111] truncate">{value}</p>
      </div>
    </div>
  );
}
