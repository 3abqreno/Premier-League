from pydantic import BaseModel, validator
from typing import Optional

class SeatBase(BaseModel):
    match_id: int
    row: int
    column: int
    status: str = "AVAILABLE"

    @validator('status')
    def validate_status(cls, v):
        if v not in ["AVAILABLE", "RESERVED"]:
            raise ValueError('Status must be either AVAILABLE or RESERVED')
        return v

class SeatCreate(SeatBase):
    pass

class SeatUpdate(BaseModel):
    status: Optional[str] = None

    @validator('status')
    def validate_status(cls, v):
        if v is not None and v not in ["AVAILABLE", "RESERVED"]:
            raise ValueError('Status must be either AVAILABLE or RESERVED')
        return v

class Seat(SeatBase):
    id: int

    class Config:
        from_attributes = True

class SeatWithDetails(Seat):
    match_id: int
    reservation_id: Optional[int] = None

    class Config:
        from_attributes = True
