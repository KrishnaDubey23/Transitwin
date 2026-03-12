from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from ..database import db
from ..models.user import UserCreate, UserInDB, User
from ..utils.security import get_password_hash, verify_password, create_access_token
from ..config import settings

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=User)
async def signup(user_in: UserCreate):
    user_exists = await db.db["users"].find_one({"email": user_in.email})
    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )
    
    hashed_password = get_password_hash(user_in.password)
    user_dict = user_in.dict()
    user_dict["hashed_password"] = hashed_password
    del user_dict["password"]
    
    new_user = await db.db["users"].insert_one(user_dict)
    created_user = await db.db["users"].find_one({"_id": new_user.inserted_id})
    return created_user

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.db["users"].find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
