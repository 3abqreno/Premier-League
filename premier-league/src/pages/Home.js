import React, { useState, useEffect } from 'react';
import Matches from '../components/Match/Matches';
import Admin from './Admin';
import Manager from './Manager';

// A function to check user login status (mock implementation)
const checkUserStatus = () => {
  // Example: Check localStorage for a token
  // return localStorage.getItem("token") ? true : false;
  return true;
};

// Main Page Component
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("manager");

  // Check if user is logged in on component load
  useEffect(() => {
    const userStatus = checkUserStatus();
    setIsLoggedIn(userStatus);
  }, []);

  const renderLinks = () => {
    switch (role) {
      case 'admin':
        return <Admin />;
      case 'manager':
        return <Manager/>;
      case 'fan':
      case 'guest':
      default:
        return <Matches />;
    }
  };


  const renderContent = () => {
    switch (isLoggedIn) {
      case true:
        return renderLinks();
      case false:
        renderLinks();
      default:
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        );
    }


  };

  return (
    <div className="p-20">
      {renderContent()}
    </div>
  );
};

export default Home;
