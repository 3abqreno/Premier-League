from pydantic import BaseModel
from typing import Optional, List

class StadiumBase(BaseModel):
    name: str
    rows: int
    columns: int

class StadiumCreate(StadiumBase):
    pass

class StadiumUpdate(BaseModel):
    name: Optional[str] = None
    rows: Optional[int] = None
    columns: Optional[int] = None

class Stadium(StadiumBase):
    id: int

    class Config:
        from_attributes = True
