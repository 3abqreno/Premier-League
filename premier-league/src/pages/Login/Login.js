import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(username, password);
      const response = await fetch('http://0.0.0.0:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));
        localStorage.setItem('role', payload.role);
        window.location.href = 'http://localhost:3000/';
        console.log('Login successful');
        
      } else {
        const errorData = await response.json();
        toast.error(`Login failed: ${errorData.detail[0].msg}`);
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-last">
        <div className="loginring">
          <i style={{ '--clr': '#5A72A0' }}></i>
          <i style={{ '--clr': '#83B4FF' }}></i>
          <i style={{ '--clr': '#FDFFE2' }}></i>
          <div className="login">
            <h2><b>Login</b></h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBx">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="inputBx">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="inputBx">
                <input type="submit" value="Sign in" style={{ fontWeight: 'bold' }} />
              </div>
            </form>
            <div className="links">
              <a href="#"><b>Forget Password</b></a>
              <a href="/register"><b>Sign Up</b></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;