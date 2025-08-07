import joblib

models = {
    'Yala': {
        'extent': joblib.load("app/ml_models/model_extent(Yala).pkl"),
        'production': joblib.load("app/ml_models/model_production(Yala).pkl")
    },
    # 'Maha': {
    #     'extent': joblib.load("app/ml_models/model_extent(Maha).pkl"),
    #     'production': joblib.load("app/ml_models/model_production(Maha).pkl")
    # }
}

def get_models(season: str):
    if season not in models:
        raise ValueError(f"Unsupported season: {season}")
    return models[season]
