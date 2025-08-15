from fastapi import APIRouter, Depends, HTTPException
from fastapi import Depends, HTTPException, Header
from app.utils.firebase import verify_token

router = APIRouter()

def get_current_user(authorization: str = Header(...)):
    """Extract and verify Firebase ID token from Authorization header"""
    token = authorization.split(" ")[1] if " " in authorization else authorization
    decoded = verify_token(token)
    if not decoded:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return decoded
