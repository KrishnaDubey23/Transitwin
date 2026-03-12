export interface RouteLeg {
  mode: "walk" | "metro" | "bus" | "car";
  from: string;
  to: string;
  duration: number;
  details?: string;
}

export type RouteTag = "fastest" | "cheapest" | "balanced";

export interface RouteOption {
  id: string;
  type: string;
  legs: RouteLeg[];
  totalTime: number;
  totalDistance: number;
  estimatedCost: number;
  stops?: string[];
  tag?: RouteTag;
  score: number;
  rank?: number;
  /** Route polyline for map display: [lng, lat][] from backend/ORS */
  polyline?: [number, number][];
  /** Origin/destination coords from backend geocoding */
  originCoords?: { lat: number; lng: number };
  destCoords?: { lat: number; lng: number };
}
