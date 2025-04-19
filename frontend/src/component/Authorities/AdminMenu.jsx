import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const AdminMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-700 text-white font-semibold"
      : "hover:bg-gray-700";

  return (
    <div className="min-h-screen w-64 bg-gray-800 text-white shadow-lg py-8 px-4 flex flex-col space-y-4">
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
        onClick={() => navigate("/authorities/view-notification")}
        className={`text-left px-4 py-2 rounded transition cursor-pointer ${isActive(
          "/authorities/view-notification"
        )}`}
      >
        📄 View Notifications
      </button>

      <button
        onClick={handleLogout}
        className="mt-auto text-left px-4 py-2 rounded hover:bg-red-600 bg-red-500 transition cursor-pointer"
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default AdminMenu;
