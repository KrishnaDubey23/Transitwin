from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.database import connect_to_mongo, close_mongo_connection
from app.routers import auth, trips, stats, notifications, transit

app = FastAPI(title="TransitWin API", version="0.1.0")

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(trips.router)
app.include_router(stats.router)
app.include_router(notifications.router)
app.include_router(transit.router)

@app.get("/")
async def root():
    return {"message": "Welcome to TransitWin API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
