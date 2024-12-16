import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages//Register/Register';
import Home from './pages/Home';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer'; // Import the Footer component
import Navbar from "./components/Navbar/Navbar";
import ManageUsers from "./pages/ManageUsers";
import Reserve from "./pages/Reserve";
import UserReservations from "./pages/UserReservations";
import UpdateProfile from "./pages/UpdateProfile/IpdateProfile";
import EditMatch from "./pages/EditMatch";

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-users"
            element={
              <ProtectedRoute>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-reservations"
            element={
              <ProtectedRoute>
                <UserReservations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-match"
            element={
              <ProtectedRoute>
                <EditMatch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-match"
            element={
              <ProtectedRoute>
                <EditMatch IsNew={true} />
              </ProtectedRoute>
            }
          />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Footer />
    </>

  );
};

export default App;

