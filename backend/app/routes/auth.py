from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserOut
from app.services.user_service import create_user, get_user_by_email
from app.database import get_db

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db, user)
