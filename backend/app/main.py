from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, team, match, user, stadium, reservation

app = FastAPI(title="Football Booking System")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(team.router, prefix="/team", tags=["Teams"])
app.include_router(match.router, prefix="/match", tags=["Matches"])
app.include_router(user.router, prefix="/user", tags=["Users"])
app.include_router(stadium.router, prefix="/stadium", tags=["Stadiums"])
app.include_router(reservation.router, prefix="/reservation", tags=["Reservations"])

@app.get("/")
async def root():
    return {"message": "Welcome to Football Booking System"}