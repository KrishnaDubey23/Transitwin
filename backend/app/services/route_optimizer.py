import math
import os
import csv
import zipfile
from dataclasses import dataclass
from typing import Any, Dict, List, Literal, Optional, Tuple

import httpx
from ..config import settings
from .station_service import station_service


LatLng = Tuple[float, float]  # (lat, lon)


class RouteOptimizerError(Exception):
    pass


class GeocodeError(RouteOptimizerError):
    pass


class ORSError(RouteOptimizerError):
    pass


class GTFSNotConfigured(RouteOptimizerError):
    pass


def _haversine_m(a: LatLng, b: LatLng) -> float:
    lat1, lon1 = a
    lat2, lon2 = b
    r = 6371000.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    la1 = math.radians(lat1)
    la2 = math.radians(lat2)
    s = math.sin(dlat / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin(dlon / 2) ** 2
    return 2 * r * math.asin(min(1.0, math.sqrt(s)))


async def geocode_nominatim(query: str) -> Dict[str, Any]:
    q = (query or "").strip()
    if not q:
        raise GeocodeError("Please enter a location.")

    # Bias toward Mumbai/India to avoid far-away matches.
    params = {
        "q": q,
        "format": "json",
        "limit": 5,
        "countrycodes": "in",
        "viewbox": "72.5,19.5,73.2,18.8",  # lon1,lat1,lon2,lat2 (approx Mumbai bbox)
    }
    timeout = httpx.Timeout(8.0)
    headers = {
        "Accept": "application/json",
        "Accept-Language": "en",
        # Nominatim requires a valid identifying User-Agent.
        "User-Agent": "TransitWin/1.0 (route-planner)",
    }

    async with httpx.AsyncClient(timeout=timeout, headers=headers) as client:
        r = await client.get("https://nominatim.openstreetmap.org/search", params=params)
        # If we are being rate-limited by Nominatim, fall back to OpenRouteService geocoder.
        if r.status_code == 429:
            ors_key = (
                settings.ORS_API_KEY
                or os.environ.get("ORS_API_KEY")
                or os.environ.get("NEXT_PUBLIC_OPENROUTESERVICE_API_KEY")
                or ""
            )
            if ors_key:
                return await geocode_ors(q, ors_key)
            raise GeocodeError(
                "Location search is temporarily rate-limited. Please wait a bit and try again."
            )
        if r.status_code != 200:
            raise GeocodeError("Location search failed. Please try again.")
        data = r.json()
        if not isinstance(data, list) or len(data) == 0:
            raise GeocodeError("Location not found. Try a different name or address.")

        mumbai_center: LatLng = (19.076, 72.8777)

        best = None
        best_dist = None
        for item in data:
            try:
                lat = float(item.get("lat"))
                lon = float(item.get("lon"))
            except Exception:
                continue
            d = _haversine_m(mumbai_center, (lat, lon))
            if best is None or (best_dist is not None and d < best_dist):
                best = item
                best_dist = d

        if best is None:
            raise GeocodeError("Invalid location data received.")

        return {
            "lat": float(best["lat"]),
            "lon": float(best["lon"]),
            "display_name": best.get("display_name") or q,
        }


async def geocode_ors(query: str, api_key: str) -> Dict[str, Any]:
    """
    Fallback geocoder using OpenRouteService when Nominatim is rate-limited.
    """
    params = {
        "api_key": api_key,
        "text": query,
        "size": 5,
        "boundary.country": "IN",
    }
    timeout = httpx.Timeout(8.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        r = await client.get("https://api.openrouteservice.org/geocode/search", params=params)
        if r.status_code != 200:
            raise GeocodeError("Location search failed. Please try again.")
        data = r.json()
        features = data.get("features") or []
        if not features:
            raise GeocodeError("Location not found. Try a different name or address.")
        feat = features[0]
        coords = feat.get("geometry", {}).get("coordinates") or []
        if len(coords) < 2:
            raise GeocodeError("Location search failed. Please try again.")
        lon, lat = coords[0], coords[1]
        return {
            "lat": float(lat),
            "lon": float(lon),
            "display_name": (feat.get("properties") or {}).get("label") or query,
        }


async def get_ors_route(
    origin: LatLng,
    destination: LatLng,
    profile: Literal["driving-car", "cycling-regular", "foot-walking"],
    api_key: str,
) -> Dict[str, Any]:
    if not api_key:
        raise ORSError("Routing is not configured on the backend (missing ORS_API_KEY).")

    url = f"https://api.openrouteservice.org/v2/directions/{profile}/geojson"
    body = {"coordinates": [[origin[1], origin[0]], [destination[1], destination[0]]]}  # [lon,lat]

    timeout = httpx.Timeout(12.0)
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/geo+json,application/json",
        "Authorization": api_key,
    }

    async with httpx.AsyncClient(timeout=timeout, headers=headers) as client:
        r = await client.post(url, json=body)
        if r.status_code == 401:
            raise ORSError("Invalid routing API key.")
        if r.status_code == 403:
            raise ORSError("Routing request was forbidden. Check that your ORS key is active for Directions.")
        if r.status_code == 429:
            raise ORSError("Too many routing requests. Please try again later.")
        if r.status_code != 200:
            text = r.text or ""
            raise ORSError(f"Route request failed. ({text[:160]})")

        data = r.json()
        feature = (data.get("features") or [None])[0]
        if not feature or not feature.get("geometry", {}).get("coordinates"):
            raise ORSError("No route found between these points.")

        coords = feature["geometry"]["coordinates"]  # [[lon,lat], ...]
        polyline: List[List[float]] = [[c[1], c[0]] for c in coords]  # [[lat,lon], ...]
        summary = feature.get("properties", {}).get("summary", {}) or {}
        return {
            "polyline": polyline,
            "distance_m": float(summary.get("distance") or 0.0),
            "duration_s": float(summary.get("duration") or 0.0),
        }


# -----------------------
# GTFS (minimal loader)
# -----------------------

@dataclass
class Stop:
    stop_id: str
    name: str
    lat: float
    lon: float


def _load_gtfs_stops_from_zip(zip_path: str) -> List[Stop]:
    stops: List[Stop] = []
    with zipfile.ZipFile(zip_path) as z:
        if "stops.txt" not in z.namelist():
            return stops
        with z.open("stops.txt") as f:
            text = (line.decode("utf-8", errors="ignore") for line in f)
            reader = csv.DictReader(text)
            for row in reader:
                try:
                    stops.append(
                        Stop(
                            stop_id=row.get("stop_id") or "",
                            name=row.get("stop_name") or "Stop",
                            lat=float(row.get("stop_lat") or 0),
                            lon=float(row.get("stop_lon") or 0),
                        )
                    )
                except Exception:
                    continue
    return [s for s in stops if s.stop_id and s.lat and s.lon]


def _nearest_stop(stops: List[Stop], point: LatLng) -> Optional[Stop]:
    best: Optional[Stop] = None
    best_d: Optional[float] = None
    for s in stops:
        d = _haversine_m(point, (s.lat, s.lon))
        if best is None or (best_d is not None and d < best_d):
            best = s
            best_d = d
    return best


def _estimate_transit_duration_s(mode: str, distance_m: float) -> float:
    # Simple, explainable heuristics; can be replaced by schedule-based GTFS routing later.
    speeds_mps = {
        "metro": 10.0,   # ~36 km/h
        "train": 12.0,   # ~43 km/h
        "bus": 6.0,      # ~22 km/h
    }
    base_wait_s = {
        "metro": 6 * 60,
        "train": 8 * 60,
        "bus": 7 * 60,
    }
    v = speeds_mps.get(mode, 8.0)
    wait = base_wait_s.get(mode, 6 * 60)
    return wait + (distance_m / max(1e-6, v))


def _estimate_cost_inr(mode: str, distance_m: float) -> int:
    km = max(0.0, distance_m / 1000.0)
    if mode == "walking":
        return 0
    if mode == "car":
        return int(round(10 * km))
    if mode == "bike":
        return int(round(5 * km))
    if mode == "metro":
        # Approx tiered fare
        return int(min(50, max(10, round(10 + (km * 2)))))
    if mode == "train":
        return int(min(30, max(5, round(5 + (km * 1.2)))))
    if mode == "bus":
        return int(min(40, max(10, round(10 + (km * 1.5)))))
    return int(round(10 * km))


async def get_public_transport_route(
    origin: Dict[str, Any],
    destination: Dict[str, Any],
    mode: Literal["metro", "train", "bus"],
    ors_key: str,
    gtfs_zip_path: str,
) -> Dict[str, Any]:
    if not gtfs_zip_path or not os.path.exists(gtfs_zip_path):
        raise GTFSNotConfigured(f"{mode.upper()} GTFS dataset not found. Configure GTFS zip path on server.")

    stops = _load_gtfs_stops_from_zip(gtfs_zip_path)
    if not stops:
        raise GTFSNotConfigured(f"{mode.upper()} GTFS dataset has no stops.txt or is empty.")

    o_pt: LatLng = (origin["lat"], origin["lon"])
    d_pt: LatLng = (destination["lat"], destination["lon"])
    o_stop = _nearest_stop(stops, o_pt)
    d_stop = _nearest_stop(stops, d_pt)
    if not o_stop or not d_stop:
        raise GTFSNotConfigured(f"{mode.upper()} GTFS routing unavailable (no nearby stops).")

    # Walk to/from stops via ORS foot-walking.
    walk1 = await get_ors_route(o_pt, (o_stop.lat, o_stop.lon), "foot-walking", ors_key)
    walk2 = await get_ors_route((d_stop.lat, d_stop.lon), d_pt, "foot-walking", ors_key)

    # Transit segment: straight line between two stops (heuristic).
    transit_distance_m = _haversine_m((o_stop.lat, o_stop.lon), (d_stop.lat, d_stop.lon))
    transit_duration_s = _estimate_transit_duration_s(mode, transit_distance_m)
    transit_polyline = [[o_stop.lat, o_stop.lon], [d_stop.lat, d_stop.lon]]

    total_distance_m = walk1["distance_m"] + transit_distance_m + walk2["distance_m"]
    total_duration_s = walk1["duration_s"] + transit_duration_s + walk2["duration_s"]
    cost = _estimate_cost_inr(mode, transit_distance_m)

    return {
        "modes": [mode, "walking"],
        "duration_min": int(round(total_duration_s / 60)),
        "cost_inr": cost,
        "transfers": 1,
        "walking_distance_m": int(round(walk1["distance_m"] + walk2["distance_m"])),
        "segments": [
            {
                "mode": "walking",
                "coordinates": walk1["polyline"],
                "distance_m": walk1["distance_m"],
                "duration_s": walk1["duration_s"],
            },
            {
                "mode": mode,
                "coordinates": transit_polyline,
                "distance_m": transit_distance_m,
                "duration_s": transit_duration_s,
                "stops": [
                    {"name": o_stop.name, "lat": o_stop.lat, "lon": o_stop.lon},
                    {"name": d_stop.name, "lat": d_stop.lat, "lon": d_stop.lon},
                ],
            },
            {
                "mode": "walking",
                "coordinates": walk2["polyline"],
                "distance_m": walk2["distance_m"],
                "duration_s": walk2["duration_s"],
            },
        ],
    }


async def get_road_route_option(
    origin: Dict[str, Any],
    destination: Dict[str, Any],
    mode: Literal["car", "bike", "walking"],
    ors_key: str,
) -> Dict[str, Any]:
    o_pt: LatLng = (origin["lat"], origin["lon"])
    d_pt: LatLng = (destination["lat"], destination["lon"])
    profile = {"car": "driving-car", "bike": "cycling-regular", "walking": "foot-walking"}[mode]
    route = await get_ors_route(o_pt, d_pt, profile, ors_key)
    cost = _estimate_cost_inr(mode, route["distance_m"])
    return {
        "modes": [mode],
        "duration_min": int(round(route["duration_s"] / 60)),
        "cost_inr": cost,
        "transfers": 0,
        "walking_distance_m": int(round(route["distance_m"] if mode == "walking" else 0)),
        "segments": [
            {
                "mode": mode,
                "coordinates": route["polyline"],
                "distance_m": route["distance_m"],
                "duration_s": route["duration_s"],
            }
        ],
    }


def calculate_best_route(
    routes: List[Dict[str, Any]],
    travel_time_weight: float = 1.0,
    cost_weight: float = 0.6,
    transfer_penalty: float = 8.0,
) -> List[Dict[str, Any]]:
    # Score is a simple weighted sum (lower is better):
    # score = time(min)*w + cost(inr)*w + transfers*penalty
    def score(r: Dict[str, Any]) -> float:
        return (
            float(r.get("duration_min") or 0) * travel_time_weight
            + float(r.get("cost_inr") or 0) * cost_weight
            + float(r.get("transfers") or 0) * transfer_penalty
        )

    return sorted(routes, key=score)


async def calculate_smart_routes(origin_text: str, destination_text: str) -> Dict[str, Any]:
    # Prefer backend settings (.env via pydantic-settings) but allow process env as fallback.
    ors_key = (
        settings.ORS_API_KEY
        or os.environ.get("ORS_API_KEY")
        or os.environ.get("NEXT_PUBLIC_OPENROUTESERVICE_API_KEY")
        or ""
    )

    origin = await geocode_nominatim(origin_text)
    destination = await geocode_nominatim(destination_text)

    # Generate road options (required). If these all fail, return a useful error message.
    road_tasks = [
        ("car", get_road_route_option(origin, destination, "car", ors_key)),
        ("bike", get_road_route_option(origin, destination, "bike", ors_key)),
        ("walking", get_road_route_option(origin, destination, "walking", ors_key)),
    ]

    routes: List[Dict[str, Any]] = []

    road_errors: List[str] = []
    for mode_name, task in road_tasks:
        try:
            routes.append(await task)
        except ORSError as e:
            road_errors.append(f"{mode_name}: {str(e)}")
        except Exception:
            road_errors.append(f"{mode_name}: failed")

    if len(routes) == 0:
        # Most common cause: ORS_API_KEY not set on the backend process.
        if not ors_key:
            raise RouteOptimizerError(
                "No routes could be calculated because the backend routing key is missing. "
                "Set ORS_API_KEY in the backend environment and restart the FastAPI server."
            )
        raise RouteOptimizerError(
            "No routes could be calculated. Road routing failed: " + "; ".join(road_errors[:3])
        )

    # Public transport routes are optional. IMPORTANT: create these coroutines only after
    # road routing succeeds, otherwise Python will warn about un-awaited coroutines if we
    # raise/return early.
    gtfs_metro = settings.GTFS_MUMBAI_METRO_ZIP or os.environ.get("GTFS_MUMBAI_METRO_ZIP", "")
    gtfs_train = settings.GTFS_MUMBAI_TRAIN_ZIP or os.environ.get("GTFS_MUMBAI_TRAIN_ZIP", "")
    gtfs_bus = settings.GTFS_MUMBAI_BUS_ZIP or os.environ.get("GTFS_MUMBAI_BUS_ZIP", "")

    pt_tasks = [
        get_public_transport_route(origin, destination, "metro", ors_key, gtfs_metro),
        get_public_transport_route(origin, destination, "train", ors_key, gtfs_train),
        get_public_transport_route(origin, destination, "bus", ors_key, gtfs_bus),
    ]

    pt_results = await _gather_safe(pt_tasks, ignore_errors=(GTFSNotConfigured,))
    routes.extend([r for r in pt_results if r is not None])

    if not routes:
        raise RouteOptimizerError("No routes could be calculated.")

    ranked = calculate_best_route(routes)

    # Build “best/fastest/cheapest” tags.
    fastest = min(ranked, key=lambda r: r.get("duration_min", 10**9))
    cheapest = min(ranked, key=lambda r: r.get("cost_inr", 10**9))
    for r in ranked:
        r["tags"] = []
    ranked[0]["tags"].append("best")
    fastest["tags"] = list(set(fastest.get("tags", []) + ["fastest"]))
    cheapest["tags"] = list(set(cheapest.get("tags", []) + ["cheapest"]))

    # Add ids + titles
    def title_for(r: Dict[str, Any]) -> str:
        modes = r.get("modes") or []
        if len(modes) == 0:
            return "Route"
        if len(modes) == 1:
            return str(modes[0]).title()
        return " + ".join([str(m).title() for m in modes])

    for i, r in enumerate(ranked, start=1):
        r["id"] = f"opt_{i}"
        r["title"] = title_for(r)

    return {
        "origin": origin,
        "destination": destination,
        "routes": ranked,
    }


async def calculate_multimodal_routes_from_coords(
    origin_lat: float,
    origin_lng: float,
    dest_lat: float,
    dest_lng: float,
) -> Dict[str, Any]:
    """
    New entry point: calculate routes using numeric coordinates and CSV station datasets.
    """
    ors_key = (
        settings.ORS_API_KEY
        or os.environ.get("ORS_API_KEY")
        or os.environ.get("NEXT_PUBLIC_OPENROUTESERVICE_API_KEY")
        or ""
    )

    origin = {"lat": origin_lat, "lon": origin_lng, "display_name": "Origin"}
    destination = {"lat": dest_lat, "lon": dest_lng, "display_name": "Destination"}

    # 1. Road (car) option via ORS.
    road_routes: List[Dict[str, Any]] = []
    try:
        road_routes.append(await get_road_route_option(origin, destination, "car", ors_key))
    except Exception:
        pass

    # 2. Metro / Train via CSV datasets.
    transit_routes: List[Dict[str, Any]] = []
    for mode in ("metro", "train"):
        try:
            r = station_service.generate_transit_route(origin_lat, origin_lng, dest_lat, dest_lng, mode)
            if not r:
                continue
            # Wrap into the same RouteOption shape used by the frontend.
            speed_mode = mode
            cost = _estimate_cost_inr(speed_mode, r["distance_km"] * 1000.0)
            stations = r.get("stations") or []
            transit_routes.append(
                {
                    "modes": [mode],
                    "duration_min": r["duration_min"],
                    "cost_inr": cost,
                    "transfers": 0,
                    "walking_distance_m": 0,
                    "segments": [
                        {
                            "mode": mode,
                            "coordinates": r["polyline"],
                            "distance_m": r["distance_km"] * 1000.0,
                            "duration_s": r["duration_min"] * 60,
                            "stops": [{"name": s["name"], "lat": s["lat"], "lon": s["lon"]} for s in stations],
                        }
                    ],
                }
            )
        except Exception:
            continue

    routes = road_routes + transit_routes
    if not routes:
        raise RouteOptimizerError("No routes could be calculated from the provided coordinates.")

    ranked = calculate_best_route(routes)

    # Tag & title, as before.
    fastest = min(ranked, key=lambda r: r.get("duration_min", 10**9))
    cheapest = min(ranked, key=lambda r: r.get("cost_inr", 10**9))
    for r in ranked:
        r["tags"] = []
    ranked[0]["tags"].append("best")
    fastest["tags"] = list(set(fastest.get("tags", []) + ["fastest"]))
    cheapest["tags"] = list(set(cheapest.get("tags", []) + ["cheapest"]))

    def title_for(r: Dict[str, Any]) -> str:
        modes = r.get("modes") or []
        if len(modes) == 0:
            return "Route"
        if len(modes) == 1:
            return str(modes[0]).title()
        return " + ".join([str(m).title() for m in modes])

    for i, r in enumerate(ranked, start=1):
        r["id"] = f"opt_{i}"
        r["title"] = title_for(r)

    return {
        "origin": origin,
        "destination": destination,
        "routes": ranked,
    }


async def _gather_safe(tasks: List[Any], ignore_errors: Tuple[type, ...] = ()) -> List[Optional[Dict[str, Any]]]:
    results: List[Optional[Dict[str, Any]]] = []
    for coro in tasks:
        try:
            results.append(await coro)
        except ignore_errors:
            results.append(None)
        except Exception:
            # Keep planner resilient; individual option failure should not crash the endpoint.
            results.append(None)
    return results

