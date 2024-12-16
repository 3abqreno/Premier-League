import React from 'react';
import './Match.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Match = ({ matchId, homeTeam, awayTeam, date, venue, referee, linesmen, ticketPrice, inReserve, InReservations, IsManager }) => {
    const navigate = useNavigate();

    const handleReserveClick = () => {
        navigate(`/reserve?matchId=${matchId}`, { state: { IsManager } });
    };
    const handleEditClick = () => {
        navigate(`/edit-match`, { state: { IsNew:"False" } });
    };

    return (
        <div className="flex justify-center p-4 ">
            <div className={`match-container rounded-lg overflow-hidden shadow-lg p-4 bg-secondary w-4/6 ${inReserve ? '' : 'matchcard'}`}>
                <div className="flex justify-between items-center mb-4 shadow-2xl bg-primary p-4 rounded-xl min-h-10">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-black">{homeTeam}</h2>
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-black">{awayTeam}</h2>
                    </div>
                </div>
                <div className="text-center text-black font-bold mb-4">Date: {date}</div>
                <div className="text-center text-black font-bold mb-4">Venue: {venue}</div>
                <div className="text-center text-black font-bold mb-4">Referee: {referee}</div>
                <div className="text-center text-black font-bold mb-4">Linesman1: {linesmen[0]}</div>
                <div className="text-center text-black font-bold mb-4">Linesman2: {linesmen[1]}</div>
                <div className="text-center text-black font-bold mb-4">Ticket Price: {ticketPrice}</div>
                {IsManager ? <div className='flex space-around w-full p-4'>
                    <button className="edit-button w-2/5" onClick={handleEditClick}>Edit Match</button>
                    <button className="view-button w-2/5" onClick={handleReserveClick}>View Details</button>
                </div> : <button className="reserve-button" onClick={handleReserveClick}>{InReservations ? "Cancel" : "Reserve"}</button>
                }
            </div>
        </div>
    );
};

export default Match;