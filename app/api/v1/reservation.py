from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
from app.db.dependencies import get_db
from app.core.security import get_current_user
from app.repositories.reservation_repository import ReservationRepository
from app.schemas.reservation import ReservationCreate, ReservationResponse
from app.models.user import User

router = APIRouter()

@router.post("", response_model=ReservationResponse)
async def create_reservation(
    reservation: ReservationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    F10: Create a new reservation
    """
    reservation_repo = ReservationRepository(db)
    
    try:
        return reservation_repo.create_reservation(
            user_id=current_user.id,
            seat_id=reservation.seat_id,
            match_id=reservation.match_id
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.delete("/{reservation_id}")
async def cancel_reservation(
    reservation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    F11: Cancel a reservation (only allowed 3 days before the match)
    """
    reservation_repo = ReservationRepository(db)
    reservation = reservation_repo.get_with_match_details(reservation_id)
    
    if not reservation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reservation not found"
        )
    
    # Check if this is the user's reservation
    if reservation.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to cancel this reservation"
        )
    
    # Check if cancellation is within allowed timeframe
    if reservation.match.date_time - datetime.now() < timedelta(days=3):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reservations can only be cancelled at least 3 days before the match"
        )
    
    reservation_repo.cancel_reservation(reservation_id)
    return {"message": "Reservation cancelled successfully"}

@router.get("/me", response_model=List[ReservationResponse])
async def get_my_reservations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get current user's reservations
    """
    reservation_repo = ReservationRepository(db)
    return reservation_repo.get_user_reservations(current_user.id)
