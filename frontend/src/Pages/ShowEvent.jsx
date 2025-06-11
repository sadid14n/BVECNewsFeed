import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../component/Layout";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { useAuth } from "../Context/AuthContext";

const ShowEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/v1/events/event/${id}`);
        console.log(res.data.data);
        if (res.data.success) {
          setEvent(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!event) {
    return (
      <Layout>
        <div className="text-center py-10 text-gray-600">Loading event...</div>
      </Layout>
    );
  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${baseURL}/api/v1/events/delete/${event._id}`
      );
      alert("Event deleted successfully!");
      // Optional: redirect or update UI
      if (res.data.success) {
        navigate("/authorities/view-event");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting notification");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded cursor-pointer"
        >
          ← Go Back
        </button>

        {auth?.user?.email === event.author.email && (
          <div className="mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
            >
              Delete Event
            </button>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-md">
          {/* Banner */}
          {event.banner && (
            <>
              <img
                src={`${baseURL}/banners/${event.banner}`}
                alt="Event Banner"
                onClick={() => setShowFullImage(true)}
                className="rounded-lg w-full h-60 object-cover mb-6 cursor-pointer"
              />

              {showFullImage && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                  onClick={() => setShowFullImage(false)}
                >
                  <img
                    src={`${baseURL}/banners/${event.banner}`}
                    alt="Full Banner"
                    className="max-w-full max-h-full rounded-lg"
                  />
                </div>
              )}
            </>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold text-blue-800 mb-3">
            {event.title}
          </h1>

          <div className="text-sm text-gray-500 mb-4">
            <p>
              Posted by:{" "}
              <span className="font-semibold">{event.author.name}</span> (
              {event.author.role})
            </p>
            <p>Email: {event.author.email}</p>
            <p>Posted on: {new Date(event.createdAt).toLocaleString()}</p>
          </div>

          {/* Dates */}
          <div className="text-sm text-gray-600 mb-4">
            <p>
              Registration Start:{" "}
              <span className="font-medium text-black">
                {new Date(event.startDate).toLocaleDateString()}
              </span>
            </p>
            <p>
              Registration End:{" "}
              <span className="font-medium text-black">
                {new Date(event.endDate).toLocaleDateString()}
              </span>
            </p>
          </div>

          {/* Share Section */}
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Share this Event:</h3>
            <div className="flex gap-4">
              <FacebookShareButton
                url={window.location.href}
                quote={event.title}
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={window.location.href}
                title={event.title}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={window.location.href}
                title={event.title}
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              <LinkedinShareButton
                url={window.location.href}
                summary={event.description}
              >
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {event.description}
          </p>

          {/* Register Button */}
          {event.googleFormLink && (
            <a
              href={event.googleFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
            >
              Register Now
            </a>
          )}
        </div>

        {/* Scroll to top */}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition-opacity duration-300"
            title="Go to top"
          >
            ↑
          </button>
        )}
      </div>
    </Layout>
  );
};

export default ShowEvent;
