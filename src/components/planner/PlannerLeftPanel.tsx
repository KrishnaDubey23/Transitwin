"use client";

import { useState } from "react";
import { Search, MapPin, Car, Train, Bus, Footprints } from "lucide-react";
import { Input } from "@/components/ui/input";

const transports = [
  { id: "car", label: "Car", icon: Car },
  { id: "metro", label: "Metro", icon: Train },
  { id: "bus", label: "Bus", icon: Bus },
  { id: "walking", label: "Walking", icon: Footprints },
] as const;

export function PlannerLeftPanel({
  onSearch,
}: {
  onSearch?: (source: string, destination: string, transports: string[]) => void;
}) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedTransports, setSelectedTransports] = useState<string[]>([
    "car",
    "metro",
    "bus",
  ]);

  const toggleTransport = (id: string) => {
    setSelectedTransports((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSearch = () => {
    onSearch?.(source, destination, selectedTransports);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Route search */}
      <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-[#111111] mb-4">
          Route search inputs
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#6B6B6B] mb-2">
              Source location
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
              Destination location
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
        </div>
      </div>

      {/* Transport filters */}
      <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-[#111111] mb-4">Transport filters</h2>
        <div className="grid grid-cols-2 gap-3">
          {transports.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => toggleTransport(t.id)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-left transition-all ${
                selectedTransports.includes(t.id)
                  ? "border-[#22C55E] bg-[#22C55E]/10 text-[#111111]"
                  : "border-[#E5E5E5] bg-[#FAFAFA] text-[#6B6B6B] hover:border-[#E5E5E5]"
              }`}
            >
              <t.icon className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-4 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#333333]"
      >
        <Search className="h-4 w-4" />
        Find Smart Route
      </button>
    </div>
  );
}
