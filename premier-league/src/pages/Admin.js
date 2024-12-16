import React, { useEffect, useState } from 'react';
import User from '../components/User'; // Assuming User component is in the same directory

const Admin = () => {
    const [users, setUsers] = useState([]);

    // Dummy API function
    const fetchUsers = async () => {
        // This will be replaced with actual API call logic
        return [
            { id: 1, name: 'John Doe', role: 'User', manage: false },
            { id: 2, name: 'Jane Smith', role: 'User', manage: false },
            { id: 3, name: 'Alice Johnson', role: 'Manager', manage: false }
        ];
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
            <p className='text-4xl gradientbg rounded-md mb-2 p-2 text-center font-bold'>Users Awaiting Approval</p>
            <div className='gradientbg rounded-lg'>
                {users.map(user => (
                    <User key={user.id} name={user.name} role={user.role} manage={user.manage} />
                ))}
            </div>
        </div>
    );
};

export default Admin;
