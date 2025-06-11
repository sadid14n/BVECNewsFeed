import React, { useEffect, useState } from "react";
import AdminMenu from "../../component/Authorities/AdminMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/Layout";

const ViewNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/v1/notifications/getAllNotificationsByAuthor`
      );
      if (res.data.success) {
        setNotifications(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <>
      <Layout>
        <div className="flex min-h-screen">
          {/* Left side menu */}
          <AdminMenu />

          {/* Right side content */}
          <div className="flex-1 bg-gray-100 p-8">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Your Notifications</h2>
              <ul className="space-y-2">
                {notifications.length === 0 ? (
                  <p>No notifications found.</p>
                ) : (
                  notifications.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => navigate(`/notifications/${item._id}`)}
                      className="bg-white shadow-md p-3 rounded-md border hover:bg-gray-50 transition cursor-pointer"
                    >
                      {item.title}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ViewNotification;
