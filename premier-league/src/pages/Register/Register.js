import React, { useState } from 'react';
import './Register.css';
import Navbar from '../../components/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    email: '',
    gender: '',
    city: '',
    address: '',
    role: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, username, password, confirmPassword, birthDate, email } = formData;

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!birthDate) newErrors.birthDate = 'Birth Date is required';
    if (new Date(birthDate) > new Date()) newErrors.birthDate = 'Birth Date cannot be in the future';
    if (!email) newErrors.email = 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = 'Email is not valid';
    if (!role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://0.0.0.0:8000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            birth_date: formData.birthDate,
            gender: formData.gender,
            city: formData.city,
            address: formData.address,
            role: formData.role,
            password: formData.password,
          }),
        });
  
        if (response.ok) {
          toast.success('Registration successful! Redirecting to login page...');
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          const errorData = await response.json();
          if (response.status === 422) {
            Object.values(errorData).forEach(error => {
              toast.error(error);
            });
          } else {
            toast.error('An unexpected error occurred. Please try again.');
          }
        }
      } catch (error) {
        toast.error('An error occurred while submitting the form. Please try again.');
      }
    } else {
      Object.values(errors).forEach(error => {
        toast.error(error);
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
                <input type="text" placeholder="First Name" name="firstName" onChange={handleChange} />
              </div>
              <div className="inputBx">
                <input type="text" placeholder="Last Name" name="lastName" onChange={handleChange} />
              </div>
            </div>

            {/* Username and Password */}
            <div className='flex flex-row w-11/12'>
              <div className="inputBx">
                <input type="text" placeholder="Username" name="username" onChange={handleChange} />
              </div>
            </div>

            <div className='flex flex-row'>
              <div className="inputBx">
                <input type="password" placeholder="Password" name="password" onChange={handleChange} />
              </div>
              <div className="inputBx">
                <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleChange} />
              </div>
            </div>

            {/* Birth Date and Gender */}
            <div className='flex flex-row w-11/12'>
              <div className="inputBx">
                <input type="date" placeholder="Birth Date" name="birthDate" onChange={handleChange} />
              </div>
              <div className="select">
                <select className="bg-last border font-extrabold border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-last dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <input type="email" placeholder="Email Address" name="email" onChange={handleChange} />
              </div>
              <div className="select">
                <select className="bg-last border font-extrabold border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-last dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected>Role</option>
                  <option value="manager">Manager</option>
                  <option value="fan">Fan</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="inputBx">
              <input type="submit" value="Sign up" style={{ fontWeight: 'bold' }} onClick={handleSubmit} />
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
