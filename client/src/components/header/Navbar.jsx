import React, { useState } from 'react';
import Topheader from './Topheader';
import { Link } from 'react-router-dom';
import { useSessionStorage } from '../../context/Sessionstorage';
import logo from '../../assets/img/logo/logo.png'

const Navbar = () => {
  const { user, role } = useSessionStorage();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <Topheader />
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-16 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <Link to='/'>
              <img src={logo} alt="Logo" className="w-16" />
            </Link>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-blue-500">Job Finder</h1>
              <p className="text-red-500 text-sm">Get your dream job</p>
            </div>
          </div>

          {/* Nav Links Section (hidden on mobile, flex on medium and up) */}
          <div className="hidden md:flex space-x-8 text-gray-700">
            <Link to="/" className="hover:text-blue-900">Home</Link>

            {(role === "User" || role === "pnyalumini") && (
  <>
    <Link to="/new-profile" className="hover:text-blue-900">
      Profile Builder
    </Link>
  </>
)}


            {role === "company" && (
              <>
                <Link to="/post-jobs" className="hover:text-blue-900">Post a Job</Link>
                <Link to="/company-profile" className="hover:text-blue-900">Profile</Link>
              </>
            )}
          </div>

          {/* Buttons Section */}
          <div className="hidden md:flex space-x-4">
            {user ? (
              <Link >
                
              </Link>
            ) : (
              <>
                <Link to='/register-student' className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300 ease-in-out">
                  User Register
                </Link>
                <Link to='/login-users' className="border border-pink-500 text-pink-500 px-4 py-2 rounded-md hover:bg-pink-50 transition duration-300 ease-in-out">
                  User Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {/* Icon for mobile menu */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu (visible when the state is true) */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden bg-white transition duration-300 ease-in-out transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          >
            <div className="px-4 py-2 space-y-2">
              <Link to="/" className="block text-gray-700 hover:text-blue-900">
                Home
              </Link>
              {role === "company" && (
                <>
                  <Link to="/post-jobs" className="hover:text-blue-900">Post a Job</Link>
                  <Link to="/company-profile" className="hover:text-blue-900">Profile</Link>
                </>
              )}

              {/* Mobile Menu Buttons */}
              <div className="flex flex-col space-y-2">
                {user ? (
                  <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300 ease-in-out">
                    Logout
                  </button>
                ) : (
                  <>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition duration-300 ease-in-out">
                      Register
                    </button>
                    <button className="border border-pink-500 text-pink-500 px-4 py-2 rounded-md hover:bg-pink-50 transition duration-300 ease-in-out">
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
