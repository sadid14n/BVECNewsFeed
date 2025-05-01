import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { X, Menu } from "lucide-react"; // optional: use heroicons/lucide/etc.

const AdminMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({ ...auth, user: null, token: "" });
    navigate("/");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-700 text-white font-semibold"
      : "hover:bg-gray-700";

  return (
    <>
      {/* Large screen sidebar */}
      <div className="hidden md:flex min-h-screen w-64 bg-gray-800 text-white shadow-lg py-8 px-4 flex-col space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-600 pb-2">
          Admin Panel
        </h2>
        <button
          onClick={() => navigate("/authorities/profile")}
          className={`text-left px-4 py-2 rounded transition cursor-pointer ${isActive(
            "/authorities/profile"
          )}`}
        >
          👤 Profile
        </button>
        <button
          onClick={() => navigate("/authorities/create-notification")}
          className={`text-left px-4 py-2 rounded transition cursor-pointer ${isActive(
            "/authorities/create-notification"
          )}`}
        >
          📝 Create Notification
        </button>
        <button
          onClick={() => navigate("/authorities/create-event")}
          className={`text-left px-4 py-2 rounded transition cursor-pointer ${isActive(
            "/authorities/create-event"
          )}`}
        >
          📝 Create Event
        </button>
        <button
          onClick={() => navigate("/authorities/view-notification")}
          className={`text-left px-4 py-2 rounded transition cursor-pointer ${isActive(
            "/authorities/view-notification"
          )}`}
        >
          📄 View Notifications
        </button>
        <button
          onClick={() => navigate("/authorities/view-event")}
          className={`text-left px-4 py-2 rounded transition cursor-pointer ${isActive(
            "/authorities/view-notification"
          )}`}
        >
          📄 View Events
        </button>
        <button
          onClick={handleLogout}
          className="mt-auto text-left px-4 py-2 rounded hover:bg-red-600 bg-red-500 transition cursor-pointer"
        >
          🚪 Logout
        </button>
      </div>

      {/* Mobile: Hamburger */}
      <div className="md:hidden p-4 text-blue-950 flex cursor-pointer">
        <button onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile: Full-screen overlay menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-white space-y-6 p-8 h-[100vh]">
          <button
            className="absolute top-5 right-5"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/authorities/profile");
            }}
            className="text-lg px-4 py-2 rounded transition cursor-pointer"
          >
            👤 Profile
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/authorities/create-notification");
            }}
            className="text-lg px-4 py-2 rounded transition cursor-pointer"
          >
            📝 Create Notification
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/authorities/view-notification");
            }}
            className="text-lg px-4 py-2 rounded transition cursor-pointer"
          >
            📄 View Notifications
          </button>

          <button
            onClick={() => navigate("/authorities/create-event")}
            className={`text-left px-4 py-2 rounded transition cursor-pointer ${isActive(
              "/authorities/create-event"
            )}`}
          >
            📝 Create Event
          </button>

          <button
            onClick={() => navigate("/authorities/view-event")}
            className={`text-left px-4 py-2 rounded transition cursor-pointer ${isActive(
              "/authorities/view-notification"
            )}`}
          >
            📄 View Events
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="text-lg px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>
        </div>
      )}
    </>
  );
};

export default AdminMenu;
