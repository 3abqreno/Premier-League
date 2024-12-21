from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.dependencies import get_db
from app.core.security import get_current_manager_user
from app.repositories.stadium_repository import StadiumRepository
from app.schemas.stadium import Stadium, StadiumCreate
from app.models.user import User

router = APIRouter()

@router.post("", response_model=Stadium)
async def create_stadium(
    stadium: StadiumCreate,
    current_user: User = Depends(get_current_manager_user),
    db: Session = Depends(get_db)
):
    """
    F5: Create a new stadium (Admin only)
    """
    stadium_repo = StadiumRepository(db)
    
    # Check if stadium with same name exists
    existing_stadium = stadium_repo.get_by_name(stadium.name)
    if existing_stadium:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Stadium with this name already exists"
        )
    
    return stadium_repo.create(stadium)

@router.get("", response_model=List[Stadium])
async def get_stadiums(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    F3: Get all stadiums (Public endpoint)
    """
    stadium_repo = StadiumRepository(db)
    return stadium_repo.get_all(skip=skip, limit=limit)