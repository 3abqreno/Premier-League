import React, { useEffect, useState } from 'react';
import Match from './Match';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    fetch('http://localhost/api/match?skip=0&limit=100')
      .then(response => response.json())
      .then(data => {
        const formattedMatches = data.map(match => ({
          matchId: match.id,
          homeTeam: match.home_team_rel.name,
          awayTeam: match.away_team_rel.name,
          homeScore: match.home_team_score,
          awayScore: match.away_team_score,
          date: match.date_time,
          venue: match.stadium.name,
          referee: match.main_referee,
          linesmen: [match.linesman_1, match.linesman_2],
          ticket_price: match.ticket_price,
        }));
        
        setMatches(formattedMatches);
        console.log(data);
        
      })
      .catch(error => console.error('Error fetching matches:', error));
  }, []);


  return (
    <div className="p-20">
      {matches.map(match => (
        <Match
          matchId={match.matchId}
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
          homeScore={match.homeScore}
          awayScore={match.awayScore}
          date={match.date}
          venue={match.venue}
          referee={match.referee}
          ticketPrice={match.ticket_price}
          linesmen={match.linesmen}
        />
      ))}
    </div>
  );
};

export default Matches;