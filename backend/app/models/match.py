from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base import Base

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    home_team = Column(Integer, ForeignKey("teams.id"), nullable=False)
    away_team = Column(Integer, ForeignKey("teams.id"), nullable=False)
    venue_id = Column(Integer, ForeignKey("stadiums.id"), nullable=False)
    date_time = Column(DateTime, nullable=False)
    main_referee = Column(String(50), nullable=False)
    linesman_1 = Column(String(50), nullable=False)
    linesman_2 = Column(String(50), nullable=False)
    ticket_price = Column(Numeric(10, 2), nullable=False)  # Price in decimal
    status = Column(String(20), nullable=False, default="SCHEDULED")  # SCHEDULED, ONGOING, COMPLETED, CANCELLED
    home_team_score = Column(Integer, default=0)
    away_team_score = Column(Integer, default=0)

    # Relationships
    home_team_rel = relationship(
        "Team",
        foreign_keys=[home_team],
        back_populates="home_matches"
    )
    away_team_rel = relationship(
        "Team",
        foreign_keys=[away_team],
        back_populates="away_matches"
    )
    stadium = relationship("Stadium", back_populates="matches")
    seats = relationship("Seat", back_populates="match", cascade="all, delete-orphan")
    reservations = relationship("Reservation", back_populates="match", cascade="all, delete-orphan")

    def is_upcoming(self) -> bool:
        """Check if the match is upcoming"""
        return self.date_time > datetime.now()

    def is_finished(self) -> bool:
        """Check if the match is finished"""
        return self.status == "COMPLETED"

    def get_available_seats_count(self) -> int:
        """Get count of available seats"""
        return sum(1 for seat in self.seats if seat.status == "AVAILABLE")

    def get_reserved_seats_count(self) -> int:
        """Get count of reserved seats"""
        return sum(1 for seat in self.seats if seat.status == "RESERVED")
