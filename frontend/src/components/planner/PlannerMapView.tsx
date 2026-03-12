"use client";

import dynamic from "next/dynamic";
import type { RouteOption } from "./types";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl border border-[#E5E5E5] bg-[#FAFAFA]">
      <p className="text-[#6B6B6B]">Loading map...</p>
    </div>
  ),
});

interface PlannerMapViewProps {
  source?: string;
  destination?: string;
  selectedRoute: RouteOption | null;
}

export function PlannerMapView({
  source,
  destination,
  selectedRoute,
}: PlannerMapViewProps) {
  return (
    <div className="h-full min-h-[400px] rounded-xl border border-[#E5E5E5] overflow-hidden">
      <LeafletMap
        source={source}
        destination={destination}
        selectedRoute={selectedRoute}
      />
    </div>
  );
}
