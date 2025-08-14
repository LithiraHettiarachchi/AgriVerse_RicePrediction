from fastapi import APIRouter, Header, HTTPException, Depends
from app.schemas.prediction_schema import PredictionInput
from app.services.prediction_service import predict_total_production
from app.utils.firebase import db, verify_token
from datetime import datetime

router = APIRouter()

def get_current_user(authorization: str = Header(...)):
    """Extract UID from Firebase ID token."""
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid auth header")
    token = authorization.split(" ")[1]
    decoded = verify_token(token)
    if not decoded:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return decoded["uid"]

@router.post("/predict")
def predict_and_save(
    data: PredictionInput,
    uid: str = Depends(get_current_user),
):
    # 1. Run prediction
    extent, production = predict_total_production(
        data.year, data.season, data.district, data.sown_hect, data.previous_yield
    )

    # 2. Save to Firestore in a user-specific collection
    doc_ref = db.collection("users").document(uid).collection("predictions").document()
    doc_ref.set({
        "prediction_id": doc_ref.id,
        "year": data.year,
        "season": data.season,
        "district": data.district,
        "sown_hect": data.sown_hect,
        "previous_yield": data.previous_yield,
        "predicted_extent": extent,
        "predicted_production": production,
        "createdAt": datetime.utcnow().isoformat()
    })

    # 3. Return results
    return {
        "status": "success",
        "prediction_id": doc_ref.id,
        "Predicted Harvested Extent (hectares)": extent,
        "Predicted Total Production (metric tons)": production
    }

