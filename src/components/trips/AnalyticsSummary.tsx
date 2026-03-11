"use client";

import { motion } from "framer-motion";
import { Route, Clock } from "lucide-react";

export function AnalyticsSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Analytics summary</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Route className="h-4 w-4 text-[#22C55E]" />
            <span className="text-sm font-medium text-[#6B6B6B]">
              Most used route
            </span>
          </div>
          <p className="font-semibold text-[#111111]">Home → Office</p>
          <p className="text-xs text-[#6B6B6B] mt-1">12 trips this month</p>
        </div>
        <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-[#22C55E]" />
            <span className="text-sm font-medium text-[#6B6B6B]">
              Average travel duration
            </span>
          </div>
          <p className="font-semibold text-[#111111]">24 min</p>
          <p className="text-xs text-[#6B6B6B] mt-1">Across all trips</p>
        </div>
      </div>
    </motion.div>
  );
}
