from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.prediction import PredictionHistory
from app.schemas.prediction_schema import PredictionRecord

router = APIRouter()

@router.get("/activity", response_model=list[PredictionRecord])
def get_recent_activity(user_id: int, db: Session = Depends(get_db)):
    records = db.query(PredictionHistory)\
                .filter(PredictionHistory.user_id == user_id)\
                .order_by(PredictionHistory.id.desc())\
                .limit(5).all()
    return records
