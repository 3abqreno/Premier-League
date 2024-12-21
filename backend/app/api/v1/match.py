from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.security import get_db, get_current_manager_user
from app.repositories.match_repository import MatchRepository
from app.schemas.match import Match, MatchCreate, MatchUpdate, MatchWithSeats
from app.models.user import User

router = APIRouter()

@router.post("", response_model=Match)
def create_match(
    match_data: MatchCreate,
    current_user: User = Depends(get_current_manager_user),
    db: Session = Depends(get_db)
):
    """
    F3: Create a new match (Admin only)
    """
    
    match_repo = MatchRepository(db)
    return match_repo.create_match_with_seats(match_data)

@router.put("/{match_id}", response_model=Match)
def update_match(
    match_id: int,
    match_data: MatchUpdate,
    current_user: User = Depends(get_current_manager_user),
    db: Session = Depends(get_db)
):
    """
    F4: Update match details (Admin only)
    Cannot change stadium once match is created
    """
    match_repo = MatchRepository(db)
    match = match_repo.get(match_id)
    if not match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )

    updated_match = match_repo.update(match, match_data)
    return updated_match

@router.get("/{match_id}", response_model=MatchWithSeats)
def get_match(
    match_id: int,
    db: Session = Depends(get_db)
):
    """
    F6, F9, F14: View a single match details
    """
    match_repo = MatchRepository(db)
    match = match_repo.get_match_with_details(match_id)
    print(match.seats[0])
    if not match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )
    return match

@router.get("", response_model=List[Match])
def get_matches(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    F6, F9, F14: View all matches
    """
    match_repo = MatchRepository(db)
    return match_repo.get_all_with_details(skip=skip, limit=limit)
