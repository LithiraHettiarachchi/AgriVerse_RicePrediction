from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    season = Column(String)
    district = Column(String)
    year = Column(Integer)
    sown_hect = Column(Float)
    previous_yield = Column(Float)
    predicted_extent = Column(Float)
    predicted_production = Column(Float)

    user = relationship("User", back_populates="predictions")
