from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.team import Team
from app.schemas.team import TeamCreate, TeamUpdate
from .base import BaseRepository

class TeamRepository(BaseRepository[Team, TeamCreate, TeamUpdate]):
    def __init__(self, db: Session):
        super().__init__(Team, db)
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[Team]:
        return self.db.query(self.model).offset(skip).limit(limit).all()
    
    def get_by_id(self, team_id: int) -> Optional[Team]:
        return self.db.query(self.model).filter(self.model.id == team_id).first()
