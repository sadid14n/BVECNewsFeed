import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid"; // or "24/solid" if you want bigger icons
import StudentBox from "./studbox";
import PrinciBox from "./princibox";
import Departments from "./department";
import ClubBox from "./clubs";


// adjust path if needed

const Navbar = () => {
    return (
        <>
            <nav className="bg-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">

                    {/* Left: Logo */}
                    <div className="flex items-center space-x-2">
                        <img src="/logoNew.png" alt="LOGO" className="h-12 w-auto" />
                    </div>

                    {/* Center: Institute Name */}
                    <div className="text-center">
                        <h4 className="text-lg font-semibold">BARAK VALLEY ENGINEERING COLLEGE</h4>
                        <span className="text-sm text-gray-600">Karimganj, Assam - 788701</span>
                    </div>

                    {/* Right: Search Box */}
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border border-gray-300 px-4 py-1 pl-10 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button className="bg-green-500 text-white px-3 py-1 rounded-r-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Search
                        </button>
                    </div>
                </div>
            </nav>

            <nav className="bg-black p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="grid grid-cols-10 text-green-400 text-center">
                        <ul className="flex space-x-6 text-green-400 ">
                            <li><a href="#home" className="hover:text-white">Home</a></li>
                            <li><a href="#about_us" className="hover:text-white">About Us</a></li>
                            <li><a href="#Administration" className="hover:text-white">Administration</a></li>
                            <li><a href="#Academics" className="hover:text-white">Academics</a></li>
                            <li><a href="#Departments" className="hover:text-white">Department</a></li>
                            <li><a href="#Committees" className="hover:text-white">Committees

                            </a> </li>
                            <li><a href="#Facilities" className="hover:text-white">Facilities</a></li>
                            <li><a href="#Contact_Us" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#Study_Material" className="hover:text-white">Study Material</a></li>
                            <li><a href="#Others" className="hover:text-white">Others</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                {/* Container to hold both boxes side by side */}
                <div className="flex justify-center gap-8 mt-6">

                    {/* Principal Box */}
                  <PrinciBox />

                    {/* Student Box */}
                   <StudentBox />

                </div>
                <div className="mt-6 px-4">
                    {/* Section Heading */}
                    <h3 className="font-semibold text-center text-2xl mb-6">Departments</h3>

                    <Departments />
                </div>
                <div className="mt-6 px-4">
                    {/* Section Heading */}
                    <h3 className="font-semibold text-center text-2xl mb-6">Clubs</h3>

                    {/* Club Cards */}
                    
                    <ClubBox />    
                </div>
                <div className="mt-6 px-4">
                    {/* Section Heading */}
                    <h3 className="font-semibold text-center text-2xl mb-6">Clubs</h3>

                    {/* events*/}
                    
                    <Events />    
                </div>

            </div>



        </>
    );
};

export default Navbar;