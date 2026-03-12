from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Always load backend/.env regardless of current working directory
    model_config = SettingsConfigDict(
        # config.py -> backend/app/config.py, so parents[1] == backend/
        env_file=str(Path(__file__).resolve().parents[1] / ".env"),
        env_file_encoding="utf-8",
    )

    PROJECT_NAME: str = "TransitWin"
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "transitwin"
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    # OpenRouteService (used by smart route optimizer)
    ORS_API_KEY: str = ""
    # Optional GTFS datasets (zip paths). If unset, metro/train/bus options are skipped.
    GTFS_MUMBAI_METRO_ZIP: str = ""
    GTFS_MUMBAI_TRAIN_ZIP: str = ""
    GTFS_MUMBAI_BUS_ZIP: str = ""

settings = Settings()
