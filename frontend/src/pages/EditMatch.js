import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Match from '../components/Match/Match';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        date: IsNew ? '' : date.split('T')[0],
        venue: IsNew ? '' : venue,
        referee: IsNew ? '' : referee,
        linesman1: IsNew ? '' : linesman1,
        linesman2: IsNew ? '' : linesman2,
        ticketPrice: IsNew ? '' : ticketPrice,
        homeTeamId: null,
        awayTeamId: null
    });

    const [stadiums, setStadiums] = useState([]);
    const [teams, setTeams] = useState([]);
    const [venueId, setVenueId] = useState(null);

    useEffect(() => {
        const fetchStadiums = async () => {
            try {
                const response = await fetch('http://localhost/api/stadium?skip=0&limit=100');
                const data = await response.json();
                setStadiums(data);
            } catch (error) {
                toast.error('Error fetching stadiums');
                console.error('Error fetching stadiums:', error);
            }
        };

        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost/api/team?skip=0&limit=100');
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                toast.error('Error fetching teams');
                console.error('Error fetching teams:', error);
            }
        };

        fetchStadiums();
        fetchTeams();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'venue') {
            const selectedVenue = stadiums.find(stadium => stadium.name === value);
            setVenueId(selectedVenue ? selectedVenue.id : null);
        }

        if (name === 'homeTeam') {
            const selectedTeam = teams.find(team => team.name === value);
            setFormData({
                ...formData,
                homeTeam: value,
                homeTeamId: selectedTeam ? selectedTeam.id : null
            });
        }

        if (name === 'awayTeam') {
            const selectedTeam = teams.find(team => team.name === value);
            setFormData({
                ...formData,
                awayTeam: value,
                awayTeamId: selectedTeam ? selectedTeam.id : null
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(formData).some(field => field === '') || !venueId) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (IsNew && new Date(formData.date) < new Date()) {
            toast.error('Date cannot be in the past for a new match.');
            return;
        }
        
        const matchData = {
            home_team: formData.homeTeamId,
            away_team: formData.awayTeamId,
            date_time: formData.date + 'T15:00:00',
            linesman_1: formData.linesman1,
            linesman_2: formData.linesman2,
            main_referee: formData.referee,
            ticket_price: formData.ticketPrice,
            venue_id: venueId
        };
        console.log(matchData);
        
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await fetch('http://localhost/api/match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(matchData)
            });

            if (response.ok) {
                toast.success('Match created successfully');
            } else {
                toast.error('Error creating match');
                console.error('Error creating match:', response.statusText);
            }
        } catch (error) {
            toast.error('Error creating match');
            console.error('Error creating match:', error);
        }
    };

    const filteredAwayTeams = teams.filter(team => team.name !== formData.homeTeam);
    const filteredHomeTeams = teams.filter(team => team.name !== formData.awayTeam);

    return (
        <div className='p-20'>
            <ToastContainer />
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
                        <select
                            name="homeTeam"
                            value={formData.homeTeam}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        >
                            <option value="">Select Home Team</option>
                            {filteredHomeTeams.map((team, index) => (
                                <option key={index} value={team.name}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-black font-bold mb-2">Away Team:</label>
                        <select
                            name="awayTeam"
                            value={formData.awayTeam}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md bg-primary"
                        >
                            <option value="">Select Away Team</option>
                            {filteredAwayTeams.map((team, index) => (
                                <option key={index} value={team.name}>{team.name}</option>
                            ))}
                        </select>
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
                            <option value="">Select Venue</option>
                            {stadiums.map((stadium, index) => (
                                <option key={index} value={stadium.name}>{stadium.name}</option>
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