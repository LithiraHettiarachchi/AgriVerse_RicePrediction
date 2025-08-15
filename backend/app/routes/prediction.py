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


@router.post("/production/predict")
def predict_and_save(
        data: PredictionInput,
        uid: str = Depends(get_current_user),
):
    # Run prediction
    extent, production = predict_total_production(
        data.year, data.season, data.district, data.sown_hect, data.previous_yield, data.previous_production
    )

    # Save to Firestore
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

    return {
        "status": "success",
        "prediction_id": doc_ref.id,
        "Predicted Harvested Extent (hectares)": extent,
        "Predicted Total Production (metric tons)": production
    }


@router.get("/production/my")
def get_my_predictions(uid: str = Depends(get_current_user)):
    """Fetch all predictions for the authenticated user."""
    try:
        predictions_ref = db.collection("users").document(uid).collection("predictions")
        docs = predictions_ref.stream()

        predictions = []
        for doc in docs:
            pred_data = doc.to_dict()
            pred_data["id"] = doc.id
            predictions.append(pred_data)

        return {
            "status": "success",
            "count": len(predictions),
            "predictions": predictions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching predictions: {str(e)}")


@router.get("/production/my/{prediction_id}")
def get_my_prediction_by_id(
        prediction_id: str,
        uid: str = Depends(get_current_user),
):
    """Fetch a single prediction for the authenticated user by its ID."""
    try:
        doc_ref = db.collection("users").document(uid).collection("predictions").document(prediction_id)
        doc = doc_ref.get()

        if not doc.exists:
            raise HTTPException(status_code=404, detail="Prediction not found")

        pred_data = doc.to_dict()
        pred_data["id"] = doc.id
        return {
            "status": "success",
            "prediction": pred_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching prediction: {str(e)}")
