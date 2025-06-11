import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNotification = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [allNotifications, setAllNotifications] = useState(null);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const result = await axios.post(
        `${baseURL}/api/v1/notifications/upload-files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTitle("");
      setDescription("");
      setFile(null);
      fileInputRef.current.value = null; // resets file input

      console.log("Upload successful", result.data);
      alert("Notification uploaded successfully!");
      navigate("/authorities/view-notification");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Failed to upload. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Create a Notification
        </h1>

        <div>
          <label className="block mb-1 text-gray-600 font-medium">Title</label>
          <input
            type="text"
            value={title}
            placeholder="Enter notification title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600 font-medium">
            Description
          </label>
          <textarea
            placeholder="Enter description"
            rows="4"
            value={description}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-gray-600 font-medium">
            Upload PDF
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf, image/png, image/jpeg"
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNotification;
