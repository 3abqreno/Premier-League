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

    def get_all(self, skip: int = 0, limit: int = 100) -> List[Stadium]:
        return (
            self.db.query(self.model)
            .order_by(self.model.name)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def create(self, schema: StadiumCreate) -> Stadium:
        db_obj = self.model(**schema.model_dump())
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj