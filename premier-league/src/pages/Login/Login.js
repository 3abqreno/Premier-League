import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future authentication logic will go here
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-last">
        <div className="loginring">
          <i style={{ '--clr': '#5A72A0' }}></i>
          <i style={{ '--clr': '#83B4FF' }}></i>
          <i style={{ '--clr': '#FDFFE2' }}></i>
          <div className="login">
            <h2><b>Login</b></h2>
            <div className="inputBx">
              <input type="text" placeholder="Username" />
            </div>
            <div className="inputBx">
              <input type="password" placeholder="Password" />
            </div>
            <div className="inputBx">
              <input type="submit" value="Sign in" style={{ fontWeight: 'bold' }} />
            </div>
            <div className="links">
              <a href="#"><b>Forget Password</b></a>
              <a href="/register"><b>Sign Up</b></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;