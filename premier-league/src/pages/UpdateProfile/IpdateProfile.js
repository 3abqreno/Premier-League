import React, { useEffect, useState } from 'react';
import './UpdateProfile.css';

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
    const fetchUserData = async () => {
      const data = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        birthDate: '1990-01-01',
        gender: 'male',
        city: 'New York',
        address: '123 Main St',
        email: 'johndoe@example.com',
      };
      setUserData(data);
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-last">
        <div className="update-profile">
          <i style={{ '--clr': '#5A72A0' }}></i>
          <i style={{ '--clr': '#83B4FF' }}></i>
          <i style={{ '--clr': '#FDFFE2' }}></i>
          <div className="login w-full">
            <h2><b>Update Profile</b></h2>

            {/* Username */}
            <div className='flex flex-row w-full'>
              <div className="inputBx">
                <input type="text" name="username" value={userData.username} disabled placeholder="Username" />
              </div>
            </div>

            {/* First and Last Name */}
            <div className='flex flex-row w-full'>
              <div className="inputBx">
                <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} placeholder="First Name" />
              </div>
              <div className="inputBx">
                <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Last Name" />
              </div>
            </div>


            {/* Birth Date and Gender */}
            <div className='flex flex-row w-full'>
              <div className="inputBx">
                <input type="date" name="birthDate" value={userData.birthDate} onChange={handleChange} placeholder="Birth Date" />
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

            {/* Email and Role */}
            <div className='flex flex-row w-full'>
              <div className="inputBx">
                <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email Address" />
              </div>
            </div>

            <div className="inputBx">
              <input type="submit" value="Update Profile" style={{ fontWeight: 'bold' }} />
            </div>

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