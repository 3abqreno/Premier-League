import React, { useEffect, useState } from 'react';
import Match from '../components/Match/Match';

const UserReservations = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        // Simulate an API call
        const fetchData = async () => {
            // API call would go here
            const staticData = [
                {
                    matchId: 1,
                    homeTeam: 'Team A',
                    awayTeam: 'Team B',
                    date: '2023-10-01',
                    venue: 'Stadium 1',
                    referee: 'Referee 1',
                    linesmen: ['Linesman 1', 'Linesman 2'],
                    ticketPrice: 50,
                    inReserve: false,
                    InReservations: true
                },
                {
                    matchId: 2,
                    homeTeam: 'Team C',
                    awayTeam: 'Team D',
                    date: '2023-10-02',
                    venue: 'Stadium 2',
                    referee: 'Referee 2',
                    linesmen: ['Linesman 3', 'Linesman 4'],
                    ticketPrice: 60,
                    inReserve: false,
                    InReservations: true
                }
            ];
            setMatches(staticData);
        };

        fetchData();
    }, []);

    return (
        <div className='text-black p-20'>
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>My Reservations</p>
            <div className='rounded-lg'>
                {matches.map(match => (
                    <Match key={match.matchId} {...match} />
                ))}
            </div>
        </div>
    );
};

export default UserReservations;