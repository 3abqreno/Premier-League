import React, { useEffect, useState } from 'react';
import User from '../components/User'; // Assuming User component is in the same directory
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
    const [users, setUsers] = useState([]);

    // API function to fetch unapproved users
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('access_token'); // Retrieve the access token
            const response = await fetch('http://localhost/api/user/un-approved', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }            
            const data = await response.json();
            console.log(data);
            // toast.success('Users fetched successfully!');
            return data;
        } catch (error) {
            toast.error('Failed to fetch users');
            console.error('Failed to fetch users:', error);
            return [];
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            const usersFromApi = await fetchUsers();
            setUsers(usersFromApi);
        };

        getUsers();
    }, []);

    return (
        <div className='text-black'>
            <ToastContainer />
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>Users Awaiting Approval</p>
            <div className='gradientbg rounded-lg'>
                {users.map(user => (
                    <User key={user.id} userId={user.id} name={user.username} role={user.role} manage={user.approved} />
                ))}
            </div>
        </div>
    );
};

export default Admin;