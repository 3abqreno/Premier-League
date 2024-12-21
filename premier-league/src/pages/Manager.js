import React, { useEffect, useState } from 'react';
import Match from '../components/Match/Match';

const Manager = () => {
    const [matches, setMatches] = useState([]);

useEffect(() => {
    fetch('http://localhost:8000/match?skip=0&limit=100')
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
                ticketPrice: match.ticket_price,
                inReserve: false,
                InReservations: false,
                IsManager: true
            }));
            setMatches(formattedMatches);
        })
        .catch(error => console.error('Error fetching matches:', error));
}, []);

    return (
        <div className='text-black p-20'>
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>Current Matches</p>
            <div className='rounded-lg'>
                {matches.map(match => (
                    <Match key={match.matchId} {...match} />
                ))}
            </div>
        </div>
    );
};

export default Manager;