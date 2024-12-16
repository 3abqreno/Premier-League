import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Match from '../components/Match/Match';
import Seats from '../components/Seats/Seats';
import { useLocation, useNavigate } from 'react-router-dom';

const Reserve = () => {
    const { matchId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { IsManager } = location.state || {};
    const [matchDetails, setMatchDetails] = useState(null);

    useEffect(() => {
        // Replace with actual API call
        const fetchMatchDetails = async () => {
            try {
                const response = await fetch(`/api/matches/${matchId}`);
                const data = await response.json();
                setMatchDetails(data);
            } catch (error) {
                console.error('Error fetching match details:', error);
                // Use static data as fallback
                setMatchDetails({
                    homeTeam: 'Team A',
                    awayTeam: 'Team B',
                    venue: 'Stadium X',
                    dateTime: '2023-10-15',
                    mainReferee: 'Referee Y',
                    linesmen: ['Linesman 1', 'Linesman 2'],
                    ticketPrice: 50,
                    vacantSeats: [
                        [true, true, false],
                        [false, true, true],
                        [true, false, true]
                    ]
                });
            }
        };

        fetchMatchDetails();
    }, [matchId]);

    if (!matchDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-20'>
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>Match {IsManager ? 'Details' : "Reservation"}</p>
            <Match
                matchId={matchId}
                homeTeam={matchDetails.homeTeam}
                awayTeam={matchDetails.awayTeam}
                homeScore={matchDetails.homeScore}
                awayScore={matchDetails.awayScore}
                date={matchDetails.dateTime}
                venue={matchDetails.venue}
                referee={matchDetails.mainReferee}
                linesmen={matchDetails.linesmen}
                ticketPrice={matchDetails.ticketPrice}
                inReserve={true}
            />
            <p className='text-2xl gradientbg rounded-md mb-2 p-2 text-center font-bold w-full'>Vacant Seats</p>
            <Seats vacantSeats={matchDetails.vacantSeats} IsManager={IsManager} />
        </div>
    );
};

export default Reserve;