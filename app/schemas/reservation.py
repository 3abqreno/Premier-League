from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReservationBase(BaseModel):
    user_id: int
    seat_id: int
    match_id: int
    ticket_number: str

class ReservationCreate(BaseModel):
    seat_id: int
    match_id: int

class ReservationUpdate(BaseModel):
    ticket_number: Optional[str] = None

class Reservation(ReservationBase):
    id: int
    reservation_date: datetime

    class Config:
        from_attributes = True

class ReservationDetail(Reservation):
    seat_row: Optional[int] = None
    seat_column: Optional[int] = None
    match_date: Optional[datetime] = None
    home_team_name: Optional[str] = None
    away_team_name: Optional[str] = None

    class Config:
        from_attributes = Truefrom pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReservationBase(BaseModel):
    user_id: int
    seat_id: int
    match_id: int
    ticket_number: str

class ReservationCreate(BaseModel):
    seat_id: int
    match_id: int

class ReservationUpdate(BaseModel):
    ticket_number: Optional[str] = None

class Reservation(ReservationBase):
    id: int
    reservation_date: datetime

    class Config:
        from_attributes = True

class ReservationDetail(Reservation):
    seat_row: Optional[int] = None
    seat_column: Optional[int] = None
    match_date: Optional[datetime] = None
    home_team_name: Optional[str] = None
    away_team_name: Optional[str] = None

    class Config:
        from_attributes = True
