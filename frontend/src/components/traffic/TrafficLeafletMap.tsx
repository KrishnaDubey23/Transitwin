"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type ViewMode = "heatmap" | "density" | "peak";

const MUMBAI_CENTER: [number, number] = [19.076, 72.8777];

const TRAFFIC_SEGMENTS: { coords: [number, number][]; level: "green" | "yellow" | "red" }[] = [
  { coords: [[19.13, 72.84], [19.08, 72.84], [19.06, 72.83]], level: "green" },
  { coords: [[19.06, 72.83], [19.04, 72.85], [19.02, 72.86]], level: "yellow" },
  { coords: [[19.08, 72.84], [19.07, 72.86], [19.06, 72.88]], level: "red" },
  { coords: [[19.10, 72.82], [19.08, 72.83], [19.06, 72.84]], level: "green" },
  { coords: [[19.05, 72.87], [19.04, 72.88], [19.02, 72.90]], level: "yellow" },
];

const TRAFFIC_ZONES = [
  { lat: 19.08, lng: 72.85, radius: 1.5, level: "green" as const },
  { lat: 19.06, lng: 72.86, radius: 1.2, level: "yellow" as const },
  { lat: 19.04, lng: 72.88, radius: 1.0, level: "red" as const },
  { lat: 19.10, lng: 72.84, radius: 1.3, level: "green" as const },
  { lat: 19.02, lng: 72.87, radius: 1.1, level: "yellow" as const },
];

const COLORS = { green: "#22C55E", yellow: "#EAB308", red: "#EF4444" };

function getOpacity(viewMode: ViewMode, level: string): number {
  if (viewMode === "peak") return level === "red" ? 0.65 : 0.4;
  if (viewMode === "density") return 0.5;
  return 0.35;
}

interface TrafficLeafletMapProps {
  viewMode: ViewMode;
}

export function TrafficLeafletMap({ viewMode }: TrafficLeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = document.getElementById("traffic-map-container");
    if (!container || mapRef.current) return;

    const map = L.map(container, {
      center: MUMBAI_CENTER,
      zoom: 12,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    L.control.zoom({ position: "topright" }).addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove previous overlays
    layersRef.current.forEach((layer) => map.removeLayer(layer));
    layersRef.current = [];

    const weight = viewMode === "density" ? 8 : 6;

    // Road segments (polylines)
    TRAFFIC_SEGMENTS.forEach((seg) => {
      const opacity = getOpacity(viewMode, seg.level);
      const polyline = L.polyline(seg.coords as [number, number][], {
        color: COLORS[seg.level],
        weight,
        opacity: 0.9,
      }).addTo(map);
      layersRef.current.push(polyline);
    });

    // Heatmap/density zones (circles)
    const radiusScale = viewMode === "peak" ? 1.2 : viewMode === "density" ? 1.1 : 1;
    TRAFFIC_ZONES.forEach((zone) => {
      const opacity = getOpacity(viewMode, zone.level);
      const circle = L.circle([zone.lat, zone.lng], {
        radius: zone.radius * 1000 * radiusScale,
        color: COLORS[zone.level],
        fillColor: COLORS[zone.level],
        fillOpacity: opacity,
        weight: 2,
      }).addTo(map);
      layersRef.current.push(circle);
    });
  }, [viewMode]);

  return (
    <div
      id="traffic-map-container"
      className="w-full h-[calc(100vh-10rem)] min-h-[400px]"
      style={{ minHeight: 400 }}
    />
  );
}
