from fastapi import APIRouter, Depends
from typing import List
from ..database import db
from .deps import get_current_user

router = APIRouter(prefix="/notifications", tags=["notifications"])

@router.get("/")
async def get_notifications(current_user: dict = Depends(get_current_user)):
    # Mock notifications
    return [
        {"id": "1", "title": "Route Update", "message": "Line 5 is delayed", "type": "warning", "timestamp": "2024-03-20T10:00:00"},
        {"id": "2", "title": "Success", "message": "Trip saved successfully", "type": "info", "timestamp": "2024-03-20T09:30:00"}
    ]
