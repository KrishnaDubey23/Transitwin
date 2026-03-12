import type { ApiRoute, SmartRouteResponse } from "@/lib/api";
import type { RouteOption, RouteLeg } from "@/components/planner/types";

function normalizeMode(mode: string): "walk" | "metro" | "bus" | "car" {
  const m = (mode || "").toLowerCase();
  if (m === "walking") return "walk";
  if (m === "train" || m === "metro") return "metro";
  if (m === "bus") return "bus";
  if (m === "car" || m === "driving-car") return "car";
  return "walk";
}

function getLegFromTo(
  segment: { mode: string; coordinates?: number[][]; stops?: { name: string }[] }
): { from: string; to: string } {
  if (segment.stops && segment.stops.length >= 2) {
    return {
      from: segment.stops[0].name,
      to: segment.stops[segment.stops.length - 1].name,
    };
  }
  const coords = segment.coordinates || [];
  if (coords.length >= 2) {
    return {
      from: `Point (${coords[0][0]?.toFixed(2)}, ${coords[0][1]?.toFixed(2)})`,
      to: `Point (${coords[coords.length - 1][0]?.toFixed(2)}, ${coords[coords.length - 1][1]?.toFixed(2)})`,
    };
  }
  return { from: "Origin", to: "Destination" };
}

export function apiRouteToRouteOption(
  apiRoute: ApiRoute,
  originName: string,
  destName: string,
  index: number
): RouteOption {
  const legs: RouteLeg[] = (apiRoute.segments || []).map((seg) => {
    const { from, to } = getLegFromTo(seg);
    const duration = Math.round((seg.duration_s || 0) / 60) || 1;
    return {
      mode: normalizeMode(seg.mode),
      from,
      to,
      duration,
      details: seg.stops ? `${seg.stops.length} stops` : undefined,
    };
  });

  // If no legs from segments, create a single leg from modes
  if (legs.length === 0 && apiRoute.modes?.length) {
    legs.push({
      mode: normalizeMode(apiRoute.modes[0]),
      from: originName,
      to: destName,
      duration: apiRoute.duration_min || 1,
    });
  }

  const totalDistanceKm =
    (apiRoute.segments || []).reduce(
      (sum, s) => sum + (s.distance_m || 0) / 1000,
      0
    ) || 1;

  // Flatten segment coordinates for map polyline (backend/ORS: [lat,lon] -> Leaflet [lat,lng])
  const polyline: [number, number][] = [];
  for (const seg of apiRoute.segments || []) {
    const coords = seg.coordinates || [];
    for (const c of coords) {
      if (c.length >= 2) polyline.push([c[0], c[1]]);
    }
  }

  const tags = apiRoute.tags || [];
  const tag = (tags.includes("fastest")
    ? "fastest"
    : tags.includes("cheapest")
      ? "cheapest"
      : "balanced") as RouteOption["tag"];

  const typeStr = (apiRoute.modes || [])
    .map((m) => normalizeMode(m))
    .join("-");

  return {
    id: apiRoute.id || `route-${index}`,
    type: typeStr || "car",
    legs,
    totalTime: apiRoute.duration_min || 0,
    totalDistance: Math.round(totalDistanceKm * 10) / 10,
    estimatedCost: apiRoute.cost_inr || 0,
    stops: (apiRoute.segments || [])
      .flatMap((s) => s.stops || [])
      .map((s) => s.name),
    tag,
    score: tags.includes("best") ? 0.85 : 0.6,
    rank: index + 1,
    polyline: polyline.length > 0 ? polyline : undefined,
  };
}

export function transformSmartRouteResponse(
  data: SmartRouteResponse
): RouteOption[] {
  const originName = data.origin?.display_name || "Origin";
  const destName = data.destination?.display_name || "Destination";
  const originCoords =
    data.origin?.lat != null && data.origin?.lon != null
      ? { lat: data.origin.lat, lng: data.origin.lon }
      : undefined;
  const destCoords =
    data.destination?.lat != null && data.destination?.lon != null
      ? { lat: data.destination.lat, lng: data.destination.lon }
      : undefined;

  return (data.routes || []).map((r, i) => {
    const option = apiRouteToRouteOption(r, originName, destName, i);
    option.originCoords = originCoords;
    option.destCoords = destCoords;
    return option;
  });
}
