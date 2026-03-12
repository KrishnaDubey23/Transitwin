"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Route, Clock } from "lucide-react";
import { apiGetStats } from "@/lib/api";

const defaultStats = [
  { icon: Route, label: "Trips planned", value: "0" },
  { icon: Clock, label: "Average commute time", value: "—" },
];

export function QuickStats() {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    apiGetStats()
      .then((data) => {
        if (data) {
          setStats([
            { icon: Route, label: "Trips planned", value: String(data.total_trips) },
            {
              icon: Clock,
              label: "Efficiency score",
              value: data.efficiency_score ? `${data.efficiency_score}%` : "—",
            },
          ]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Quick statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-4"
          >
            <stat.icon className="h-5 w-5 text-[#22C55E] mb-2" />
            <p className="text-2xl font-semibold text-[#111111]">{stat.value}</p>
            <p className="text-sm text-[#6B6B6B]">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
