import React, { useEffect, useState } from "react";
import AdminMenu from "../../component/Authorities/AdminMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/Layout";
import EventCard from "../../component/EventCard";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/v1/events/getEventsForAuthor`
      );
      if (res.data.success) {
        console.log(res.data.data);
        setEvents(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <Layout>
        <div className="flex min-h-screen">
          {/* Left side menu */}
          <AdminMenu />

          {/* Right side content */}
          {/* <div className="flex-1 bg-gray-100 p-8">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Your Events</h2>
              <ul className="space-y-2">
                {events.length === 0 ? (
                  <p>No events found.</p>
                ) : (
                  events.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => navigate(`/event/${item._id}`)}
                      className="bg-white shadow-md p-3 rounded-md border hover:bg-gray-50 transition cursor-pointer"
                    >
                      {item.title}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div> */}
          <div className="flex-1 bg-gray-100 p-8">
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-6">Your Events</h2>

              {events.length === 0 ? (
                <p className="text-gray-500">No events found.</p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {events.map((event) => (
                    <EventCard
                      key={event._id}
                      image={
                        `${baseURL}/banners/${event.banner}` ||
                        "https://via.placeholder.com/400x250"
                      }
                      title={event.title}
                      description={event.description}
                      eventId={event._id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ViewEvents;
