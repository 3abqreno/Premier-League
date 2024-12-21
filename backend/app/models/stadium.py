from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class Stadium(Base):
    __tablename__ = "stadiums"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    rows = Column(Integer, nullable=False)
    columns = Column(Integer, nullable=False)

    # Relationships
    matches = relationship(
        "Match", 
        back_populates="stadium",
        cascade="all, delete-orphan"
    )
