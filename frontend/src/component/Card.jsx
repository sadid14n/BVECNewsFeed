import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ titleName, link }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white border border-blue-200 rounded-2xl shadow-md p-5 flex flex-col justify-between">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          {titleName}
        </h3>

        {/* Optional: Show more details like department head */}
        {/* <p className="text-slate-600 text-sm mb-3">Head: {dept.head}</p> */}

        <button
          onClick={() => navigate(link)}
          className="mt-auto bg-blue-900 text-white py-2 px-4 rounded-xl hover:bg-blue-800 transition"
        >
          Visit
        </button>
      </div>
    </>
  );
};

export default Card;
