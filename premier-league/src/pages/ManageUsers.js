import React, { useEffect, useState } from 'react';
import User from '../components/User';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Mock API call
        const fetchUsers = async () => {
            // Simulate API call with static data
            const staticData = [
                { id: 1, name: 'John Doe', role: 'Admin', manage: true },
                { id: 2, name: 'Jane Smith', role: 'Editor', manage: true },
                { id: 3, name: 'Sam Johnson', role: 'Viewer', manage: true },
            ];
            setUsers(staticData);
        };

        fetchUsers();
    }, []);

    return (
        <div className='p-20'>
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>Manage Users</p>
            <div className='gradientbg rounded-lg'>
                {users.map(user => (
                    <User key={user.id} name={user.name} role={user.role} manage={user.manage} />
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;