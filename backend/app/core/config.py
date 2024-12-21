from pydantic_settings  import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Football Booking System"
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
