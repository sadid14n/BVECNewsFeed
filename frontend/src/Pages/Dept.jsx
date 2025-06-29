import React, { useContext, useEffect, useState } from "react";
import Layout from "../component/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotificationBox from "./../component/NotificationBox";
import EventCard from "../component/EventCard.jsx";

const Dept = () => {
  const [department, setDepartment] = useState();
  const [notifications, setNotifications] = useState([]);
  const [events, setEvents] = useState([]);

  const { id } = useParams();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const getDepartmentInfo = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/v1/user/get-department/${id}`
      );
      console.log(res.data.user);
      setDepartment(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartmentNotification = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/v1/notifications/get-notification/user/${id}`
      );
      console.log("Notifications", res.data.data);
      setNotifications(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartmentEvents = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/v1/events/get-events/user/${id}`
      );
      console.log("Events", res.data.data);
      setEvents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartmentInfo();
    getDepartmentNotification();
    getDepartmentEvents();
  }, []);
  return (
    <Layout>
      <div>
        <h1 className="text-center text-4xl py-4 bg-blue-300">
          {department && department.name}
        </h1>
      </div>
      <div className="w-[80%] mx-auto bg-slate-100 mt-5">
        <NotificationBox
          heading={"All Notifications"}
          notificationList={notifications}
        />
      </div>

      <div className="w-[80%] mx-auto mt-10">
        <h2 className="text-4xl font-semibold mb-4 pb-4">Recent Events:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                image={`${baseURL}/banners/${event.banner}`}
                title={event.title}
                description={event.description}
                eventId={event._id}
              />
            ))
          ) : (
            <p className="text-center col-span-full">No events available.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dept;
