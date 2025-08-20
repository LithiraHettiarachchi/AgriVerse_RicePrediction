from fastapi import FastAPI, APIRouter
from app.routes import prediction
from app.routes import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# allow specific origins
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction.router, tags=["Paddy Prediction"])
app.include_router(auth.router, tags=["Auth"])
