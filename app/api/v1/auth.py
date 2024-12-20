from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.core.security import create_access_token
from app.core.config import settings
from app.repositories.user_repository import UserRepository
from app.db.dependencies import get_user_repository
from app.schemas.user import User, UserCreate
from app.schemas.auth import LoginRequest, Token

router = APIRouter()

@router.post("/login", response_model=Token)
def login(
    login_data: LoginRequest,
    user_repo: UserRepository = Depends(get_user_repository)
):
    user = user_repo.authenticate(login_data.username, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    if not user.approved:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not approved",
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role}, expires_delta=access_token_expires
    )

    return Token(access_token=access_token, token_type="bearer")

@router.post("/register", response_model=User)
def register(
    user_in: UserCreate,
    user_repo: UserRepository = Depends(get_user_repository)
):
    user = user_repo.get_by_email(user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    user = user_repo.get_by_username(user_in.username)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    return user_repo.create(user_in)