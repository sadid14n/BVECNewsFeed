import React, { useRef, useState } from "react";
import Layout from "../../component/Layout";
import axios from "axios";
import AdminMenu from "../../component/Authorities/AdminMenu";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: "",
    banner: "",
    description: "",
    startDate: "",
    endDate: "",
    googleFormLink: "",
  });

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/events/create-event",
        event,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Event Created Successfully!");
      console.log(res.data);

      setEvent({
        title: "",
        banner: "",
        description: "",
        startDate: "",
        endDate: "",
        googleFormLink: "",
      });
      fileInputRef.current.value = null;

      if (res.data.success) {
        navigate("/authorities/view-event");
      }
    } catch (error) {
      console.error("Error in creating", error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminMenu />
        <div className="flex-1">
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
              className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md space-y-6"
              onSubmit={handleSubmit}
            >
              <h1 className="text-center text-3xl font-bold text-gray-800">
                Create Event
              </h1>

              {/* Title */}
              <div>
                <label className="block mb-1 text-gray-600 font-medium">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter event title"
                  value={event.title}
                  onChange={(e) =>
                    setEvent((prevEvent) => ({
                      ...prevEvent,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1 text-gray-600 font-medium">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Enter event description"
                  rows="4"
                  value={event.description}
                  onChange={(e) =>
                    setEvent((prevEvent) => ({
                      ...prevEvent,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              {/* Start and End Date */}
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="w-full">
                  <label className="block mb-1 text-gray-600 font-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={event.startDate}
                    onChange={(e) =>
                      setEvent((prevEvent) => ({
                        ...prevEvent,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1 text-gray-600 font-medium">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={event.endDate}
                    onChange={(e) =>
                      setEvent((prevEvent) => ({
                        ...prevEvent,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Upload Event Banner */}
              <div>
                <label className="block mb-1 text-gray-600 font-medium">
                  Upload Event Banner <span className="text-red-500">*</span>
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
                  required
                  onChange={(e) =>
                    setEvent((prevEvent) => ({
                      ...prevEvent,
                      banner: e.target.files[0],
                    }))
                  }
                />
              </div>

              {/* Google Form Link */}
              <div>
                <label className="block mb-1 text-gray-600 font-medium">
                  Google Form Link
                </label>
                <input
                  type="text"
                  placeholder="Enter Google Form link"
                  value={event.googleFormLink}
                  onChange={(e) =>
                    setEvent((prevEvent) => ({
                      ...prevEvent,
                      googleFormLink: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;
