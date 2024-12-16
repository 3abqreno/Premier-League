import React, { useState, useEffect } from 'react';
import logo from "../../assets/Egyptian_Premier_League_logo_2023.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState('manager'); // Default role

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const renderLinks = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <li>
              <a href="/manage-users" className="block py-2 px-3 text-white hover:text-black">
                Manage Users
              </a>
            </li>
          </>
        );
      case 'manager':
        return (
          <>
            <li>
              <a href="/add-stadium" className="block py-2 px-3 text-white hover:text-black">
                Add Stadium
              </a>
            </li>
            <li>
              <a href="/create-match" className="block py-2 px-3 text-white hover:text-black">
                Create Match
              </a>
            </li>
          </>
        );
      case 'fan':
        return (
          <>
            <li>
              <a href="/user-reservations" className="block py-2 px-3 text-white hover:text-black">
                My Reservations
              </a>
            </li>
            <li>
              <a href="/update-profile" className="block py-2 px-3 text-white hover:text-black">
                Update Profile
              </a>
            </li>
          </>
        );
      case 'guest':
      default:
        return (
          <>
            <li>
              <a href="/login" className="block py-2 px-3 text-white hover:text-black">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="block py-2 px-3 text-white hover:text-black">
                Register
              </a>
            </li>
          </>
        );
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-alternate dark:border-gray-700 w-full">
      <div className="w-11/12 flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-16 w-50" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            
          </span>
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-g-black focus:outline-none dark:text-gray-400"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Navbar Links */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <li>
              <a href="/" className="block py-2 px-3 text-white hover:text-black">
                Home
              </a>
            </li>
            {renderLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;