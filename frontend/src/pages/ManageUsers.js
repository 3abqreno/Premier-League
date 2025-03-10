import React, { useEffect, useState } from 'react';
import User from '../components/User';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('No access token found');
                return;
            }

            try {
                const response = await fetch('http://localhost/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className='p-20'>
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>Manage Users</p>
            <div className='gradientbg rounded-lg'>
                {users.map(user => (
                    user.role!== "admin" && <User key={user.id} userId={user.id} name={user.username} role={user.role} manage={true} />
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;