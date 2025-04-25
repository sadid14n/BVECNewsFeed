import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      {/* First Sticky Navbar: Logo and College Name */}
      <nav className="bg-white shadow-md z-50">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-4 gap-4 sm:gap-0 relative">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logoNew.png" alt="LOGO" className="h-14 w-auto" />
          </div>

          {/* Center: College Name */}
          <div className="text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-900">
              BARAK VALLEY ENGINEERING COLLEGE
            </h1>
            <h2 className="text-lg sm:text-xl font-semibold text-green-600">
              News Feed
            </h2>
            <p className="text-sm text-gray-500">Karimganj, Assam - 788701</p>
          </div>

          {/* Right: Search and Login */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-full px-4 py-1 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute left-3 top-1.5 text-gray-400">🔍</span>
            </div>
            <button className="bg-green-500 text-white px-4 py-1.5 rounded-full hover:bg-green-600 transition">
              Search
            </button>

            {/* Login / Dashboard */}
            {auth?.token ? (
              <Link
                to="/authorities/profile"
                className="bg-green-700 text-white px-4 py-1.5 rounded-full hover:bg-green-600 transition font-medium text-sm"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-900 text-white px-4 py-1.5 rounded-full hover:bg-blue-800 transition font-medium text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-900 text-white px-4 py-1.5 rounded-full hover:bg-blue-800 transition font-medium text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Second Sticky Navbar: Menu */}
      <nav className="bg-black p-4 shadow-md sticky top-0 z-40">
        <div className="container mx-auto">
          <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-green-400 text-sm sm:text-base font-medium">
            <Link to={"/"} className="hover:text-white">
              Home
            </Link>
            <li>
              <a href="#about_us" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#Administration" className="hover:text-white">
                Administration
              </a>
            </li>
            <li>
              <a href="#Academics" className="hover:text-white">
                Academics
              </a>
            </li>
            <li>
              <a href="#Departments" className="hover:text-white">
                Department
              </a>
            </li>
            <li>
              <a href="#Committees" className="hover:text-white">
                Committees
              </a>
            </li>
            <li>
              <a href="#Facilities" className="hover:text-white">
                Facilities
              </a>
            </li>
            <li>
              <a href="#Contact_Us" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#Study_Material" className="hover:text-white">
                Study Material
              </a>
            </li>
            <li>
              <a href="#Others" className="hover:text-white">
                Others
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
