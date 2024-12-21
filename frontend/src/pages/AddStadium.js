import React, { useState } from 'react';
import Seats from '../components/Seats/Seats';
import { ToastContainer, toast } from 'react-toastify';

const AddStadium = () => {
    const [formData, setFormData] = useState({
        name: '',
        rows: '',
        columns: '',
    });
    const [stadiumGrid, setStadiumGrid] = useState([]);
    const [stadiumSeats] = useState(["7*7", "8*8", "9*9", "10*10"]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'seats') {
            const [rows, columns] = value.split('*').map(Number);
            setFormData((prevFormData) => ({
                ...prevFormData,
                'rows': rows,
                'columns': columns,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSeatsChange = (e) => {
        const { value } = e.target;
        setStadiumGrid(mapSeatsTo2DArray(value)); // Map the choice to a 2D array
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // Validate inputs
        if (!formData.name || !formData.rows || !formData.columns) {
            toast.error('All fields are required.');
            return;
        }

        
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await fetch('http://localhost:8000/stadium', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('Stadium created successfully:', result);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            } else {
                toast.error('Failed to create stadium:', response.statusText);
            }
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    const mapSeatsTo2DArray = (seats) => {
        const [rows, cols] = seats.split('*').map(Number);

        return Array.from({ length: rows }, () => Array(cols).fill(0));
    };

    return (
        <div className='p-20'>
            <ToastContainer />
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>Add Stadium</p>
            <form onSubmit={handleSubmit} className='gradientbg p-4 rounded-lg shadow-lg'>
                <div className="w-2/3 mx-auto">
                    <div>
                        <label className="block text-black text-center font-bold mb-2">Venue Name:</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border text-center border-gray-300 rounded-md bg-primary"
                        />
                    </div>
                </div>
                <div className='w-2/3 mx-auto'>
                    <label className="block text-black text-center font-bold mb-2 mt-2">Seats:</label>
                    <select
                        name="seats"
                        onChange={(e) => {
                            handleSeatsChange(e);
                            handleChange(e);
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md bg-primary text-center"
                    >
                        <option value="">Select Seat Layout</option>
                        {stadiumSeats.map((seats, index) => (
                            <option key={index} value={seats}>{seats}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center">
                    <Seats vacantSeats={stadiumGrid} isManager={true} IsCreate={true} />
                </div>
                <div className="flex justify-center">
                    <button type="submit" onClick={handleSubmit} className="mt-4 bg-alternate text-white p-2 rounded-md w-1/2">Add Stadium</button>
                </div>
            </form>
        </div>
    );
};

export default AddStadium;
