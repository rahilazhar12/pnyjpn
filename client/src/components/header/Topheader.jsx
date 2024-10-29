import React, { useState } from "react";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSessionStorage } from "../../context/Sessionstorage";
import { useNavigate } from "react-router-dom";

const Topheader = () => {
  const navigate = useNavigate();
  const { user, logout } = useSessionStorage(); // Destructure logout from context

  // State to manage mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle function to open/close mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const Handlelogout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/company/companies-logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This sends cookies with the request, including JWT
    })
      .then((response) => {
        if (response.ok) {
          // Logout successful, clear the JWT and navigate to login
          logout(); // Local logout handling
          navigate("/"); // Redirect to login page
        } else {
          // Handle any errors, e.g., displaying a message to the user
          console.error("Failed to log out from the server");
        }
      })
      .catch((error) => {
        console.error("Error during logout API call:", error);
      });
  };

  return (
    <>
      <div>
        <header className="max-w-screen-2xl container bg-slate-700 mx-auto xl:px-24 px-4">
          <nav className="flex justify-between md:justify-end items-center py-2">
            {/* Logo or brand name */}
            <div className="text-white text-lg block md:hidden">
              Company Registration
            </div>
            {/* Desktop Navigation */}
            <ul className="hidden lg:flex gap-6">
              {!user && (
                <Link to="/register-company">
                  <li className="text-sm text-white">
                    <span className="text-sm flex gap-2 items-center hover:text-yellow-300">
                      <FiLogIn />
                      COMPANY REGISTRATION
                    </span>
                  </li>
                </Link>
              )}

              {/* Conditionally render "Company Login" or "Logout" */}
              {user ? (
                <button onClick={Handlelogout} className="text-sm text-white">
                  <span className="text-sm flex gap-2 items-center hover:text-yellow-300">
                    <CiLogout />
                    LOGOUT
                  </span>
                </button>
              ) : (
                <Link to="/company-login">
                  <li className="text-sm text-white">
                    <span className="text-sm flex gap-2 items-center hover:text-yellow-300">
                      <FiLogIn />
                      COMPANY LOGIN
                    </span>
                  </li>
                </Link>
              )}

              <Link to="">
                <li className="text-sm text-white">
                  <span className="text-sm flex gap-2 items-center hover:text-yellow-300">
                    <FiLogIn />
                    ADMIN LOGIN
                  </span>
                </li>
              </Link>
            </ul>

            {/* Mobile Hamburger Icon */}
            <div
              className="lg:hidden text-white text-2xl cursor-pointer"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </div>
          </nav>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <ul className="lg:hidden flex flex-col gap-4 mt-2 bg-slate-700 p-4 rounded-lg">
              {!user && (
                <Link to="/register-company" onClick={toggleMobileMenu}>
                  <li className="text-sm text-white">
                    <span className="text-sm flex gap-2 items-center hover:text-yellow-300">
                      <CiLogout />
                      COMPANY REGISTRATION
                    </span>
                  </li>
                </Link>
              )}

              {/* Conditionally render "Company Login" or "Logout" */}
              {user ? (
                <button className="text-sm text-white" onClick={Handlelogout}>
                  <span className="text-sm flex gap-2 items-center hover:text-yellow-300">
                    <CiLogout />
                    LOGOUT
                  </span>
                </button>
              ) : (
                <Link to="/company-login" onClick={toggleMobileMenu}>
                  <li className="text-sm text-white">
                    <span className="text-sm flex gap-2 items-center hover:text-yellow-300">
                      <FiLogIn />
                      COMPANY LOGIN
                    </span>
                  </li>
                </Link>
              )}
            </ul>
          )}
        </header>
      </div>
    </>
  );
};

export default Topheader;
