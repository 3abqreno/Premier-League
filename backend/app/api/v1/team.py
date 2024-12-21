from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.dependencies import get_db
from app.repositories.team_repository import TeamRepository
from app.schemas.team import Team

router = APIRouter()

@router.get("", response_model=List[Team])
def get_teams(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Retrieve all teams.
    """
    team_repo = TeamRepository(db)
    teams = team_repo.get_all(skip=skip, limit=limit)
    return teams

@router.get("/{team_id}", response_model=Team)
def get_team(
    team_id: int,
    db: Session = Depends(get_db)
):
    """
    Retrieve a specific team by ID.
    """
    team_repo = TeamRepository(db)
    team = team_repo.get_by_id(team_id)
    if team is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Team not found"
        )
    return team
