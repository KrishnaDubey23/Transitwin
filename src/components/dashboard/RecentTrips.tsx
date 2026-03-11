"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Route } from "lucide-react";

const recentTrips = [
  { from: "Home", to: "Office", id: "1" },
  { from: "Andheri", to: "BKC", id: "2" },
];

export function RecentTrips() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[#111111]">Recent trips</h2>
        <Link
          href="/dashboard/trips"
          className="text-sm font-medium text-[#22C55E] hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="space-y-3">
        {recentTrips.map((trip, i) => (
          <button
            key={trip.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-4 py-3 text-left transition-colors hover:border-[#22C55E] hover:bg-[#FAFAFA]"
          >
            <Route className="h-4 w-4 shrink-0 text-[#22C55E]" />
            <span className="text-[#111111]">
              {trip.from} → {trip.to}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
