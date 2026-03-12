"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Route, Map, Download } from "lucide-react";

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-3"
    >
      <Link
        href="/dashboard/planner"
        className="flex items-center gap-2 rounded-full border border-[#22C55E] bg-[#22C55E] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1ea34f] transition-colors"
      >
        <Route className="h-4 w-4" />
        Plan New Route
      </Link>
      <Link
        href="/dashboard/traffic"
        className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-5 py-2.5 text-sm font-medium text-[#111111] hover:bg-[#FAFAFA] hover:border-[#111111] transition-colors"
      >
        <Map className="h-4 w-4" />
        View Traffic Map
      </Link>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-5 py-2.5 text-sm font-medium text-[#111111] hover:bg-[#FAFAFA] hover:border-[#111111] transition-colors"
      >
        <Download className="h-4 w-4" />
        Export Travel Data
      </button>
    </motion.div>
  );
}
