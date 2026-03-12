from fastapi import APIRouter, Depends
from ..database import db
from .deps import get_current_user

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("/")
async def get_quick_stats(current_user: dict = Depends(get_current_user)):
    # Mock stats for now, can be calculated from trips later
    return {
        "total_trips": await db.db["trips"].count_documents({"user_id": str(current_user["_id"])}),
        "co2_saved": 12.5,
        "efficiency_score": 88
    }
