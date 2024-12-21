from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_, or_, func
from datetime import datetime
from app.models.match import Match
from app.models.seat import Seat
from app.schemas.match import MatchCreate, MatchUpdate
from .base import BaseRepository

class MatchRepository(BaseRepository[Match, MatchCreate, MatchUpdate]):
    def __init__(self, db: Session):
        super().__init__(Match, db)

    def get_all_with_details(
        self,
        skip: int = 0,
        limit: int = 100
    ) -> List[Match]:
        """Get all matches with team and stadium details"""
        return (
            self.db.query(self.model)
            .options(
                joinedload(self.model.home_team_rel),
                joinedload(self.model.away_team_rel),
                joinedload(self.model.stadium)
            )
            .order_by(self.model.date_time)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_upcoming_matches(
        self,
        skip: int = 0,
        limit: int = 100
    ) -> List[Match]:
        """Get upcoming matches"""
        return (
            self.db.query(self.model)
            .options(
                joinedload(self.model.home_team_rel),
                joinedload(self.model.away_team_rel),
                joinedload(self.model.stadium)
            )
            .filter(
                and_(
                    self.model.date_time > datetime.now(),
                    self.model.status == "SCHEDULED"
                )
            )
            .order_by(self.model.date_time)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_match_with_details(self, match_id: int) -> Optional[Match]:
        """Get a specific match with all details"""
        return (
            self.db.query(self.model)
            .options(
                joinedload(self.model.home_team_rel),
                joinedload(self.model.away_team_rel),
                joinedload(self.model.stadium),
                joinedload(self.model.seats)
            )
            .filter(self.model.id == match_id)
            .first()
        )

    def get_team_matches(
        self,
        team_id: int,
        skip: int = 0,
        limit: int = 100
    ) -> List[Match]:
        """Get all matches for a specific team"""
        return (
            self.db.query(self.model)
            .options(
                joinedload(self.model.home_team_rel),
                joinedload(self.model.away_team_rel),
                joinedload(self.model.stadium)
            )
            .filter(
                or_(
                    self.model.home_team == team_id,
                    self.model.away_team == team_id
                )
            )
            .order_by(self.model.date_time)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def create_match_with_seats(self, match_data: MatchCreate) -> Match:
        """Create a match and initialize its seats"""
        # Create the match
        match = self.model(**match_data.model_dump())
        self.db.add(match)
        self.db.flush()  # Get the match ID without committing

        # Get stadium dimensions
        stadium = match.stadium
        
        # Create seats for the match
        seats = []
        for row in range(1, stadium.rows + 1):
            for col in range(1, stadium.columns + 1):
                seat = Seat(
                    match_id=match.id,
                    row=row,
                    column=col,
                    status="AVAILABLE"
                )
                seats.append(seat)
        
        self.db.bulk_save_objects(seats)
        self.db.commit()
        self.db.refresh(match)
        
        return match

    def update_match_status(
        self,
        match_id: int,
        status: str,
        home_score: Optional[int] = None,
        away_score: Optional[int] = None
    ) -> Optional[Match]:
        """Update match status and scores"""
        match = self.get(match_id)
        if not match:
            return None

        match.status = status
        if home_score is not None:
            match.home_team_score = home_score
        if away_score is not None:
            match.away_team_score = away_score

        self.db.commit()
        self.db.refresh(match)
        return match

    def get_available_seats_count(self, match_id: int) -> int:
        """Get the count of available seats for a match"""
        return (
            self.db.query(func.count(Seat.id))
            .filter(
                and_(
                    Seat.match_id == match_id,
                    Seat.status == "AVAILABLE"
                )
            )
            .scalar()
        )

    def get_matches_by_date_range(
        self,
        start_date: datetime,
        end_date: datetime,
        skip: int = 0,
        limit: int = 100
    ) -> List[Match]:
        """Get matches within a date range"""
        return (
            self.db.query(self.model)
            .options(
                joinedload(self.model.home_team_rel),
                joinedload(self.model.away_team_rel),
                joinedload(self.model.stadium)
            )
            .filter(
                and_(
                    self.model.date_time >= start_date,
                    self.model.date_time <= end_date
                )
            )
            .order_by(self.model.date_time)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def search_matches(
        self,
        team_name: Optional[str] = None,
        stadium_name: Optional[str] = None,
        status: Optional[str] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Match]:
        """Search matches with various filters"""
        query = self.db.query(self.model).options(
            joinedload(self.model.home_team_rel),
            joinedload(self.model.away_team_rel),
            joinedload(self.model.stadium)
        )

        if team_name:
            query = query.filter(
                or_(
                    self.model.home_team_rel.has(name=team_name),
                    self.model.away_team_rel.has(name=team_name)
                )
            )

        if stadium_name:
            query = query.filter(self.model.stadium.has(name=stadium_name))

        if status:
            query = query.filter(self.model.status == status)

        return query.order_by(self.model.date_time).offset(skip).limit(limit).all()
