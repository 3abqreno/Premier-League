import React from 'react';

const User = ({ name, role, manage }) => {
    const handleApprove = () => {
        console.log(`${name} approved`);
    };

    const handleDeny = () => {
        console.log(`${name} denied`);
    };

    const handleManage = () => {
        console.log(`Managing ${name}`);
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
                            onClick={handleManage}
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
        </div>
    );
};

export default User;
