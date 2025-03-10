from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.dependencies import get_db
from app.core.security import get_current_user, get_current_admin_user
from app.repositories.user_repository import UserRepository
from app.schemas.user import User, UserUpdate
from app.models.user import User as UserModel

router = APIRouter()

@router.get("", response_model=List[User])
async def get_users(
    current_user: UserModel = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """
    F1: Get all unapproved users (Admin only)
    """
    user_repo = UserRepository(db)
    return user_repo.get_all()


@router.get("/un-approved", response_model=List[User])
async def get_unapproved_users(
    current_user: UserModel = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """
    F1: Get all unapproved users (Admin only)
    """
    user_repo = UserRepository(db)
    return user_repo.get_unapproved_users()

@router.post("/approve/{user_id}", response_model=User)
async def approve_user(
    user_id: int,
    current_user: UserModel = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """
    F1: Approve a specific user (Admin only)
    """
    user_repo = UserRepository(db)
    user = user_repo.get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user.approved:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is already approved"
        )
    
    return user_repo.approve_user(user_id)

print("wow")

@router.put("/me", response_model=User)
async def update_current_user(
    user_update:    UserUpdate,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update current user's information
    """
    print("wow")
    user_repo = UserRepository(db)
    
    # Check if email is being updated and is already taken
    if user_update.email and user_update.email != current_user.email:
        existing_user = user_repo.get_by_email(user_update.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
    
    try:
        updated_user = user_repo.update_user(current_user.id, user_update)
        return updated_user
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.delete("/{user_id}", response_model=User)
async def delete_user(
    user_id: int,
    current_user: UserModel = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """
    F2: Delete a user (Admin only)
    """
    if user_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    user_repo = UserRepository(db)
    user = user_repo.get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return user_repo.delete(user_id)

@router.get("/me", response_model=User)
async def get_current_user_details(
    current_user: UserModel = Depends(get_current_user),
):
    """
    Get current user details
    """
    return current_user