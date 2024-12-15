import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Login.css'; 
import './Styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future authentication logic will go here
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-last">
        <div className="loginring">
          <i style={{ '--clr': '#5A72A0' }}></i>
          <i style={{ '--clr': '#83B4FF' }}></i>
          <i style={{ '--clr': '#FDFFE2' }}></i>
          <div className="login" >
            <h2>Login</h2>
            <div className="inputBx">
              <input type="text" placeholder="Username" />
            </div>
            <div className="inputBx">
              <input type="password" placeholder="Password" />
            </div>
            <div className="inputBx">
              <input type="submit" value="Sign in" />
            </div>
            <div className="links">
              <a href="#">Forget Password</a>
              <a href="#">Signup</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;