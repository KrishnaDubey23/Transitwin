"use client";

import { motion } from "framer-motion";

interface TicketPreviewCardProps {
  passengerName: string;
  source: string;
  destination: string;
  transport: string;
  travelTime: number;
  bookingId: string;
}

export function TicketPreviewCard({
  passengerName,
  source,
  destination,
  transport,
  travelTime,
  bookingId,
}: TicketPreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border-2 border-dashed border-[#E5E5E5] bg-[#FAFAFA] p-6"
    >
      <h3 className="font-semibold text-[#111111] mb-4">TransitWin Ticket</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#6B6B6B]">Passenger</span>
          <span className="font-medium text-[#111111]">{passengerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6B6B]">Route</span>
          <span className="font-medium text-[#111111]">
            {source} → {destination}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6B6B]">Transport</span>
          <span className="font-medium text-[#111111]">{transport}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6B6B]">Travel Time</span>
          <span className="font-medium text-[#111111]">{travelTime} min</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6B6B6B]">Booking ID</span>
          <span className="font-mono font-medium text-[#111111]">{bookingId}</span>
        </div>
      </div>
      <div className="mt-4 flex h-20 items-center justify-center rounded-lg border border-[#E5E5E5] bg-white">
        <p className="text-xs text-[#6B6B6B]">QR Code Preview</p>
      </div>
    </motion.div>
  );
}
