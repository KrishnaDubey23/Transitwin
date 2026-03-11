"use client";

import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "heatmap" | "density" | "peak";

interface TrafficMapProps {
  viewMode: ViewMode;
}

export function TrafficMap({ viewMode }: TrafficMapProps) {
  return (
    <div className="relative w-full h-[calc(100vh-10rem)] min-h-[400px] bg-[#FAFAFA] overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Base grid */}
        {Array.from({ length: 16 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 31}
            x2="600"
            y2={i * 31}
            stroke="#E5E5E5"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 30}
            y1="0"
            x2={i * 30}
            y2="500"
            stroke="#E5E5E5"
            strokeWidth="0.5"
          />
        ))}

        <AnimatePresence mode="wait">
          {viewMode === "heatmap" && <HeatmapOverlay key="heatmap" />}
          {viewMode === "density" && <DensityOverlay key="density" />}
          {viewMode === "peak" && <PeakOverlay key="peak" />}
        </AnimatePresence>

        {/* Road segments with traffic levels */}
        <TrafficSegments viewMode={viewMode} />
      </svg>

      {/* Traffic legend */}
      <div className="absolute bottom-4 left-4 rounded-lg border border-[#E5E5E5] bg-white/95 px-4 py-2 shadow-sm">
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

function HeatmapOverlay() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none"
    >
      {/* Gradient heatmap blobs */}
      <ellipse cx="150" cy="200" rx="80" ry="60" fill="#22C55E" fillOpacity="0.25" />
      <ellipse cx="350" cy="150" rx="100" ry="80" fill="#EAB308" fillOpacity="0.35" />
      <ellipse cx="450" cy="350" rx="90" ry="70" fill="#EF4444" fillOpacity="0.4" />
      <ellipse cx="280" cy="380" rx="70" ry="50" fill="#22C55E" fillOpacity="0.2" />
    </motion.g>
  );
}

function DensityOverlay() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none"
    >
      {/* Congestion density - more defined zones */}
      <rect x="80" y="120" width="120" height="100" rx="8" fill="#22C55E" fillOpacity="0.3" />
      <rect x="220" y="80" width="140" height="120" rx="8" fill="#EAB308" fillOpacity="0.4" />
      <rect x="380" y="200" width="130" height="110" rx="8" fill="#EF4444" fillOpacity="0.45" />
      <rect x="120" y="320" width="100" height="80" rx="8" fill="#22C55E" fillOpacity="0.25" />
      <rect x="400" y="350" width="150" height="100" rx="8" fill="#EAB308" fillOpacity="0.35" />
    </motion.g>
  );
}

function PeakOverlay() {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none"
    >
      {/* Peak hour prediction - darker red in predicted high-traffic zones */}
      <rect x="100" y="100" width="100" height="90" rx="8" fill="#22C55E" fillOpacity="0.2" />
      <rect x="240" y="70" width="120" height="100" rx="8" fill="#EAB308" fillOpacity="0.5" />
      <rect x="380" y="180" width="140" height="120" rx="8" fill="#EF4444" fillOpacity="0.6" />
      <rect x="90" y="300" width="130" height="100" rx="8" fill="#22C55E" fillOpacity="0.15" />
      <rect x="420" y="320" width="120" height="90" rx="8" fill="#EF4444" fillOpacity="0.55" />
    </motion.g>
  );
}

function TrafficSegments({ viewMode }: { viewMode: ViewMode }) {
  const segments = [
    { d: "M 50 250 L 200 200 L 350 150", level: "green" as const },
    { d: "M 350 150 L 500 200 L 550 300", level: "yellow" as const },
    { d: "M 200 200 L 250 350 L 200 450", level: "red" as const },
    { d: "M 100 100 L 200 150 L 300 100", level: "green" as const },
    { d: "M 400 250 L 450 380 L 400 450", level: "yellow" as const },
  ];

  const colors = {
    green: "#22C55E",
    yellow: "#EAB308",
    red: "#EF4444",
  };

  return (
    <g>
      {segments.map((seg, i) => (
        <motion.path
          key={i}
          d={seg.d}
          fill="none"
          stroke={colors[seg.level]}
          strokeWidth={viewMode === "density" ? 8 : 6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: 1 }}
        />
      ))}
    </g>
  );
}
