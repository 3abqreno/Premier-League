from pydantic import BaseModel, validator, Field
from datetime import datetime
from typing import Optional, List
from decimal import Decimal
from .team import Team
from .seat import Seat
from .stadium import Stadium

class TeamInfo(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class MatchBase(BaseModel):
    home_team: int
    away_team: int
    venue_id: int
    date_time: datetime
    main_referee: str = Field(..., min_length=3, max_length=50)
    linesman_1: str = Field(..., min_length=3, max_length=50)
    linesman_2: str = Field(..., min_length=3, max_length=50)
    ticket_price: Decimal = Field(..., ge=0, decimal_places=2)
    status: str = "SCHEDULED"
    home_team_score: int = 0
    away_team_score: int = 0

    @validator('away_team')
    def teams_cannot_be_same(cls, v, values):
        if 'home_team' in values and v == values['home_team']:
            raise ValueError('Home team and away team cannot be the same')
        return v

    @validator('status')
    def status_must_be_valid(cls, v):
        valid_statuses = ["SCHEDULED", "ONGOING", "COMPLETED", "CANCELLED"]
        if v not in valid_statuses:
            raise ValueError(f'Status must be one of {valid_statuses}')
        return v

    @validator('date_time')
    def date_time_must_be_future(cls, v):
        if v < datetime.now():
            raise ValueError('Match date must be in the future')
        return v

class MatchCreate(MatchBase):
    pass

    class Config:
        json_schema_extra = {
            "example": {
                "home_team": 1,
                "away_team": 2,
                "venue_id": 1,
                "date_time": "2024-01-01T15:00:00",
                "main_referee": "John Smith",
                "linesman_1": "Mike Johnson",
                "linesman_2": "Tom Wilson",
                "ticket_price": "50.00"
            }
        }

class MatchUpdate(BaseModel):
    date_time: Optional[datetime] = None
    main_referee: Optional[str] = Field(None, min_length=3, max_length=50)
    linesman_1: Optional[str] = Field(None, min_length=3, max_length=50)
    linesman_2: Optional[str] = Field(None, min_length=3, max_length=50)
    ticket_price: Optional[Decimal] = Field(None, ge=0, decimal_places=2)
    status: Optional[str] = None
    home_team_score: Optional[int] = Field(None, ge=0)
    away_team_score: Optional[int] = Field(None, ge=0)

    @validator('status')
    def status_must_be_valid(cls, v):
        if v is not None:
            valid_statuses = ["SCHEDULED", "ONGOING", "COMPLETED", "CANCELLED"]
            if v not in valid_statuses:
                raise ValueError(f'Status must be one of {valid_statuses}')
        return v

    @validator('date_time')
    def date_time_must_be_future(cls, v):
        if v is not None and v < datetime.now():
            raise ValueError('Match date must be in the future')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "date_time": "2024-01-01T15:00:00",
                "main_referee": "New Referee",
                "ticket_price": "55.00",
                "status": "ONGOING",
                "home_team_score": 2,
                "away_team_score": 1
            }
        }

class Match(MatchBase):
    id: int
    home_team_rel: TeamInfo
    away_team_rel: TeamInfo
    stadium: Optional[Stadium] = None
    available_seats: Optional[int] = None

    class Config:
        from_attributes = True

    @validator('available_seats', always=True)
    def set_available_seats(cls, v, values):
        if hasattr(values.get('__object__', {}), 'get_available_seats_count'):
            return values['__object__'].get_available_seats_count()
        return v or 0

class MatchWithSeats(Match):
    seats: List[Seat]

    class Config:
        from_attributes = True

class MatchList(BaseModel):
    items: List[Match]
    total: int
    skip: int
    limit: int

    class Config:
        from_attributes = True