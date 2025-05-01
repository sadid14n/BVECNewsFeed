import React from "react";
import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const EventCard = ({ image, title, description, eventId }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">
          {truncateText(title, 40)}
        </h2>
        <p className="text-gray-600 mb-4">{truncateText(description, 150)}</p>
        <Link
          to={`/event/${eventId}`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          See Event
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
