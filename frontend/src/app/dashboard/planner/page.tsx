"use client";

import { useState } from "react";
import Link from "next/link";
import { RouteSearchSection } from "@/components/planner/RouteSearchSection";
import { RouteCard } from "@/components/planner/RouteCard";
import { RouteBreakdownPanel } from "@/components/planner/RouteBreakdownPanel";
import { TransitStopsList } from "@/components/planner/TransitStopsList";
import { RouteSummaryCard } from "@/components/planner/RouteSummaryCard";
import { RouteMetricsPanel } from "@/components/planner/RouteMetricsPanel";
import { CostPanel } from "@/components/planner/CostPanel";
import { PlannerMapView } from "@/components/planner/PlannerMapView";
import { MOCK_ROUTES } from "@/components/planner/mockRoutes";
import { setPendingBooking } from "@/lib/bookings";
import { getSupportingServices } from "@/lib/supportingServices";
import { SupportingServicesPanel } from "@/components/planner/SupportingServicesPanel";
import { apiSmartRouteText } from "@/lib/api";
import { transformSmartRouteResponse } from "@/lib/routeTransform";
import type { RouteOption } from "@/components/planner/types";

export default function PlannerPage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (
    newSource: string,
    newDestination: string,
    _modes: string[]
  ) => {
    setSource(newSource);
    setDestination(newDestination);
    setSearchError(null);
    setIsLoading(true);

    try {
      const data = await apiSmartRouteText(newSource, newDestination);
      const transformed = transformSmartRouteResponse(data);
      const sorted = [...transformed].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
      setRoutes(sorted);
      setSelectedRoute(sorted[0] ?? null);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : "Route search failed");
      const sorted = [...MOCK_ROUTES].sort((a, b) => b.score - a.score);
      setRoutes(sorted);
      setSelectedRoute(sorted[0]);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-normal text-[#111111]">
          Smart Route Planner
        </h1>
        <p className="mt-1 text-[#6B6B6B] text-sm">
          Multi-transport route integration – search and compare routes
        </p>
      </div>

      {/* Top: Route Search + Transport Filters */}
      <RouteSearchSection onSearch={handleSearch} isLoading={isLoading} />
      {searchError && (
        <p className="text-sm text-amber-600 bg-amber-50 rounded-lg px-4 py-2">
          Using mock data: {searchError}
        </p>
      )}

      {/* Route Comparison Section */}
      <div className="border-t border-[#E5E5E5] pt-6">
        <h2 className="font-semibold text-[#111111] mb-4">
          Route Comparison Section
        </h2>
      </div>

      {/* Main layout: Left Panel | Right Map */}
      <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
        {/* Left: Route Comparison Cards */}
        <div className="space-y-6">
          {hasSearched && (
            <RouteMetricsPanel routes={routes} />
          )}
          <div className="rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-sm">
            <h2 className="font-semibold text-[#111111] mb-4">
              Route Comparison Cards
            </h2>
            {!hasSearched ? (
              <p className="text-[#6B6B6B] text-sm py-8 text-center">
                Enter source and destination, then click Find Smart Route
              </p>
            ) : (
              <div className="space-y-3">
                {routes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    isSelected={selectedRoute?.id === route.id}
                    onSelect={() => setSelectedRoute(route)}
                  />
                ))}
              </div>
            )}
          </div>

          {selectedRoute && (
            <>
              <RouteBreakdownPanel route={selectedRoute} />
              <RouteSummaryCard route={selectedRoute} />
              <SupportingServicesPanel
                services={getSupportingServices(selectedRoute, source, destination)}
                onBook={() => {
                  setPendingBooking(selectedRoute, source, destination);
                  window.location.href = "/dashboard/planner/services";
                }}
              />
              <Link
                href="/dashboard/planner/services"
                onClick={() => {
                  setPendingBooking(selectedRoute, source, destination);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#22C55E] py-3.5 text-sm font-medium text-white hover:bg-[#1ea34f] transition-colors"
              >
                Book Supporting Services
              </Link>
            </>
          )}
          {hasSearched && routes.length > 0 && (
            <CostPanel routes={routes} />
          )}
        </div>

        {/* Right: Interactive Map + Transit Stops */}
        <div className="space-y-6">
          <div className="rounded-xl border border-[#E5E5E5] bg-white overflow-hidden shadow-sm">
            <h2 className="font-semibold text-[#111111] px-4 py-3 border-b border-[#E5E5E5]">
              Map Visualization
            </h2>
            <PlannerMapView
              source={source}
              destination={destination}
              selectedRoute={selectedRoute}
            />
          </div>

          {selectedRoute?.stops && selectedRoute.stops.length > 0 && (
            <TransitStopsList
              stops={selectedRoute.stops}
              routeLabel={source && destination ? `${source} → ${destination}` : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}
