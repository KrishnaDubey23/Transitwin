from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..database import db
from ..models.trip import Trip, TripCreate
from .deps import get_current_user

router = APIRouter(prefix="/trips", tags=["trips"])

@router.get("/", response_model=List[Trip])
async def get_trips(current_user: dict = Depends(get_current_user)):
    trips = await db.db["trips"].find({"user_id": str(current_user["_id"])}).to_list(100)
    return trips

@router.post("/", response_model=Trip)
async def create_trip(trip_in: TripCreate, current_user: dict = Depends(get_current_user)):
    trip_dict = trip_in.dict()
    trip_dict["user_id"] = str(current_user["_id"])
    
    new_trip = await db.db["trips"].insert_one(trip_dict)
    created_trip = await db.db["trips"].find_one({"_id": new_trip.inserted_id})
    return created_trip
