from .user import User
from .team import Team
from .stadium import Stadium
from .match import Match
from .seat import Seat
from .reservation import Reservation

# This ensures all models are registered
__all__ = ['User', 'Team', 'Stadium', 'Match', 'Seat', 'Reservation']