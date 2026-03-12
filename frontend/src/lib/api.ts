/**
 * TransitWin API client - connects frontend to FastAPI backend
 */

const API_BASE =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000")
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const API_URL = API_BASE;

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("transitwin_token");
}

function getHeaders(includeAuth = true): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const token = includeAuth ? getToken() : null;
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// ----- Auth -----
export interface AuthUser {
  email: string;
  full_name?: string;
  role?: string;
  _id?: string;
}

export async function apiSignUp(data: {
  email: string;
  password: string;
  full_name?: string;
}): Promise<{ user: AuthUser; error?: string }> {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    return { user: null as unknown as AuthUser, error: json.detail || "Signup failed" };
  }
  return { user: json };
}

export async function apiLogin(
  email: string,
  password: string
): Promise<{ access_token: string; token_type: string; error?: string }> {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: form.toString(),
  });
  const json = await res.json();
  if (!res.ok) {
    return { access_token: "", token_type: "bearer", error: json.detail || "Login failed" };
  }
  return json;
}

// ----- Transit / Routes -----
export interface RouteSegment {
  mode: string;
  coordinates: number[][];
  distance_m?: number;
  duration_s?: number;
  stops?: { name: string; lat: number; lon: number }[];
}

export interface ApiRoute {
  id: string;
  title: string;
  modes: string[];
  duration_min: number;
  cost_inr: number;
  transfers?: number;
  walking_distance_m?: number;
  segments: RouteSegment[];
  tags?: string[];
}

export interface SmartRouteResponse {
  origin: { lat: number; lon: number; display_name?: string };
  destination: { lat: number; lon: number; display_name?: string };
  routes: ApiRoute[];
}

export async function apiGeocode(q: string): Promise<{
  lat: number;
  lon: number;
  display_name?: string;
}> {
  const res = await fetch(
    `${API_BASE}/transit/geocode?${new URLSearchParams({ q })}`
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Geocoding failed");
  }
  return res.json();
}

export async function apiSmartRouteText(
  origin: string,
  destination: string
): Promise<SmartRouteResponse> {
  const params = new URLSearchParams({ origin, destination });
  const res = await fetch(`${API_BASE}/transit/smart-route-text?${params}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Route search failed");
  }
  return res.json();
}

export async function apiSmartRouteCoords(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number
): Promise<SmartRouteResponse> {
  const params = new URLSearchParams({
    origin_lat: String(originLat),
    origin_lng: String(originLng),
    dest_lat: String(destLat),
    dest_lng: String(destLng),
  });
  const res = await fetch(`${API_BASE}/transit/smart-route?${params}`);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Route search failed");
  }
  return res.json();
}

// ----- Trips -----
export interface ApiTrip {
  _id: string;
  user_id: string;
  origin: string;
  destination: string;
  mode: string;
  duration: number;
  status?: string;
  timestamp?: string;
}

export async function apiGetTrips(): Promise<ApiTrip[]> {
  const res = await fetch(`${API_BASE}/trips/`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    if (res.status === 401) return [];
    throw new Error("Failed to fetch trips");
  }
  return res.json();
}

export async function apiCreateTrip(data: {
  origin: string;
  destination: string;
  mode: string;
  duration: number;
  status?: string;
}): Promise<ApiTrip> {
  const res = await fetch(`${API_BASE}/trips/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to create trip");
  }
  return res.json();
}

// ----- Stats -----
export interface ApiStats {
  total_trips: number;
  co2_saved: number;
  efficiency_score: number;
}

export async function apiGetStats(): Promise<ApiStats | null> {
  const res = await fetch(`${API_BASE}/stats/`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    if (res.status === 401) return null;
    throw new Error("Failed to fetch stats");
  }
  return res.json();
}

// ----- Notifications -----
export interface ApiNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  timestamp: string;
}

export async function apiGetNotifications(): Promise<ApiNotification[]> {
  const res = await fetch(`${API_BASE}/notifications/`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    if (res.status === 401) return [];
    throw new Error("Failed to fetch notifications");
  }
  return res.json();
}
