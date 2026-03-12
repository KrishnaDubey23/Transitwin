from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from .deps import get_current_user
from ..services.route_optimizer import (
    calculate_smart_routes,
    calculate_multimodal_routes_from_coords,
    geocode_nominatim,
    RouteOptimizerError,
    GeocodeError,
)

router = APIRouter(prefix="/transit", tags=["transit"])


@router.get("/geocode")
async def geocode(q: str):
    """Geocode a location name to lat/lon. No auth required."""
    try:
        return await geocode_nominatim(q)
    except GeocodeError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/smart-route-text")
async def smart_route_text(origin: str, destination: str):
    """
    Smart route planner using text addresses.
    Geocodes origin and destination, then returns multi-modal routes from datasets.
    No auth required.
    """
    try:
        origin_geo = await geocode_nominatim(origin)
        dest_geo = await geocode_nominatim(destination)
        return await calculate_multimodal_routes_from_coords(
            origin_geo["lat"],
            origin_geo["lon"],
            dest_geo["lat"],
            dest_geo["lon"],
        )
    except GeocodeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RouteOptimizerError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to calculate routes.")


@router.get("/search")
async def search_routes(origin: str, destination: str, current_user: dict = Depends(get_current_user)):
    try:
        origin_geo = await geocode_nominatim(origin)
        dest_geo = await geocode_nominatim(destination)
        return await calculate_multimodal_routes_from_coords(
            origin_geo["lat"],
            origin_geo["lon"],
            dest_geo["lat"],
            dest_geo["lon"],
        )
    except GeocodeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RouteOptimizerError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Route search failed")


@router.get("/smart-route")
async def smart_route(
    origin_lat: float,
    origin_lng: float,
    dest_lat: float,
    dest_lng: float,
):
    """
    Smart multi-modal route planner endpoint using numeric coordinates.

    Returns multiple route options:
      - Road (car) via OpenRouteService
      - Metro via CSV dataset
      - Train via CSV dataset
    """
    try:
        return await calculate_multimodal_routes_from_coords(origin_lat, origin_lng, dest_lat, dest_lng)
    except RouteOptimizerError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to calculate smart routes.")
