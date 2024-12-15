import React from 'react';
import { Navigate } from 'react-router-dom';

const checkUserStatus = () => {
  return localStorage.getItem("token") ? true : false;
};

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = checkUserStatus();
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
