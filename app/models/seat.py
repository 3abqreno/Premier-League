from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Seat(Base):
    __tablename__ = "seats"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"), nullable=False)
    row = Column(Integer, nullable=False)
    column = Column(Integer, nullable=False)
    status = Column(String(10), nullable=False, default="AVAILABLE")  # AVAILABLE, RESERVED

    # Relationships
    match = relationship("Match", back_populates="seats")
    reservation = relationship(
        "Reservation", 
        back_populates="seat", 
        uselist=False,  # one-to-one relationship
        cascade="all, delete-orphan"
    )
