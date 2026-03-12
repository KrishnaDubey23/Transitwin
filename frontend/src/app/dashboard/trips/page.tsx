"use client";

import { useState, useEffect } from "react";
import { SavedTrips, type Trip } from "@/components/trips/SavedTrips";
import { TripDetails } from "@/components/trips/TripDetails";
import { TravelAnalytics } from "@/components/trips/TravelAnalytics";
import { TravelTimeline } from "@/components/trips/TravelTimeline";
import { SmartInsights } from "@/components/trips/SmartInsights";
import { QuickActions } from "@/components/trips/QuickActions";
import { apiGetTrips } from "@/lib/api";

const FILTER_OPTIONS = ["All Trips", "Car", "Train", "Bus"];
const SORT_OPTIONS = ["Recent", "Duration", "Distance"];

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

export default function TripsPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [filter, setFilter] = useState("All Trips");
  const [sort, setSort] = useState("Recent");
  const [trips, setTrips] = useState<Trip[]>(DEFAULT_TRIPS);

  useEffect(() => {
    apiGetTrips()
      .then((apiTrips) => {
        if (apiTrips?.length) {
          const modeMap: Record<string, "Car" | "Local train" | "Bus"> = {
            car: "Car",
            metro: "Local train",
            train: "Local train",
            bus: "Bus",
          };
          setTrips(
            apiTrips.map((t, i) => ({
              id: t._id,
              from: t.origin,
              to: t.destination,
              travelTime: `${t.duration} min`,
              distance: "—",
              transportType: modeMap[t.mode] ?? "Car",
              lastUsed: i === 0 ? "Today" : i === 1 ? "Yesterday" : "Recently",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-normal text-[#111111]">
            Trip History
          </h1>
          <p className="mt-1 text-[#6B6B6B] text-sm">
            View and analyze your previously searched or saved travel routes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-[#E5E5E5] bg-white px-3 py-2 text-sm text-[#111111]"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-[#E5E5E5] bg-white px-3 py-2 text-sm text-[#111111]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Saved Trips + Trip Details (2-column) */}
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6">
          <SavedTrips
            selectedTrip={selectedTrip}
            onSelectTrip={setSelectedTrip}
            filter={filter}
            sort={sort}
          />
        </aside>
        <div>
          <TripDetails trip={selectedTrip} />
        </div>
      </div>

      {/* 3. Travel Analytics */}
      <TravelAnalytics />

      {/* 4. Recent Trips Timeline */}
      <TravelTimeline trips={trips} onSelectTrip={setSelectedTrip} />

      {/* 5. Smart Insights */}
      <SmartInsights />

      {/* 6. Quick Actions */}
      <QuickActions />
    </div>
  );
}
