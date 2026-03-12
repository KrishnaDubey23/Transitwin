from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime
from bson import ObjectId

class TripBase(BaseModel):
    user_id: str
    origin: str
    destination: str
    mode: str  # bus, train, metro, etc.
    duration: int  # minutes
    status: str = "completed"

class TripCreate(TripBase):
    pass

class Trip(TripBase):
    id: Optional[Any] = Field(default=None, alias="_id")
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
    }
