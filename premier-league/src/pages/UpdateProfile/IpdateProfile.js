import React, { useEffect, useState } from 'react';
import './UpdateProfile.css';
import { ToastContainer, toast } from 'react-toastify';

const UpdateProfile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    birthDate: '',
    gender: '',
    city: '',
    address: '',
    email: '',
  });

  useEffect(() => {
    // Simulate an API call to fetch user data
    // API function to fetch unapproved users
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Retrieve the access token
        const response = await fetch('http://0.0.0.0:8000/user/me', {
          method: 'GET',
          headers: {

            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
        // toast.success('Users fetched successfully!');
        return data;
      } catch (error) {
        toast.error('Failed to fetch users');
        console.error('Failed to fetch users:', error);
        return [];
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = () => {
    toast.error('Username cannot be changed');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();    
    const { first_name, last_name, city, address, email } = userData;

    if (!first_name || !last_name || !city || !email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {      
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://0.0.0.0:8000/user/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ first_name, last_name, city, address, email })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      toast.success('Profile updated successfully');
      setUserData(data);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-last">
        <div className="update-profile">
          <i style={{ '--clr': '#5A72A0' }}></i>
          <i style={{ '--clr': '#83B4FF' }}></i>
          <i style={{ '--clr': '#FDFFE2' }}></i>
          <div className="login w-full">
            <h2><b>Update Profile</b></h2>
            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className='flex flex-row w-full'>
                <div className="inputBx" onClick={handleClick}>
                  <input type="text" name="username" value={userData.username} disabled placeholder="Username" />
                </div>
              </div>

              {/* First and Last Name */}
              <div className='flex flex-row w-full'>
                <div className="inputBx">
                  <input type="text" name="first_name" value={userData.first_name} onChange={handleChange} placeholder="First Name" />
                </div>
                <div className="inputBx">
                  <input type="text" name="last_name" value={userData.last_name} onChange={handleChange} placeholder="Last Name" />
                </div>
              </div>

              {/* Birth Date and Gender */}
              <div className='flex flex-row w-full'>
                <div className="inputBx">
                  <input type="date" name="birth_date" value={userData.birth_date} onChange={handleChange} placeholder="Birth Date" />
                </div>
                <div className="select">
                  <select name="gender" value={userData.gender} onChange={handleChange} className="bg-last border font-extrabold border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-last dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white">
                    <option value="" disabled>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* City and Address */}
              <div className='flex flex-row w-full'>
                <div className="inputBx">
                  <input type="text" name="city" value={userData.city} onChange={handleChange} placeholder="City" />
                </div>
                <div className="inputBx">
                  <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Address (Optional)" />
                </div>
              </div>

              {/* Email */}
              <div className='flex flex-row w-full'>
                <div className="inputBx">
                  <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email Address" />
                </div>
              </div>

              <div className="inputBx">
                <input type="submit" value="Update Profile" style={{ fontWeight: 'bold' }} />
              </div>
            </form>

            {/* Change Password */}
            <div className="inputBx">
              <input type="submit" value="Change Password" style={{ fontWeight: 'bold' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;