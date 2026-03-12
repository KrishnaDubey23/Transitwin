"use client";

import { motion } from "framer-motion";
import { Lightbulb, Leaf } from "lucide-react";

export function SmartInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Smart Insights</h2>
      <div className="space-y-3">
        <div className="flex gap-3 rounded-lg border border-[#E5E5E5] bg-amber-50/50 p-4">
          <Lightbulb className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
          <div>
            <p className="font-medium text-[#111111] text-sm">Smart Insight</p>
            <p className="text-sm text-[#6B6B6B] mt-0.5">
              Local train routes are 18% faster during peak hours for your Home → Office commute.
            </p>
          </div>
        </div>
        <div className="flex gap-3 rounded-lg border border-[#E5E5E5] bg-[#22C55E]/5 p-4">
          <Leaf className="h-5 w-5 shrink-0 text-[#22C55E] mt-0.5" />
          <div>
            <p className="font-medium text-[#111111] text-sm">Sustainability Insight</p>
            <p className="text-sm text-[#6B6B6B] mt-0.5">
              You saved 5.6 kg CO₂ this month by using public transport.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
