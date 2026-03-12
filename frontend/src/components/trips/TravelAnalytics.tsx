"use client";

import { motion } from "framer-motion";
import { Route, Clock, MapPin, Leaf } from "lucide-react";

export function TravelAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Travel Analytics</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          icon={Route}
          label="Most Used Route"
          value="Home → Office"
          sub="12 trips this month"
        />
        <AnalyticsCard
          icon={Clock}
          label="Average Travel Duration"
          value="24 minutes"
          sub="Across all trips"
        />
        <AnalyticsCard
          icon={MapPin}
          label="Total Distance Travelled"
          value="132 km"
          sub="This month"
        />
        <AnalyticsCard
          icon={Leaf}
          label="Carbon Saved"
          value="5.6 kg CO₂"
          sub="By using public transport"
        />
      </div>
      {/* Weekly summary bar */}
      <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
        <p className="text-xs font-medium text-[#6B6B6B] mb-2">Weekly travel summary</p>
        <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-[#E5E5E5]">
          {[65, 40, 80, 55, 90, 70, 45].map((pct, i) => (
            <div
              key={i}
              className="flex-1 bg-[#22C55E] rounded-sm"
              style={{ opacity: pct / 100 }}
            />
          ))}
        </div>
        <p className="text-xs text-[#6B6B6B] mt-1">Mon — Sun</p>
      </div>
    </motion.div>
  );
}

function AnalyticsCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Route;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4 text-[#22C55E]" />
        <span className="text-sm font-medium text-[#6B6B6B]">{label}</span>
      </div>
      <p className="font-semibold text-[#111111]">{value}</p>
      <p className="text-xs text-[#6B6B6B] mt-0.5">{sub}</p>
    </div>
  );
}
