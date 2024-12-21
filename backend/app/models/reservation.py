from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    seat_id = Column(Integer, ForeignKey("seats.id"), nullable=False)
    match_id = Column(Integer, ForeignKey("matches.id"), nullable=False)
    reservation_date = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    ticket_number = Column(String(50), nullable=False, unique=True)

    # Relationships
    user = relationship("User", back_populates="reservations")
    seat = relationship("Seat", back_populates="reservation")
    match = relationship("Match", back_populates="reservations")
