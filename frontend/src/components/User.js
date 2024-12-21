import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = ({ userId, name, role, manage }) => {

    const handleApprove = async () => {
        try {
            const token = localStorage.getItem('access_token'); // Retrieve the access token
            const response = await fetch(`http://localhost:8000/user/approve/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(`${name} approved successfully!`);
                console.log(data);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                const errorData = await response.json();
                toast.error(`Failed to approve ${name}: ${errorData.detail[0].msg}`);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
        }
    };

    const handleDeny = async (manage) => {
        try {
            const token = localStorage.getItem('access_token'); // Retrieve the access token
            const response = await fetch(`http://localhost:8000/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success(`${name} ${manage? "deleted":"denied"} successfully!`);
                setTimeout(() => window.location.reload(), 2000);
            } else {
                const errorData = await response.json();
                toast.error(`Failed to deny ${name}: ${errorData.detail[0].msg}`);
            }
        } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
        }
    };



    return (
        <div className="flex justify-center items-center py-0">
            <div className="flex justify-between items-center space-x-4 overflow-hidden shadow-lg p-4 text-black w-full">
                <div>
                    <p className='text-black font-bold'>{name}</p>
                    <p>Role: {role}</p>
                </div>
                <div className={`flex ${manage ? 'justify-center' : 'justify-between'} w-1/3 font-bold`}>
                    {manage ? (
                        <button
                            onClick={() => handleDeny(manage)}
                            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                        >
                            Delete User
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleApprove}
                                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>
                            <button
                                onClick={handleDeny}
                                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                            >
                                Deny
                            </button>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default User;