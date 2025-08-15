import joblib

models = {
    'Yala': {
        'extent': joblib.load("app/ml_models/model_extent_compressed(Yala).pkl"),
        'production': joblib.load("app/ml_models/model_prodiction_compressed(Yala).pkl")
    },
    'Maha': {
        'production': joblib.load("app/ml_models/model_compressed(Maha).pkl")
    }
}

def get_models(season: str):
    if season not in models:
        raise ValueError(f"Unsupported season: {season}")
    return models[season]
