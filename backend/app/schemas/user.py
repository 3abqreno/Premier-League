from typing import Optional
from datetime import date, datetime
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    username: str
    email: EmailStr
    first_name: str
    last_name: str
    birth_date: date
    gender: Optional[str]
    city: Optional[str]
    address: Optional[str]
    role: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr]
    first_name: Optional[str]
    last_name: Optional[str]
    city: Optional[str]
    address: Optional[str]

class User(UserBase):
    id: int
    created_at: datetime
    approved: bool

    class Config:
        orm_mode = True
