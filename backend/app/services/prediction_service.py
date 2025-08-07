import pandas as pd
from fastapi import HTTPException
from app.utils.model_loader import get_models
from app.models.prediction import PredictionHistory

season_map = {'Maha': 0, 'Yala': 1}
district_list = [
    'AMPARA', 'ANURADHAPURA', 'BADULLA', 'BATTICALOA', 'COLOMBO',
    'GALLE', 'GAMPAHA', 'HAMBANTOTA', 'JAFFNA', 'KALUTARA',
    'KANDY', 'KEGALLE', 'KILINOCHCHI', 'KURUNEGALA', 'MANNAR',
    'MATALE', 'MONARAGALA', 'MULLAITIVU', 'NUWARA ELIYA', 'POLONNARUWA',
    'PUTTALAM', 'RATNAPURA', 'TRINCOMALEE', 'VAVUNIYA'
]

def predict_total_production(year, season, district, sown_hect, previous_yield):
    if season not in season_map:
        raise HTTPException(status_code=400, detail="Invalid season. Use 'Yala' or 'Maha'.")

    try:
        district_encoded = district_list.index(district.upper())
    except ValueError:
        raise HTTPException(status_code=400, detail=f"District '{district}' not found")

    season_encoded = season_map[season]
    models = get_models(season)

    extent_input = pd.DataFrame([{
        'Year': year,
        'Season_encoded': season_encoded,
        'District_encoded': district_encoded,
        'Sown(hect)': sown_hect,
        'Previous_Yield': previous_yield
    }])
    predicted_extent = models['extent'].predict(extent_input)[0]

    production_input = pd.DataFrame([{
        'Year': year,
        'Season_encoded': season_encoded,
        'District_encoded': district_encoded,
        'Extent Harvested(hect)': predicted_extent,
        'Previous_Yield': previous_yield
    }])
    predicted_production = models['production'].predict(production_input)[0]

    return round(predicted_extent, 2), round(predicted_production, 2)

def save_prediction(db, user_id, season, district, year, sown_hect, previous_yield, extent, production):
    record = PredictionHistory(
        user_id=user_id,
        season=season,
        district=district,
        year=year,
        sown_hect=sown_hect,
        previous_yield=previous_yield,
        predicted_extent=extent,
        predicted_production=production
    )
    db.add(record)
    db.commit()
