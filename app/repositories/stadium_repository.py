from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.stadium import Stadium
from app.schemas.stadium import StadiumCreate, StadiumUpdate
from .base import BaseRepository

class StadiumRepository(BaseRepository[Stadium, StadiumCreate, StadiumUpdate]):
    def __init__(self, db: Session):
        super().__init__(Stadium, db)
    
    def get_by_name(self, name: str) -> Optional[Stadium]:
        return (
            self.db.query(self.model)
            .filter(self.model.name == name)
            .first()
        )
