from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)

    # Relationships
    home_matches = relationship(
        "Match",
        foreign_keys="Match.home_team",
        back_populates="home_team_rel"
    )
    away_matches = relationship(
        "Match",
        foreign_keys="Match.away_team",
        back_populates="away_team_rel"
    )
