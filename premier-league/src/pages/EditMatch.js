import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Match from '../components/Match/Match';

const EditMatch = ({ IsNew }) => {
    const location = useLocation();
    const matchDetails = location.state || {};
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
        IsManager = false
    } = matchDetails;

    const [formData, setFormData] = useState({
        homeTeam: IsNew ? '' : homeTeam,
        awayTeam: IsNew ? '' : awayTeam,
        date: IsNew ? '' : date,
        venue: IsNew ? '' : venue,
        referee: IsNew ? '' : referee,
        linesman1: IsNew ? '' : linesman1,
        linesman2: IsNew ? '' : linesman2,
        ticketPrice: IsNew ? '' : ticketPrice
    });

    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        // Mock API call to get stadiums
        const fetchStadiums = async () => {
            const data = ['Stadium A', 'Stadium B', 'Stadium C', 'Stadium D', 'Stadium E'];
            setStadiums(data);
        };

        fetchStadiums();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make API call with formData
        console.log('Form data to be sent to backend:', formData);
        // Example API call
        // fetch(IsNew ? '/api/addMatch' : '/api/updateMatch', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // });
    };

    return (
        <div className='p-20'>
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>{IsNew ? 'New Match' : 'Edit Match'} Details</p>
            <Match
                matchId={matchId}
                homeTeam={formData.homeTeam}
                awayTeam={formData.awayTeam}
                date={formData.date}
                venue={formData.venue}
                referee={formData.referee}
                linesmen={[formData.linesman1, formData.linesman2]}
                ticketPrice={formData.ticketPrice}
                inReserve={inReserve}
            />
            <form onSubmit={handleSubmit} className='gradientbg p-4 rounded-lg shadow-lg'>
                <div className="grid grid-cols-2 gap-4 ">
                    <div>
                        <label className="block text-black font-bold mb-2">Home Team:</label>
                        <input
                            type="text"
                            name="homeTeam"
                            value={formData.homeTeam}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-black font-bold mb-2">Away Team:</label>
                        <input
                            type="text"
                            name="awayTeam"
                            value={formData.awayTeam}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-black font-bold mb-2">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-black font-bold mb-2">Venue:</label>
                        <select
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        >
                            {stadiums.map((stadium, index) => (
                                <option key={index} value={stadium}>{stadium}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-black font-bold mb-2">Referee:</label>
                        <input
                            type="text"
                            name="referee"
                            value={formData.referee}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-black font-bold mb-2">Linesman 1:</label>
                        <input
                            type="text"
                            name="linesman1"
                            value={formData.linesman1}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-black font-bold mb-2">Linesman 2:</label>
                        <input
                            type="text"
                            name="linesman2"
                            value={formData.linesman2}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-black font-bold mb-2">Ticket Price:</label>
                        <input
                            type="number"
                            name="ticketPrice"
                            value={formData.ticketPrice}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="mt-4 bg-alternate text-white p-2 rounded-md w-1/2">{IsNew ? 'Add Match' : 'Update'}</button>
                </div>
            </form>
        </div>
    );
};

export default EditMatch;