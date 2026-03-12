"use client";

import Map, {
  Source,
  Layer,
  Marker,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import type { RouteOption } from "./types";

const MUMBAI_CENTER = { lng: 72.8777, lat: 19.076 };
const ANDHERI = { lng: 72.8397, lat: 19.1197 };
const BKC = { lng: 72.8656, lat: 19.0596 };

const routeGeoJSON = {
  type: "Feature" as const,
  properties: {},
  geometry: {
    type: "LineString" as const,
    coordinates: [
      [72.8397, 19.1197],
      [72.842, 19.115],
      [72.848, 19.108],
      [72.855, 19.095],
      [72.862, 19.08],
      [72.8656, 19.0596],
    ],
  },
};

interface MapboxMapProps {
  source?: string;
  destination?: string;
  selectedRoute: RouteOption | null;
}

export default function MapboxMap({
  source,
  destination,
  selectedRoute,
}: MapboxMapProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const hasRoute = !!selectedRoute;

  if (!token) {
    return (
      <div className="relative h-full min-h-[400px] w-full bg-[#FAFAFA]">
        <MapPlaceholder
          source={source}
          destination={destination}
          selectedRoute={selectedRoute}
        />
        <div className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs text-[#6B6B6B]">
          Add NEXT_PUBLIC_MAPBOX_TOKEN for live map
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: MUMBAI_CENTER.lng,
          latitude: MUMBAI_CENTER.lat,
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%", minHeight: 400 }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <Marker longitude={ANDHERI.lng} latitude={ANDHERI.lat} color="#22C55E" />
        <Marker longitude={BKC.lng} latitude={BKC.lat} color="#111111" />
        {hasRoute && (
          <Source id="route" type="geojson" data={routeGeoJSON}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#22C55E",
                "line-width": 4,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}

function MapPlaceholder({
  source,
  destination,
  selectedRoute,
}: MapboxMapProps) {
  return (
    <div className="relative h-full min-h-[400px] w-full">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="400" fill="#F5F5F5" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 50}
            x2="400"
            y2={i * 50}
            stroke="#E5E5E5"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="400"
            stroke="#E5E5E5"
            strokeWidth="0.5"
          />
        ))}
        {selectedRoute && (
          <path
            d="M 50 320 Q 150 250 200 200 T 350 80"
            fill="none"
            stroke="#22C55E"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )}
        <circle cx="50" cy="320" r="8" fill="#22C55E" />
        <circle cx="50" cy="320" r="4" fill="white" />
        <circle cx="350" cy="80" r="8" fill="#111111" />
        <circle cx="350" cy="80" r="4" fill="white" />
      </svg>
      {(source || destination) && (
        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-sm text-[#111111]">
          {source || "Source"} → {destination || "Destination"}
        </div>
      )}
    </div>
  );
}
