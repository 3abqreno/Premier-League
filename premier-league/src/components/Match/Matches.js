import React, { useEffect, useState } from 'react';
import Match from './Match';

const Matches = () => {
    const [matches, setMatches] = useState([
        {
          matchId: "1",
          homeTeam: "Team A",
          awayTeam: "Team B",
          homeScore: 2,
          awayScore: 1,
          date: "2023-10-15",
          venue: "Stadium XYZ",
          referee: "Referee Name",
          linesmen: ["Linesman 1", "Linesman 2"]
        },
        {
          matchId: "1",
          homeTeam: "Team C",
          awayTeam: "Team D",
          homeScore: 0,
          awayScore: 3,
          date: "2023-10-16",
          venue: "Stadium ABC",
          referee: "Another Referee",
          linesmen: ["Linesman 3", "Linesman 4"]
        },
        {
          matchId: "1",
          homeTeam: "Team C",
          awayTeam: "Team D",
          homeScore: 0,
          awayScore: 3,
          date: "2023-10-16",
          venue: "Stadium ABC",
          referee: "Another Referee",
          linesmen: ["Linesman 3", "Linesman 4"]
        },
        {
          matchId: "1",
          homeTeam: "Team C",
          awayTeam: "Team D",
          homeScore: 0,
          awayScore: 3,
          date: "2023-10-16",
          venue: "Stadium ABC",
          referee: "Another Referee",
          linesmen: ["Linesman 3", "Linesman 4"]
        },
        {
          matchId: "1",
          homeTeam: "Team C",
          awayTeam: "Team D",
          homeScore: 0,
          awayScore: 3,
          date: "2023-10-16",
          venue: "Stadium ABC",
          referee: "Another Referee",
          linesmen: ["Linesman 3", "Linesman 4"]
        },
        {
          matchId: "1",
          homeTeam: "Team C",
          awayTeam: "Team D",
          homeScore: 0,
          awayScore: 3,
          date: "2023-10-16",
          venue: "Stadium ABC",
          referee: "Another Referee",
          linesmen: ["Linesman 3", "Linesman 4"]
        }
        // Add more matches as needed
      ]);
    // useEffect(() => {
    //     // Replace with your API endpoint
    //     fetch('https://api.example.com/matches')
    //         .then(response => response.json())
    //         .then(data => setMatches(data))
    //         .catch(error => console.error('Error fetching matches:', error));
    // }, []);


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
                    linesmen={match.linesmen}
                />
            ))}
        </div>
    );
};

export default Matches;