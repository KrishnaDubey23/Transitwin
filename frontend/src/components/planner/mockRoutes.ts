import type { RouteOption } from "./types";

const MOCK_POLYLINE: [number, number][] = [
  [19.1197, 72.8397], // Andheri
  [19.115, 72.842],
  [19.108, 72.848],
  [19.095, 72.855],
  [19.08, 72.862],
  [19.0596, 72.8656], // BKC
];

export const MOCK_ROUTES: RouteOption[] = [
  {
    id: "route-1",
    type: "walk-metro-walk",
    legs: [
      { mode: "walk", from: "Andheri Station", to: "Local train Entrance", duration: 5 },
      { mode: "metro", from: "Andheri", to: "BKC", duration: 10, details: "Line 1" },
      { mode: "walk", from: "BKC Station", to: "Office", duration: 3 },
    ],
    totalTime: 18,
    totalDistance: 8.5,
    estimatedCost: 40,
    stops: ["Andheri Local train Station", "Western Express Highway", "BKC Local train Station"],
    tag: "fastest",
    score: 0.82,
    rank: 1,
    polyline: MOCK_POLYLINE,
    originCoords: { lat: 19.1197, lng: 72.8397 },
    destCoords: { lat: 19.0596, lng: 72.8656 },
  },
  {
    id: "route-2",
    type: "bus-walk",
    legs: [
      { mode: "bus", from: "Andheri", to: "BKC", duration: 19, details: "Route 321" },
      { mode: "walk", from: "BKC Bus Stop", to: "Office", duration: 3 },
    ],
    totalTime: 22,
    totalDistance: 9,
    estimatedCost: 30,
    stops: ["Andheri Bus Stand", "S.V. Road", "BKC Bus Stop"],
    tag: "cheapest",
    score: 0.75,
    rank: 2,
    polyline: MOCK_POLYLINE,
    originCoords: { lat: 19.1197, lng: 72.8397 },
    destCoords: { lat: 19.0596, lng: 72.8656 },
  },
  {
    id: "route-3",
    type: "car",
    legs: [
      { mode: "car", from: "Andheri", to: "BKC", duration: 25 },
    ],
    totalTime: 25,
    totalDistance: 10,
    estimatedCost: 120,
    tag: "balanced",
    score: 0.55,
    rank: 3,
    polyline: MOCK_POLYLINE,
    originCoords: { lat: 19.1197, lng: 72.8397 },
    destCoords: { lat: 19.0596, lng: 72.8656 },
  },
];
