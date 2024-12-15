import React from 'react';
import { useNavigate } from 'react-router-dom';

const Guest = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome to Our Website!</h1>
            <p>Please log in to view more details.</p>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    );
};

export default Guest;