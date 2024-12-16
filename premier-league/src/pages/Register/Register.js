import React from 'react';
import './Register.css';
import Navbar from '../../components/Navbar/Navbar';

const Register = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-last">
        <div className="regring">
          <i style={{ '--clr': '#5A72A0' }}></i>
          <i style={{ '--clr': '#83B4FF' }}></i>
          <i style={{ '--clr': '#FDFFE2' }}></i>
          <div className="login">
            <h2><b>Register</b></h2>

            {/* First and Last Name */}
            <div className='flex flex-row'>
              <div className="inputBx">
                <input type="text" placeholder="First Name" />
              </div>
              <div className="inputBx">
                <input type="text" placeholder="Last Name" />
              </div>
            </div>

            {/* Username and Password */}
            <div className='flex flex-row'>
              <div className="inputBx">
                <input type="text" placeholder="Username" />
              </div>
              <div className="inputBx">
                <input type="password" placeholder="Password" />
              </div>
            </div>

            {/* Birth Date and Gender */}
            <div className='flex flex-row w-11/12'>
              <div className="inputBx">
                <input type="date" placeholder="Birth Date" />
              </div>
              <div className="select">
                <select class="bg-last border font-extrabold border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-last dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* City and Address */}
            <div className='flex flex-row'>
              <div className="inputBx">
                <input type="text" placeholder="City" />
              </div>
              <div className="inputBx">
                <input type="text" placeholder="Address (Optional)" />
              </div>
            </div>

            {/* Email and Role */}
            <div className='flex flex-row w-11/12'>
              <div className="inputBx">
                <input type="email" placeholder="Email Address" />
              </div>
              <div className="select">
                <select class="bg-last border font-extrabold border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-last dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected>Role</option>
                  <option value="manager">Manager</option>
                  <option value="fan">Fan</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="inputBx">
              <input type="submit" value="Sign up" style={{ fontWeight: 'bold' }} />
            </div>

            {/* Links */}
            <div className="links">
              <p className='text-white'><b>Already have an account?</b></p>
              <a href="/login"><b>Sign In</b></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
