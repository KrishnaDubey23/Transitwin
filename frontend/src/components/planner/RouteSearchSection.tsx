"use client";

import { useState } from "react";
import { Search, MapPin, Car, Train, Bus, Footprints } from "lucide-react";
import { Input } from "@/components/ui/input";

const transports = [
  { id: "car", label: "Car", icon: Car },
  { id: "metro", label: "Local train", icon: Train },
  { id: "bus", label: "Bus", icon: Bus },
  { id: "walking", label: "Walking", icon: Footprints },
] as const;

interface RouteSearchSectionProps {
  onSearch: (source: string, destination: string, modes: string[]) => void;
  isLoading?: boolean;
}

export function RouteSearchSection({ onSearch, isLoading }: RouteSearchSectionProps) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedModes, setSelectedModes] = useState<string[]>([
    "car",
    "metro",
    "bus",
    "walking",
  ]);

  const toggleMode = (id: string) => {
    setSelectedModes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(source, destination, selectedModes);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">
            Enter Source
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
            <Input
              placeholder="e.g. Andheri"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="pl-10 h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA]"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">
            Enter Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6B6B]" />
            <Input
              placeholder="e.g. BKC"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-6 text-sm font-medium text-white hover:bg-[#333333] disabled:opacity-60 lg:w-auto"
          >
            <Search className="h-4 w-4" />
            {isLoading ? "Searching..." : "Find Smart Route"}
          </button>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-[#6B6B6B] mb-2">Transport Modes</p>
        <div className="flex flex-wrap gap-2">
          {transports.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => toggleMode(t.id)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all ${
                selectedModes.includes(t.id)
                  ? "border-[#22C55E] bg-[#22C55E]/10 text-[#111111]"
                  : "border-[#E5E5E5] bg-[#FAFAFA] text-[#6B6B6B]"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
