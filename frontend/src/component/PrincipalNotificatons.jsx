import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PrincipalNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const principalEmail = "me@bvec.com"; // Replace with actual email

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.post(
          `${baseURL}/api/v1/notifications/getAllNotificationsByAuthor`,
          { email: principalEmail }
        );
        setNotifications(res.data.data);
        console.log(notifications);
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Principal Notifications
      </h2>
      <ul className="space-y-3">
        {notifications.map((n) => (
          <li
            key={n._id}
            className="bg-white shadow-md rounded p-4 hover:bg-gray-100 transition"
          >
            <Link
              to={`/notification/${n._id}`}
              className="text-blue-600 hover:underline"
            >
              {n.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrincipalNotifications;
