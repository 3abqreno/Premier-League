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

class ReservationListResponse(BaseModel):
    reservations: list[ReservationResponse]

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "message": "Reservations created successfully",
                "reservations": [
                    {
                        "id": 1,
                        "ticket_number": "TKT-A1B2C3D4",
                        "match_date": "2024-01-01T15:00:00",
                        "match_home_team": "Team A",
                        "match_away_team": "Team B",
                        "seat_row": 1,
                        "seat_column": 1
                    }
                ]
            }
        }

class ReservationDetails(ReservationResponse):
    can_cancel: bool = False

    class Config:
        from_attributes = True
