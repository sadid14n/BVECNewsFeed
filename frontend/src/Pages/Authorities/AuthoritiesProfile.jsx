import React, { useState } from "react";
import AdminMenu from "../../component/Authorities/AdminMenu";
import { useAuth } from "../../Context/AuthContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import PopupForm from "../../component/PopupForm";
import axios from "axios";

const AuthoritiesProfile = () => {
  const [auth, setAuth] = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/user/update-profile/`,
        updatedData
      );
      setAuth({
        ...auth,
        user: res.data.user,
      });
      const storedAuth = JSON.parse(localStorage.getItem("auth"));
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...storedAuth,
          user: res.data.user,
        })
      );
      console.log(res.data);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side menu */}
      <AdminMenu />

      {/* Right side content */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Profile</h1>

        <div className="bg-white p-6 rounded-2xl shadow-md max-w-md">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            {auth?.user.name}
          </h2>
          <p className="text-gray-600 mb-1">Email: {auth?.user.email}</p>
          <p className="text-gray-600 mb-1">Role: {auth?.user.role}</p>
          {auth?.token && (
            <button
              className="border-2 border-gray-200 py-2 px-3 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        <PopupForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userData={auth.user}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default AuthoritiesProfile;
