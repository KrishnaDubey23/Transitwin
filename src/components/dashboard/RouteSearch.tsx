"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

export function RouteSearch() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4">Route search shortcut</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
            Enter Source
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
            <Input
              placeholder="e.g. Andheri, Home"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="pl-10 h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA] text-[#111111] placeholder:text-[#6B6B6B] focus:bg-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
            Enter Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
            <Input
              placeholder="e.g. BKC, Office"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA] text-[#111111] placeholder:text-[#6B6B6B] focus:bg-white"
            />
          </div>
        </div>
        <Link
          href="/dashboard/planner"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#333333]"
        >
          <Search className="h-4 w-4" />
          Find Smart Route
        </Link>
      </div>
    </motion.div>
  );
}
