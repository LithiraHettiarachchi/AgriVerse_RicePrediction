from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserCreate, UserOut
from app.services.user_service import create_user, get_user_by_email
from app.database import get_db
from fastapi import Depends, HTTPException, Header
from app.utils.firebase import verify_token

router = APIRouter()

@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db, user)

def get_current_user(authorization: str = Header(...)):
    """Extract and verify Firebase ID token from Authorization header"""
    token = authorization.split(" ")[1] if " " in authorization else authorization
    decoded = verify_token(token)
    if not decoded:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return decoded
