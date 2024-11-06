import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdNoteAdd } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { IoLogoWebComponent } from "react-icons/io5";
const Sidenav = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDropdownOpensettings, setIsDropdownOpensettings] = useState(false);
    const navigate = useNavigate();

    const user = sessionStorage.getItem('user')
    const role = user ? JSON.parse(user).role : null
    const Picture = user ? JSON.parse(user).Picture : null


  

    

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const toggleDropdownsettings = () => {
        setIsDropdownOpensettings(!isDropdownOpensettings);
    };



    let backgroundColor
    let backgroundColorrole



    if (role === "BOP") {
        backgroundColor = "bg-[#f37a41]";
        backgroundColorrole = 'bg-orange-200'
    } else if (role === "HBL") {
        backgroundColor = "bg-[#197056]";
        backgroundColorrole = 'bg-green-200'


    } else if (role === "Bahria Town") {
        backgroundColor = "bg-[#c6202d]";
    } else {
        backgroundColor = "bg-gray-50";
    }

    return (
        <>
            <div>
                <button
                    data-drawer-target="sidebar-multi-level-sidebar"
                    data-drawer-toggle="sidebar-multi-level-sidebar"
                    aria-controls="sidebar-multi-level-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        />
                    </svg>
                </button>
                <aside
                    id="sidebar-multi-level-sidebar"
                    className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                    aria-label="Sidebar"
                >

                    <li className='flex justify-center'>

                        <div className={`${backgroundColor} w-full flex justify-center p-3`}>

                            {Picture && (
                                <img className=' rounded-full w-32 h-32 border border-black' src={`${URL_API}/${Picture?.replace(/\\/g, "/")}`} alt="Profile" />

                            )}
                        </div>

                    </li>

                    <li className='flex justify-center text-2xl '>
                        <span href="#" className={`flex items-center p-2 text-gray-900  dark:text-white  ${backgroundColorrole} w-full  justify-center dark:hover:bg-gray-700 group`}>

                            <span class="ms-3">{role}</span>
                        </span>
                    </li>
                    <div className={`h-full px-3 py-4 overflow-y-auto ${backgroundColor} dark:bg-gray-800`}>
                        <ul className="space-y-2 font-medium">
                           
                                <>


                                    


                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 22 21"
                                                >
                                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                                </svg>
                                                <span className="ms-3">Dashboard</span>
                                            </Link>
                                        </li>
                                    

                                    <li>
                                        <Link
                                            to="/add-case"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <MdNoteAdd className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            <span className="flex-1 ms-3 whitespace-nowrap">
                                                Add Case
                                            </span>
                                        </Link>
                                    </li>


                                    <li>
                                        <Link
                                            to="/all-case"
                                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <MdNoteAdd className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                            <span className="flex-1 ms-3 whitespace-nowrap">
                                                All Case
                                            </span>
                                        </Link>
                                    </li>


                                    <div>
                                        <button
                                            type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            onClick={toggleDropdown}
                                        >
                                            <FaUsers className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                            <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                                Users
                                            </span>
                                            <svg
                                                class="w-3 h-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m1 1 4 4 4-4"
                                                />
                                            </svg>
                                        </button>

                                        {isDropdownOpen && (
                                            <ul id="dropdown-example" className="py-2 space-y-2">
                                                <li>
                                                    <Link
                                                        to="/register"
                                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                    >
                                                        Add User
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/users"
                                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                    >
                                                        All Users
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </div>



                                    <div>
                                        <button
                                            type="button"
                                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                            onClick={toggleDropdownsettings}
                                        >
                                            <IoIosSettings className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                            <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                                                Settings
                                            </span>
                                            <svg
                                                class="w-3 h-3"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 10 6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="m1 1 4 4 4-4"
                                                />
                                            </svg>
                                        </button>

                                        {isDropdownOpensettings && (
                                            <ul id="dropdown-example" className="py-2 space-y-2">
                                                <li>
                                                    <Link
                                                        to="/addrole"
                                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                    >
                                                        Add Role
                                                    </Link>
                                                </li>

                                                <li>
                                                    <Link
                                                        to="/addrole"
                                                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                                    >
                                                        2F Authentication
                                                    </Link>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </>
                            


                            <li>
                                <Link
                                    to="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                        />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">
                                        Sign out
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <IoLogoWebComponent className=" className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' " />
                                    <span className="flex-1 ms-3 whitespace-nowrap">
                                        Website
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="p-4 sm:ml-64">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        {/* <Routing /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidenav;
