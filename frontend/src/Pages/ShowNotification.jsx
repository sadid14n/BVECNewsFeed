import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PDFViewer from "../component/PDFViewer";
import { useAuth } from "../Context/AuthContext";
import PDF from "../assets/pdfcon.pdf";

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
import Layout from "../component/Layout";

const ShowNotification = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const [auth, setAuth] = useAuth();
  const [pdfUrl, setPdfUrl] = useState(null);

  const [showScrollButton, setShowScrollButton] = useState(false);

  let PDFUrl =
    "http://localhost:3000/files/1744830798632-QUESTIONNAIRE FOR RESEARCH PROJECT2.pdf";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/notifications/notification/${id}`
        );
        setNotification(res.data.data);
        setPdfUrl(`http://localhost:3000/files/${res.data.data.file}`);
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    };

    fetchNotification();
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

  if (!notification) {
    return (
      <Layout>
        <div className="text-center py-10 text-gray-600">
          Loading notification...
        </div>
      </Layout>
    );
  }

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/notifications/delete/${notification._id}`
      );
      alert("Notification deleted successfully!");
      // Optional: redirect or update UI
      if (res.data.success) {
        navigate("/authorities/view-notification");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting notification");
    }
  };

  return (
    <>
      <Layout>
        <div className="max-w-4xl mx-auto mt-10 px-4">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded cursor-pointer"
          >
            ← Go Back
          </button>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              {notification.title}
            </h1>

            <div className="text-sm text-gray-500 mb-4">
              <p>
                Posted by:{" "}
                <span className="font-semibold">
                  {notification.author.name}
                </span>{" "}
                ({notification.author.role})
              </p>
              <p>Email: {notification.author.email}</p>
              <p>
                Posted on: {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>

            {/* ***** Share the Notification ***** */}

            {/* Share Section */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">
                Share this Notification:
              </h3>
              <div className="flex gap-4">
                <FacebookShareButton
                  url={window.location.href}
                  quote={notification.title}
                >
                  <FacebookIcon size={40} round />
                </FacebookShareButton>

                <TwitterShareButton
                  url={window.location.href}
                  title={notification.title}
                >
                  <TwitterIcon size={40} round />
                </TwitterShareButton>

                <WhatsappShareButton
                  url={window.location.href}
                  title={notification.title}
                >
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>

                <LinkedinShareButton
                  url={window.location.href}
                  summary={notification.description}
                >
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
              </div>
            </div>

            {/* ***** Share the Notification ***** */}

            {auth?.user?.email === notification.author.email && (
              <div className="mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                >
                  Delete Notification
                </button>
              </div>
            )}

            <p className="text-gray-700 mb-6">{notification.description}</p>

            <div className="border-t pt-4">
              <h2 className="text-lg font-medium mb-2">Attached PDF:</h2>

              {pdfUrl && <PDFViewer pdfFile={pdfUrl} />}
            </div>
          </div>

          {/* ***** Scroll to top ***** */}
          {showScrollButton && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition-opacity duration-300"
              title="Go to top"
            >
              ↑
            </button>
          )}
          {/* ***** Scroll to top ***** */}
        </div>
      </Layout>
    </>
  );
};

export default ShowNotification;
