from fastapi import APIRouter
from app.schemas.prediction_schema import PredictionInput
from app.services.prediction_service import predict_total_production

router = APIRouter()

@router.post("/predict/")
def predict(data: PredictionInput):
    extent, production = predict_total_production(
        data.year, data.season, data.district, data.sown_hect, data.previous_yield
    )
    return {
        "Predicted Harvested Extent (hectares)": extent,
        "Predicted Total Production (metric tons)": production
    }
