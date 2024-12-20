import React, { useState } from 'react';
import Seats from '../components/Seats/Seats';


const AddStadium = () => {

    const [formData, setFormData] = useState({
        venueName: '',
        ticketPrice: 0,
        seats: []
    });

    const [stadiumSeats, setStadiumsSeats] = useState(["7*7","8*8","9*9","10*10"]);                               

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
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
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>Add Stadium</p>
            <form onSubmit={handleSubmit} className='gradientbg p-4 rounded-lg shadow-lg'>
                <div className="grid grid-cols-2 gap-4 ">
                    <div>
                        <label className="block text-black font-bold mb-2">Venue Name:</label>
                        <input
                            name="venueName"
                            value={formData.venue}
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
                <div className='w-2/3 mx-auto'>
                    <label className="block text-black text-center font-bold mb-2 mt-2">Seats:</label>
                    <select
                        name="seats"
                        value={formData.seats}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-primary text-center"
                    >
                        {stadiumSeats.map((seats, index) => (
                            <option key={index} value={seats}>{seats}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center">
                    <Seats vacantSeats={formData.seats} isManager={true} />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="mt-4 bg-alternate text-white p-2 rounded-md w-1/2">Add Stadium</button>
                </div>
            </form>
        </div>
    );
};

export default AddStadium;