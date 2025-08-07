from pydantic import BaseModel

class PredictionInput(BaseModel):
    year: int
    season: str
    district: str
    sown_hect: float
    previous_yield: float

class PredictionRecord(BaseModel):
    season: str
    district: str
    year: int
    sown_hect: float
    previous_yield: float
    predicted_extent: float
    predicted_production: float

    class Config:
        orm_mode = True