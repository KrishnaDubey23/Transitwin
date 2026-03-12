import motor.motor_asyncio
from .config import settings

class Database:
    client: motor.motor_asyncio.AsyncIOMotorClient = None
    db: motor.motor_asyncio.AsyncIOMotorDatabase = None

db = Database()

async def connect_to_mongo():
    db.client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGODB_URL)
    db.db = db.client[settings.DATABASE_NAME]
    print("Connected to MongoDB")

async def close_mongo_connection():
    db.client.close()
    print("Closed MongoDB connection")
