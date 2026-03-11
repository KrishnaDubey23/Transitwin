"use client";

import { useState } from "react";
import { PlannerLeftPanel } from "@/components/planner/PlannerLeftPanel";
import { PlannerMap } from "@/components/planner/PlannerMap";
import { PlannerResults } from "@/components/planner/PlannerResults";

export default function PlannerPage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = (
    newSource: string,
    _newDestination: string,
    _transports: string[],
  ) => {
    setSource(newSource);
    setDestination(_newDestination);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl font-normal text-[#111111]">
          Smart Route Planner
        </h1>
        <p className="mt-1 text-[#6B6B6B] text-sm">
          Search and compare routes across transport modes
        </p>
      </div>

      {/* Main layout: Left panel + Right panel (map) */}
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <PlannerLeftPanel onSearch={handleSearch} />
        </aside>

        <div className="min-w-0">
          <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-sm">
            <h2 className="font-semibold text-[#111111] mb-4">
              Interactive map visualization
            </h2>
            <PlannerMap source={source} destination={destination} />
          </div>
        </div>
      </div>

      {/* Results section */}
      <div className="lg:pl-[340px]">
        <PlannerResults />
      </div>
    </div>
  );
}
