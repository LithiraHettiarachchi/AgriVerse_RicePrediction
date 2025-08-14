from fastapi import APIRouter, Depends
from app.schemas.prediction_schema import PredictionInput
from app.services.prediction_service import predict_total_production
from app.utils.firebase import db
from app.routes.auth import get_current_user
from datetime import datetime

router = APIRouter()

@router.post("/predict/")
def predict_and_save(data: PredictionInput, user=Depends(get_current_user)):
    # Run prediction
    extent, production = predict_total_production(
        data.year, data.season, data.district, data.sown_hect, data.previous_yield
    )

    # Save in Firestore with UID
    uid = user["uid"]
    prediction_ref = db.collection("predictions").document()
    prediction_ref.set({
        "uid": uid,
        "prediction": {
            "year": data.year,
            "season": data.season,
            "district": data.district,
            "sown_hect": data.sown_hect,
            "previous_yield": data.previous_yield,
            "predicted_extent": extent,
            "predicted_production": production
        },
        "createdAt": datetime.utcnow().isoformat()
    })

    # Return to frontend
    return {
        "status": "success",
        "prediction_id": prediction_ref.id,
        "Predicted Harvested Extent (hectares)": extent,
        "Predicted Total Production (metric tons)": production
    }
