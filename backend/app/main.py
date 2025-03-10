from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, team, match, user, stadium, reservation

app = FastAPI(
    title="Football Booking System",
    version="1.0.0",
    description="API documentation for the Football Booking System",
    redoc_url=None,
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(team.router, prefix="/api/team", tags=["Teams"])
app.include_router(match.router, prefix="/api/match", tags=["Matches"])
app.include_router(user.router, prefix="/api/user", tags=["Users"])
app.include_router(stadium.router, prefix="/api/stadium", tags=["Stadiums"])
app.include_router(reservation.router, prefix="/api/reservation", tags=["Reservations"])

@app.get("/api/")
async def root():
    return {"message": "Welcome to Football Booking System"}