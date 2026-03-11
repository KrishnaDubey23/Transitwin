"use client";

import { useState } from "react";
import { SavedTrips, type Trip } from "@/components/trips/SavedTrips";
import { TripInformation } from "@/components/trips/TripInformation";
import { MapReplay } from "@/components/trips/MapReplay";
import { AnalyticsSummary } from "@/components/trips/AnalyticsSummary";

export default function TripsPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-dm-serif)] text-2xl font-normal text-[#111111]">
          Trip History
        </h1>
        <p className="mt-1 text-[#6B6B6B] text-sm">
          View previously searched or saved routes
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left column - Saved trips + Trip information */}
        <aside className="space-y-6">
          <SavedTrips
            selectedTrip={selectedTrip}
            onSelectTrip={setSelectedTrip}
          />
          <TripInformation trip={selectedTrip} />
        </aside>

        {/* Right column - Map replay + Analytics */}
        <div className="space-y-6">
          <MapReplay trip={selectedTrip} />
          <AnalyticsSummary />
        </div>
      </div>
    </div>
  );
}
