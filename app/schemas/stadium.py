from pydantic import BaseModel, Field, validator
from typing import Optional

class StadiumBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    rows: int = Field(..., gt=0)
    columns: int = Field(..., gt=0)

    @validator('rows')
    def validate_rows(cls, v):
        if v <= 0:
            raise ValueError('Number of rows must be positive')
        if v > 100:  # You can adjust this limit
            raise ValueError('Number of rows exceeds maximum limit')
        return v

    @validator('columns')
    def validate_columns(cls, v):
        if v <= 0:
            raise ValueError('Number of columns must be positive')
        if v > 100:  # You can adjust this limit
            raise ValueError('Number of columns exceeds maximum limit')
        return v

class StadiumCreate(StadiumBase):
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Main Stadium",
                "rows": 20,
                "columns": 30
            }
        }

class StadiumUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    rows: Optional[int] = Field(None, gt=0)
    columns: Optional[int] = Field(None, gt=0)

    @validator('rows')
    def validate_rows(cls, v):
        if v is not None:
            if v <= 0:
                raise ValueError('Number of rows must be positive')
            if v > 100:
                raise ValueError('Number of rows exceeds maximum limit')
        return v

    @validator('columns')
    def validate_columns(cls, v):
        if v is not None:
            if v <= 0:
                raise ValueError('Number of columns must be positive')
            if v > 100:
                raise ValueError('Number of columns exceeds maximum limit')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Updated Stadium Name",
                "rows": 25,
                "columns": 35
            }
        }

class Stadium(StadiumBase):
    id: int
    total_capacity: Optional[int] = None

    @validator('total_capacity', always=True)
    def calculate_capacity(cls, v, values):
        if 'rows' in values and 'columns' in values:
            return values['rows'] * values['columns']
        return v

    class Config:
        from_attributes = True