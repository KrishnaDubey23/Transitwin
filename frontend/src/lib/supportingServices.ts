import type { RouteOption } from "@/components/planner/types";

export type SupportingServiceType =
  | "cab"
  | "auto"
  | "bike_taxi"
  | "e_scooter"
  | "bike_rental"
  | "parking"
  | "metro_redirect"
  | "bus_redirect"
  | "travel_pass";

export interface SupportingService {
  id: string;
  type: SupportingServiceType;
  label: string;
  description: string;
  price: string;
  priceNote?: string;
  action: "book" | "reserve" | "rent" | "redirect";
  ctaLabel: string;
  segment: "first_mile" | "last_mile" | "parking" | "transit" | "pass";
  from?: string;
  to?: string;
}

function getFirstLegNonWalk(route: RouteOption) {
  const first = route.legs[0];
  return first?.mode === "walk" ? route.legs[1] : first;
}

function getLastLegNonWalk(route: RouteOption) {
  const legs = route.legs;
  const last = legs[legs.length - 1];
  return last?.mode === "walk" ? legs[legs.length - 2] : last;
}

function hasWalkAtStart(route: RouteOption) {
  return route.legs[0]?.mode === "walk";
}

function hasWalkAtEnd(route: RouteOption) {
  return route.legs[route.legs.length - 1]?.mode === "walk";
}

function hasCar(route: RouteOption) {
  return route.legs.some((l) => l.mode === "car");
}

function hasMetro(route: RouteOption) {
  return route.legs.some((l) => l.mode === "metro");
}

function hasBus(route: RouteOption) {
  return route.legs.some((l) => l.mode === "bus");
}

export function getSupportingServices(
  route: RouteOption,
  source: string,
  destination: string
): SupportingService[] {
  const services: SupportingService[] = [];
  let idx = 0;

  const firstNonWalk = getFirstLegNonWalk(route);
  const lastNonWalk = getLastLegNonWalk(route);
  const walkStart = hasWalkAtStart(route);
  const walkEnd = hasWalkAtEnd(route);

  // First-mile: Cab, Auto, Bike taxi (if walk at start)
  if (walkStart && firstNonWalk) {
    const to = firstNonWalk.from;
    services.push({
      id: `first-cab-${idx++}`,
      type: "cab",
      label: "Book Cab to Station",
      description: `Ride to ${to}`,
      price: "₹80–150",
      priceNote: "Estimated",
      action: "book",
      ctaLabel: "Book Cab",
      segment: "first_mile",
      from: source,
      to,
    });
    services.push({
      id: `first-auto-${idx++}`,
      type: "auto",
      label: "Book Auto",
      description: `Auto to ${to}`,
      price: "₹40–80",
      priceNote: "Estimated",
      action: "book",
      ctaLabel: "Book Auto",
      segment: "first_mile",
      from: source,
      to,
    });
    services.push({
      id: `first-bike-${idx++}`,
      type: "bike_taxi",
      label: "Book Bike Taxi",
      description: `Quick ride to ${to}`,
      price: "₹30–60",
      priceNote: "Estimated",
      action: "book",
      ctaLabel: "Book Bike Taxi",
      segment: "first_mile",
      from: source,
      to,
    });
  }

  // Parking (if car in route)
  if (hasCar(route)) {
    const parkingAt = lastNonWalk?.to ?? destination;
    services.push({
      id: `parking-${idx++}`,
      type: "parking",
      label: `Reserve Parking at ${parkingAt}`,
      description: "Prepay and skip the search",
      price: "₹30/hour",
      priceNote: "Prepay",
      action: "reserve",
      ctaLabel: "Reserve Slot",
      segment: "parking",
      from: parkingAt,
    });
  }

  // Transit redirects
  if (hasMetro(route)) {
    services.push({
      id: `metro-redirect-${idx++}`,
      type: "metro_redirect",
      label: "Local Train Ticket",
      description: "Book via official app",
      price: "—",
      action: "redirect",
      ctaLabel: "Open Official App",
      segment: "transit",
    });
  }
  if (hasBus(route)) {
    services.push({
      id: `bus-redirect-${idx++}`,
      type: "bus_redirect",
      label: "Bus Ticket",
      description: "Book via official platform",
      price: "—",
      action: "redirect",
      ctaLabel: "Open Official App",
      segment: "transit",
    });
  }

  // Last-mile: Cab, Auto, Bike taxi, E-scooter (if walk at end)
  if (walkEnd && lastNonWalk) {
    const from = lastNonWalk.to;
    services.push({
      id: `last-cab-${idx++}`,
      type: "cab",
      label: "Book Cab from Station",
      description: `Ride from ${from} to ${destination}`,
      price: "₹80–150",
      priceNote: "Estimated",
      action: "book",
      ctaLabel: "Book Cab",
      segment: "last_mile",
      from,
      to: destination,
    });
    services.push({
      id: `last-auto-${idx++}`,
      type: "auto",
      label: "Book Auto",
      description: `Auto from ${from} to ${destination}`,
      price: "₹40–80",
      priceNote: "Estimated",
      action: "book",
      ctaLabel: "Book Auto",
      segment: "last_mile",
      from,
      to: destination,
    });
    services.push({
      id: `last-e-scooter-${idx++}`,
      type: "e_scooter",
      label: "Rent E-Scooter",
      description: `E-scooter near ${from}`,
      price: "₹10/min",
      priceNote: "Unlock & ride",
      action: "rent",
      ctaLabel: "Rent Now",
      segment: "last_mile",
      from,
      to: destination,
    });
  }

  // Travel pass (always offer if multi-leg)
  if (route.legs.length > 1) {
    services.push({
      id: `pass-${idx++}`,
      type: "travel_pass",
      label: "Monthly Smart Commute Pass",
      description: "Unlimited travel across modes",
      price: "₹1,500/month",
      priceNote: "Conceptual",
      action: "book",
      ctaLabel: "Learn More",
      segment: "pass",
    });
  }

  return services;
}

export const REDIRECT_URLS: Record<string, string> = {
  metro_redirect: "https://m-indicator.com",
  bus_redirect: "https://www.bestundertaking.com",
};
