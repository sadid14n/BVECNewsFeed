import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [showDepartments, setShowDepartments] = useState(false);

  return (
    <>
      <Navbar />
      {children}

      <footer className="bg-gray-900 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* College Info */}
          <div>
            <h2 className="text-2xl font-bold mb-2 sm:text-left text-center">
              Barak Valley Engineering College
            </h2>
            <p className="text-gray-300 sm:text-left text-center">
              Nirala, Sribhumi, Assam, 788701
            </p>
            <p className="mt-2 sm:text-left text-center">
              Contact:{" "}
              <a
                href="mailto:principal@bvec.ac.in"
                className="text-blue-400 hover:text-blue-300"
              >
                principal@bvec.ac.in
              </a>
            </p>
          </div>

          {/* Navigation */}
          <div className="sm:text-left text-center">
            <h2 className="text-2xl font-bold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/departments" className="hover:text-white transition">
                  Departments
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h2 className="text-2xl font-bold mb-3 text-center sm:text-left">
              Important Links
            </h2>
            <div className="text-center sm:text-left">
              <a
                href="https://www.bvec.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                BVEC Main Website
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Barak Valley Engineering College</p>
          <p>All rights reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
