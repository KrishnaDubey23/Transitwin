"use client";

import { motion } from "framer-motion";

interface BookingSummaryCardProps {
  source: string;
  destination: string;
  transport: string;
  travelTime: number;
  distance: number;
  ticketPrice: number;
  ticketCount: number;
}

export function BookingSummaryCard({
  source,
  destination,
  transport,
  travelTime,
  distance,
  ticketPrice,
  ticketCount,
}: BookingSummaryCardProps) {
  const totalCost = ticketPrice * ticketCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm lg:sticky lg:top-24"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Booking Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6B6B]">Route</span>
          <span className="font-medium text-[#111111]">
            {source} → {destination}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6B6B]">Transport</span>
          <span className="font-medium text-[#111111]">{transport}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6B6B]">Travel Time</span>
          <span className="font-medium text-[#111111]">{travelTime} min</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6B6B]">Distance</span>
          <span className="font-medium text-[#111111]">{distance} km</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6B6B]">Ticket Price</span>
          <span className="font-medium text-[#111111]">₹{ticketPrice}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6B6B6B]">Tickets</span>
          <span className="font-medium text-[#111111]">{ticketCount}</span>
        </div>
        <div className="border-t border-[#E5E5E5] pt-3 mt-3 flex justify-between">
          <span className="font-semibold text-[#111111]">Total Cost</span>
          <span className="font-semibold text-[#111111]">₹{totalCost}</span>
        </div>
      </div>
    </motion.div>
  );
}
