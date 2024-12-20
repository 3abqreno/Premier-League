from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime
import uuid
from app.models.reservation import Reservation
from app.models.seat import Seat
from app.schemas.reservation import ReservationCreate
from .base import BaseRepository

class ReservationRepository(BaseRepository[Reservation, ReservationCreate, None]):
    def __init__(self, db: Session):
        super().__init__(Reservation, db)

    def get_user_reservations(self, user_id: int) -> List[Reservation]:
        return (
            self.db.query(self.model)
            .filter(self.model.user_id == user_id)
            .order_by(self.model.reservation_date.desc())
            .all()
        )

    def get_match_reservations(self, match_id: int) -> List[Reservation]:
        return (
            self.db.query(self.model)
            .filter(self.model.match_id == match_id)
            .all()
        )

    def create_reservation(
        self, 
        user_id: int, 
        seat_id: int, 
        match_id: int
    ) -> Optional[Reservation]:
        # Check if seat is available
        seat = self.db.query(Seat).filter(Seat.id == seat_id).first()
        if not seat or seat.status != "AVAILABLE":
            return None

        # Generate unique ticket number
        ticket_number = f"TKT-{uuid.uuid4().hex[:8].upper()}"

        # Create reservation
        reservation = Reservation(
            user_id=user_id,
            seat_id=seat_id,
            match_id=match_id,
            ticket_number=ticket_number
        )

        # Update seat status
        seat.status = "RESERVED"

        try:
            self.db.add(reservation)
            self.db.commit()
            self.db.refresh(reservation)
            return reservation
        except Exception:
            self.db.rollback()
            return None

    def cancel_reservation(self, reservation_id: int, user_id: int) -> bool:
        reservation = (
            self.db.query(self.model)
            .filter(
                and_(
                    self.model.id == reservation_id,
                    self.model.user_id == user_id
                )
            )
            .first()
        )

        if not reservation:
            return False

        try:
            # Update seat status back to available
            reservation.seat.status = "AVAILABLE"
            
            # Delete reservation
            self.db.delete(reservation)
            self.db.commit()
            return True
        except Exception:
            self.db.rollback()
            return False

    def get_by_ticket_number(self, ticket_number: str) -> Optional[Reservation]:
        return (
            self.db.query(self.model)
            .filter(self.model.ticket_number == ticket_number)
            .first()
        )
