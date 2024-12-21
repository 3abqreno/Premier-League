import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Match from '../components/Match/Match';
import Seats from '../components/Seats/Seats';
import { useLocation, useNavigate } from 'react-router-dom';

const Reserve = () => {
    const location = useLocation();
    const details = location.state || {};
    const [manager, setManager] = useState(details.IsManager);
    const [cancel, setCancel] = useState(details.IsCancel);
    const [reservedSeatId, setReservedSeatId] = useState(details.reservedSeatId);
    const [reservationId, setReservationId] = useState(details.reservationId);
    const {
        matchId = '',
        homeTeam = '',
        awayTeam = '',
        date = '',
        venue = '',
        referee = '',
        linesman1 = '',
        linesman2 = '',
        ticketPrice = '',
        inReserve = true,
        InReservations = false,
    } = details;
    const [matchDetails, setMatchDetails] = useState(details);

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/match/${matchId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                const vacantSeats = Array(data.stadium.rows).fill().map(() => Array(data.stadium.columns).fill(1));
                const vacantSeatsId = Array(data.stadium.rows).fill().map(() => Array(data.stadium.columns).fill(0));

                for (let i = 0; i < data.seats.length; i++) {
                    const row = data.seats[i].row;
                    const column = data.seats[i].column;
                    if (data.seats[i].status === 'AVAILABLE') {
                        vacantSeats[row-1][column-1] = 0;
                        vacantSeatsId[row-1][column-1] = data.seats[i].id;
                    }
                }                

                setMatchDetails({
                    matchId: data.id,
                    homeTeam: data.home_team_rel.name,
                    awayTeam: data.away_team_rel.name,
                    date: data.date_time,
                    venue: data.stadium.name,
                    referee: data.main_referee,
                    linesman1: data.linesman_1,
                    linesman2: data.linesman_2,
                    ticketPrice: data.ticket_price,
                    vacantSeats: vacantSeats, 
                    vacantSeatsId: vacantSeatsId,       
                    inReserve: true,
                    InReservations: false,
                });
            
            } catch (error) {
                console.error('Error fetching match details:', error);
            }
        };

        fetchMatchDetails();
    }, [matchId]);

    if (!matchDetails) {
        return <div>Loading...</div>;
    }
    

    return (
        <div className='p-20'>
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>Match {manager ? 'Details' : "Reservation"}</p>
            <Match
                matchId={matchId}
                homeTeam={matchDetails.homeTeam}
                awayTeam={matchDetails.awayTeam}
                date={matchDetails.date.split('T')[0]} 
                venue={matchDetails.venue}
                referee={matchDetails.referee}
                linesmen={[matchDetails.linesman1, matchDetails.linesman2]}
                ticketPrice={matchDetails.ticketPrice}
                inReserve={true}
            />
            <p className='text-2xl gradientbg rounded-md mb-2 p-2 text-center font-bold w-full'>Vacant Seats</p>
            <Seats vacantSeats={matchDetails.vacantSeats} vacantSeatsId= {matchDetails.vacantSeatsId} IsManager={manager} IsCreate={false} matchId={matchId} IsCancel={cancel} seat_id={reservedSeatId} reservationId={reservationId}/>
        </div>
    );
};

export default Reserve;