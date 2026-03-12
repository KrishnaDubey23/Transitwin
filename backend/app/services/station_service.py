from __future__ import annotations

from dataclasses import dataclass
from math import radians, sin, cos, asin, sqrt
from pathlib import Path
from typing import List, Optional, Tuple

import pandas as pd

LatLng = Tuple[float, float]


@dataclass
class Station:
  name: str
  lat: float
  lon: float
  line: str
  index: int  # order along the line dataframe


def _project_root() -> Path:
  # station_service.py -> backend/app/services/station_service.py
  # parents[0] = .../backend/app/services
  # parents[1] = .../backend/app
  # parents[2] = .../backend
  # parents[3] = .../TransitWin  (project root)
  return Path(__file__).resolve().parents[3]


def _load_csv(name: str) -> pd.DataFrame:
  """
  Load a CSV from dataset/. Be tolerant of an extra nested 'dataset' folder.
  """
  root = _project_root()
  base = root / "dataset"
  direct = base / name
  nested = base / "dataset" / name

  path: Optional[Path] = None
  if direct.exists():
    path = direct
  elif nested.exists():
    path = nested
  else:
    raise FileNotFoundError(f"Station dataset not found: {direct} or {nested}")

  # Some of these CSVs use extended characters, so be tolerant of encoding.
  try:
    df = pd.read_csv(path)
  except UnicodeDecodeError:
    df = pd.read_csv(path, encoding="latin-1")

  # Normalise columns aggressively: strip whitespace, case-insensitive,
  # and map variations (Latitude/longitude, lat , lon , etc.) to canonical names.
  rename_map = {}
  for col in list(df.columns):
    raw = str(col)
    key = raw.strip().lower()
    target = None
    if key in ("station_name", "station"):
      target = "station_name"
    elif key.startswith("lat"):
      target = "lat"
    elif key.startswith("lon") or key.startswith("lng"):
      target = "lon"
    elif key == "line" or "line" in key:
      target = "line"

    if target:
      rename_map[raw] = target

  if rename_map:
    df = df.rename(columns=rename_map)

  # Be permissive here – the subsequent code will fail loudly if required
  # columns are truly missing. This avoids hard crashes due to tiny header
  # differences or invisible characters.
  return df


def _haversine_m(a: LatLng, b: LatLng) -> float:
  lat1, lon1 = a
  lat2, lon2 = b
  r = 6371000.0
  dlat = radians(lat2 - lat1)
  dlon = radians(lon2 - lon1)
  la1 = radians(lat1)
  la2 = radians(lat2)
  s = sin(dlat / 2) ** 2 + cos(la1) * cos(la2) * sin(dlon / 2) ** 2
  return 2 * r * asin(min(1.0, sqrt(s)))


class StationService:
  """
  Singleton-style loader for metro and train station datasets.
  """

  def __init__(self) -> None:
    # Prefer explicit *_coords.csv files if present; fall back to legacy names.
    try:
      metro_df = _load_csv("mumbai_metro_stations_coords.csv")
    except FileNotFoundError:
      metro_df = _load_csv("mumbai_metro_stations.csv")
    try:
      train_df = _load_csv("mumbai_train_stations_coords.csv")
    except FileNotFoundError:
      # Train dataset is optional; if not present, we simply skip train routes.
      train_df = pd.DataFrame()

    self.metro_stations: List[Station] = []
    self.train_stations: List[Station] = []

    # Helper to populate station lists from a normalised dataframe.
    def _populate(df: pd.DataFrame, target: List[Station]) -> None:
      required_cols = {"station_name", "lat", "lon", "line"}
      if df.empty or not required_cols.issubset(df.columns):
        return
      # Keep the order of rows as "line order" within each line.
      for line, group in df.groupby("line", sort=False):
        for idx, row in enumerate(group.itertuples(index=False), start=0):
          target.append(
            Station(
              name=str(getattr(row, "station_name")),
              lat=float(getattr(row, "lat")),
              lon=float(getattr(row, "lon")),
              line=str(line),
              index=idx,
            )
          )

    _populate(metro_df, self.metro_stations)
    _populate(train_df, self.train_stations)

  def find_nearest_station(self, lat: float, lon: float, mode: str) -> Optional[Station]:
    """
    Find nearest station for the given mode ('metro' or 'train').
    """
    pts = self.metro_stations if mode == "metro" else self.train_stations
    if not pts:
      return None
    best: Optional[Station] = None
    best_d: Optional[float] = None
    for s in pts:
      d = _haversine_m((lat, lon), (s.lat, s.lon))
      if best is None or (best_d is not None and d < best_d):
        best = s
        best_d = d
    return best

  def generate_transit_route(
    self,
    origin_lat: float,
    origin_lon: float,
    dest_lat: float,
    dest_lon: float,
    mode: str,
  ) -> Optional[dict]:
    """
    Build a simple station-to-station route along one line using the datasets.
    Returns None if no suitable stations/line found.
    """
    stations = self.metro_stations if mode == "metro" else self.train_stations
    if not stations:
      return None

    o = self.find_nearest_station(origin_lat, origin_lon, mode)
    d = self.find_nearest_station(dest_lat, dest_lon, mode)
    if not o or not d or o.line != d.line:
      return None

    # Order by index along the line.
    line_stations = [s for s in stations if s.line == o.line]
    # find positions of o and d in this list
    try:
      i = next(i for i, s in enumerate(line_stations) if s.name == o.name)
      j = next(i for i, s in enumerate(line_stations) if s.name == d.name)
    except StopIteration:
      return None

    if i <= j:
      segment = line_stations[i : j + 1]
    else:
      segment = list(reversed(line_stations[j : i + 1]))

    # Distance along line (sum of haversine between consecutive stations).
    total_m = 0.0
    for a, b in zip(segment[:-1], segment[1:]):
      total_m += _haversine_m((a.lat, a.lon), (b.lat, b.lon))

    # Estimate time (in minutes) from line speeds.
    speed_kmh = 35.0 if mode == "metro" else 45.0
    speed_mps = speed_kmh * 1000.0 / 3600.0
    travel_s = total_m / max(0.1, speed_mps)

    stations_payload = [{"name": s.name, "lat": s.lat, "lon": s.lon} for s in segment]
    polyline = [[s.lat, s.lon] for s in segment]

    return {
      "mode": mode,
      "origin_station": o.name,
      "destination_station": d.name,
      "duration_min": int(round(travel_s / 60.0)),
      "distance_km": round(total_m / 1000.0, 2),
      "stations": stations_payload,
      "polyline": polyline,
    }


# singleton instance
station_service = StationService()

