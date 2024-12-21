from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from .base import BaseRepository
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    def __init__(self, db: Session):
        super().__init__(User, db)

    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()

    def get_by_username(self, username: str) -> Optional[User]:
        return self.db.query(User).filter(User.username == username).first()

    def get_unapproved_users(self, skip: int = 0, limit: int = 100) -> List[User]:
        return (
            self.db.query(User)
            .filter(User.approved == False)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def create(self, schema: UserCreate) -> User:
        db_obj = User(
            **schema.model_dump(exclude={'password'}),
            password=pwd_context.hash(schema.password)
        )
        self.db.add(db_obj)
        self.db.commit()
        self.db.refresh(db_obj)
        return db_obj

    def approve_user(self, user_id: int) -> Optional[User]:
        user = self.get(user_id)
        if user:
            user.approved = True
            self.db.commit()
            self.db.refresh(user)
        return user

    def authenticate(self, username: str, password: str) -> Optional[User]:
        user = self.get_by_username(username)
        if not user:
            return None
        if not pwd_context.verify(password, user.password):
            return None
        return user

    def update_user(self, user_id: int, user_update: UserUpdate) -> Optional[User]:
        """
        Update user information.
        Only updates the fields that are provided in the user_update schema.
        """
        user = self.get(user_id)
        if not user:
            return None

        # Get only the fields that were provided (not None)
        update_data = user_update.model_dump(exclude_unset=True)
        
        # If email is being updated, check if it's already taken
        if 'email' in update_data and update_data['email'] != user.email:
            existing_user = self.get_by_email(update_data['email'])
            if existing_user:
                raise ValueError("Email already registered")

        try:
            # Update user fields
            for field, value in update_data.items():
                # Skip password field if it exists in update_data
                if field != 'password':
                    setattr(user, field, value)

            self.db.commit()
            self.db.refresh(user)
            return user
            
        except Exception as e:
            self.db.rollback()
            raise ValueError(f"Error updating user: {str(e)}")