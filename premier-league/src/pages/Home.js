import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Customer from './Customer';
import Guest from './Guest';

// A function to check user login status (mock implementation)
const checkUserStatus = () => {
  // Example: Check localStorage for a token
  return localStorage.getItem("token") ? true : false;
};

// Main Page Component
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on component load
  useEffect(() => {
    const userStatus = checkUserStatus();
    setIsLoggedIn(userStatus);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        // Logged-in User View
        <Customer />
      ) : (
        // Guest User View
        <Guest />
      )}
    </div>
  );
};

export default Home;
