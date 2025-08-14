from fastapi import FastAPI, APIRouter
from app.routes import prediction
from app.routes import auth

app = FastAPI()

app.include_router(prediction.router, tags=["Paddy Prediction"])
app.include_router(auth.router, tags=["Auth"])