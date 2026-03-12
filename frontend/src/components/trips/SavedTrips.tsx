"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Car, Train, Bus, Bookmark, BookmarkCheck, Trash2, Home, Plane, GraduationCap } from "lucide-react";
import { apiGetTrips } from "@/lib/api";

export interface Trip {
  id: string;
  from: string;
  to: string;
  travelTime: string;
  distance: string;
  transportType: "Car" | "Local train" | "Bus";
  lastUsed?: string;
  estimatedCost?: number;
  carbonImpact?: number;
  frequency?: number;
  fromIcon?: "home" | "airport" | "college" | "default";
}

const DEFAULT_TRIPS: Trip[] = [
  {
    id: "1",
    from: "Home",
    to: "Office",
    travelTime: "22 min",
    distance: "8.5 km",
    transportType: "Local train",
    lastUsed: "Today",
    estimatedCost: 20,
    carbonImpact: 0.3,
    frequency: 12,
    fromIcon: "home",
  },
  {
    id: "2",
    from: "Airport",
    to: "Hotel",
    travelTime: "35 min",
    distance: "18 km",
    transportType: "Car",
    lastUsed: "Yesterday",
    estimatedCost: 120,
    carbonImpact: 0,
    fromIcon: "airport",
  },
  {
    id: "3",
    from: "College",
    to: "Library",
    travelTime: "18 min",
    distance: "5 km",
    transportType: "Bus",
    lastUsed: "2 days ago",
    estimatedCost: 15,
    carbonImpact: 0.2,
    fromIcon: "college",
  },
];

const modeToTransport: Record<string, "Car" | "Local train" | "Bus"> = {
  car: "Car",
  metro: "Local train",
  train: "Local train",
  bus: "Bus",
};

const transportIcons = {
  Car,
  "Local train": Train,
  Bus,
};

const fromIcons = {
  home: Home,
  airport: Plane,
  college: GraduationCap,
  default: MapPin,
};

interface SavedTripsProps {
  selectedTrip: Trip | null;
  onSelectTrip: (trip: Trip | null) => void;
  filter: string;
  sort: string;
}

export function SavedTrips({ selectedTrip, onSelectTrip, filter, sort }: SavedTripsProps) {
  const [savedTrips, setSavedTrips] = useState<Trip[]>(DEFAULT_TRIPS);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set(["1"]));

  useEffect(() => {
    apiGetTrips()
      .then((apiTrips) => {
        if (apiTrips?.length) {
          setSavedTrips(
            apiTrips.map((t, i) => ({
              id: t._id,
              from: t.origin,
              to: t.destination,
              travelTime: `${t.duration} min`,
              distance: "—",
              transportType: modeToTransport[t.mode] ?? "Car",
              lastUsed: i === 0 ? "Today" : i === 1 ? "Yesterday" : "Recently",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const filtered = savedTrips.filter((t) => {
    if (filter === "All Trips") return true;
    if (filter === "Car") return t.transportType === "Car";
    if (filter === "Train") return t.transportType === "Local train";
    if (filter === "Bus") return t.transportType === "Bus";
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Recent") {
      const order = { Today: 0, Yesterday: 1, "2 days ago": 2 };
      return (order[a.lastUsed as keyof typeof order] ?? 3) - (order[b.lastUsed as keyof typeof order] ?? 3);
    }
    if (sort === "Duration") {
      const mins = (s: string) => parseInt(s, 10) || 0;
      return mins(a.travelTime) - mins(b.travelTime);
    }
    if (sort === "Distance") {
      const km = (s: string) => parseFloat(s) || 0;
      return km(a.distance) - km(b.distance);
    }
    return 0;
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedTrips((prev) => prev.filter((t) => t.id !== id));
    if (selectedTrip?.id === id) onSelectTrip(null);
  };

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
    >
      <h2 className="font-semibold text-[#111111] mb-4 flex items-center gap-2">
        <Bookmark className="h-4 w-4 text-[#22C55E]" />
        Saved Trips
      </h2>
      <div className="space-y-2">
        {sorted.map((trip) => {
          const Icon = transportIcons[trip.transportType];
          const FromIcon = fromIcons[trip.fromIcon ?? "default"];
          const isSelected = selectedTrip?.id === trip.id;
          const isBookmarked = bookmarked.has(trip.id);
          return (
            <div
              key={trip.id}
              className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                isSelected
                  ? "border-[#22C55E] bg-[#22C55E]/5"
                  : "border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#E5E5E5]"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectTrip(trip)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
                  <FromIcon className="h-4 w-4 text-[#22C55E]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[#111111]">
                    {trip.from} → {trip.to}
                  </p>
                  <p className="text-xs text-[#6B6B6B] flex items-center gap-1 mt-0.5">
                    <Icon className="h-3 w-3" />
                    {trip.transportType} • {trip.travelTime}
                  </p>
                  {trip.lastUsed && (
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Last used: {trip.lastUsed}</p>
                  )}
                </div>
              </button>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(e, trip.id)}
                  className="rounded p-1.5 text-[#6B6B6B] hover:bg-[#E5E5E5] hover:text-[#22C55E]"
                  title={isBookmarked ? "Unbookmark" : "Bookmark"}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-4 w-4 text-[#22C55E]" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(e, trip.id)}
                  className="rounded p-1.5 text-[#6B6B6B] hover:bg-red-50 hover:text-red-500"
                  title="Delete trip"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
