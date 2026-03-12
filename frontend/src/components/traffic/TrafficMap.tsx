"use client";

import dynamic from "next/dynamic";

type ViewMode = "heatmap" | "density" | "peak";

interface TrafficMapProps {
  viewMode: ViewMode;
}

const TrafficLeafletMap = dynamic(
  () => import("./TrafficLeafletMap").then((m) => m.TrafficLeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[calc(100vh-10rem)] min-h-[400px] w-full items-center justify-center bg-[#FAFAFA]">
        <p className="text-[#6B6B6B]">Loading map...</p>
      </div>
    ),
  }
);

export function TrafficMap({ viewMode }: TrafficMapProps) {
  return (
    <div className="relative w-full">
      <TrafficLeafletMap viewMode={viewMode} />
      <div className="absolute bottom-4 left-4 z-[1000] rounded-lg border border-[#E5E5E5] bg-white/95 px-4 py-2 shadow-sm">
        <p className="text-xs font-medium text-[#6B6B6B] mb-2">Traffic level</p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
            Smooth
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            Moderate
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            Heavy
          </span>
        </div>
      </div>
    </div>
  );
}
