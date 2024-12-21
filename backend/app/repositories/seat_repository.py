from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models.seat import Seat
from app.schemas.seat import SeatCreate, SeatUpdate
from .base import BaseRepository

class SeatRepository(BaseRepository[Seat, SeatCreate, SeatUpdate]):
    def __init__(self, db: Session):
        super().__init__(Seat, db)
    
    def get_match_seats(self, match_id: int) -> List[Seat]:
        return (
            self.db.query(self.model)
            .filter(self.model.match_id == match_id)
            .all()
        )

    def get_available_seats(self, match_id: int) -> List[Seat]:
        return (
            self.db.query(self.model)
            .filter(
                and_(
                    self.model.match_id == match_id,
                    self.model.status == "AVAILABLE"
                )
            )
            .all()
        )

    def get_seat_by_position(
        self, 
        match_id: int, 
        row: int, 
        column: int
    ) -> Optional[Seat]:
        return (
            self.db.query(self.model)
            .filter(
                and_(
                    self.model.match_id == match_id,
                    self.model.row == row,
                    self.model.column == column
                )
            )
            .first()
        )

    def create_match_seats(
        self, 
        match_id: int, 
        rows: int, 
        columns: int
    ) -> List[Seat]:
        seats = []
        for row in range(1, rows + 1):
            for col in range(1, columns + 1):
                seat = Seat(
                    match_id=match_id,
                    row=row,
                    column=col,
                    status="AVAILABLE"
                )
                self.db.add(seat)
                seats.append(seat)
        
        self.db.commit()
        return seats

    def reserve_seat(self, seat_id: int) -> Optional[Seat]:
        seat = self.get(seat_id)
        if seat and seat.status == "AVAILABLE":
            seat.status = "RESERVED"
            self.db.commit()
            self.db.refresh(seat)
            return seat
        return None
