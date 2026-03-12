"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { RouteOption } from "./types";

const MUMBAI_CENTER: [number, number] = [19.076, 72.8777];
const FALLBACK_ROUTE: [number, number][] = [
  [19.1197, 72.8397], // Andheri
  [19.115, 72.842],
  [19.108, 72.848],
  [19.095, 72.855],
  [19.08, 72.862],
  [19.0596, 72.8656], // BKC/Bandra area
];

// Fix Leaflet default icon in Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletMapProps {
  source?: string;
  destination?: string;
  selectedRoute: RouteOption | null;
}

export default function LeafletMap({
  source,
  destination,
  selectedRoute,
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create map on mount
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const map = L.map(containerRef.current, {
      center: MUMBAI_CENTER,
      zoom: 13,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers and route when data changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const origin = selectedRoute?.originCoords;
    const dest = selectedRoute?.destCoords;
    let polyline = selectedRoute?.polyline ?? [];
    if (polyline.length === 0 && selectedRoute && (source || destination)) {
      polyline = FALLBACK_ROUTE;
    }
    const hasOrigin =
      origin ??
      (polyline.length > 0 ? { lat: polyline[0][0], lng: polyline[0][1] } : null);
    const hasDest =
      dest ??
      (polyline.length > 0
        ? { lat: polyline[polyline.length - 1][0], lng: polyline[polyline.length - 1][1] }
        : null);

    // Clear markers and polyline
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    const bounds: L.LatLngExpression[] = [];

    if (hasOrigin) {
      const pos: [number, number] = [hasOrigin.lat, hasOrigin.lng];
      L.marker(pos).addTo(map).bindPopup(source || "Origin");
      bounds.push(pos);
    }
    if (hasDest) {
      const pos: [number, number] = [hasDest.lat, hasDest.lng];
      L.marker(pos).addTo(map).bindPopup(destination || "Destination");
      bounds.push(pos);
    }
    if (polyline.length >= 2) {
      const latLngs = polyline.map((p) => [p[0], p[1]] as [number, number]);
      L.polyline(latLngs, {
        color: "#22C55E",
        weight: 5,
        opacity: 0.9,
      }).addTo(map);
      bounds.push(...latLngs);
    }
    if (bounds.length >= 2) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [30, 30], maxZoom: 15 });
    }
  }, [source, destination, selectedRoute]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full min-h-[400px] rounded-lg"
      style={{ minHeight: 400 }}
    />
  );
}
