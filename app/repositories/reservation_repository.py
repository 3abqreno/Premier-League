from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_
from datetime import datetime
import uuid
from app.models.reservation import Reservation
from app.models.seat import Seat
from app.models.match import Match
from app.schemas.reservation import ReservationCreate
from .base import BaseRepository

class ReservationRepository(BaseRepository[Reservation, ReservationCreate, None]):
    def __init__(self, db: Session):
        super().__init__(Reservation, db)

    def get_with_match_details(self, reservation_id: int) -> Optional[Reservation]:
        """Get reservation with match details"""
        return (
            self.db.query(self.model)
            .options(
                joinedload(self.model.match),
                joinedload(self.model.seat)
            )
            .filter(self.model.id == reservation_id)
            .first()
        )

    def get_user_reservations(self, user_id: int) -> List[Reservation]:
        """Get all reservations for a user with match and seat details"""
        return (
            self.db.query(self.model)
            .options(
                joinedload(self.model.match),
                joinedload(self.model.seat)
            )
            .filter(self.model.user_id == user_id)
            .order_by(self.model.reservation_date.desc())
            .all()
        )

    def create_reservation(
        self, 
        user_id: int, 
        seat_id: int, 
        match_id: int
    ) -> Optional[Reservation]:
        """Create a new reservation"""
        # Check if seat exists and is available
        seat = self.db.query(Seat).filter(Seat.id == seat_id).first()
        if not seat:
            raise ValueError("Seat not found")
        
        if seat.status != "AVAILABLE":
            raise ValueError("Seat is not available")

        # Check if match exists and is in the future
        match = self.db.query(Match).filter(Match.id == match_id).first()
        if not match:
            raise ValueError("Match not found")
        
        if match.date_time <= datetime.now():
            raise ValueError("Cannot reserve seats for past matches")

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
        except Exception as e:
            self.db.rollback()
            raise ValueError(f"Error creating reservation: {str(e)}")

    def cancel_reservation(self, reservation_id: int) -> bool:
        """Cancel a reservation and free up the seat"""
        reservation = self.get_with_match_details(reservation_id)
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
