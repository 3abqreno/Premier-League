from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReservationCreate(BaseModel):
    seat_id: int
    match_id: int

class ReservationResponse(BaseModel):
    user_id: int
    seat_id: int
    reservation_date: datetime
    id: int
    match_id: int
    ticket_number: str

    class Config:
        from_attributes = True

class ReservationDetails(ReservationResponse):
    can_cancel: bool = False

    class Config:
        from_attributes = True
