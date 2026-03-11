"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock } from "lucide-react";

const congestedRoads = [
  { name: "Western Express Highway", level: "Heavy", delay: "18 min" },
  { name: "S.V. Road", level: "Moderate", delay: "12 min" },
  { name: "LBS Marg", level: "Heavy", delay: "15 min" },
];

export function TrafficDataCards() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-sm"
      >
        <h3 className="font-semibold text-[#111111] mb-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          Most congested roads
        </h3>
        <ul className="space-y-2">
          {congestedRoads.map((road) => (
            <li
              key={road.name}
              className="flex items-center justify-between rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-2 text-sm"
            >
              <span className="font-medium text-[#111111]">{road.name}</span>
              <span
                className={`text-xs font-medium ${
                  road.level === "Heavy" ? "text-red-500" : "text-amber-600"
                }`}
              >
                {road.level} • {road.delay}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-[#E5E5E5] bg-white p-5 shadow-sm sm:w-64"
      >
        <h3 className="font-semibold text-[#111111] mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#22C55E]" />
          Average traffic delay
        </h3>
        <p className="text-3xl font-semibold text-[#111111]">14 min</p>
        <p className="mt-1 text-sm text-[#6B6B6B]">
          Across major corridors
        </p>
      </motion.div>
    </div>
  );
}
