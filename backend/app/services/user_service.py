from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.models.user import User
from app.schemas.user_schema import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def create_user(db: Session, user_data: UserCreate):
    hashed_pw = get_password_hash(user_data.password)
    db_user = User(email=user_data.email, name=user_data.name, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
