import React from 'react';

const Customer = () => {
    const handleDashboardClick = () => {
        // Logic to navigate to the dashboard or perform some action
        console.log('Navigating to dashboard...');
    };

    return (
        <div>
            <h1>Welcome Back, User!</h1>
            <p>You now have access to specific details.</p>
            <button onClick={handleDashboardClick}>View Dashboard</button>
        </div>
    );
};

export default Customer;