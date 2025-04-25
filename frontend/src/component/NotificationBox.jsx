import React from "react";
import { useNavigate } from "react-router-dom";

const NotificationBox = ({ heading, notificationList }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full border-2 border-blue-900 rounded-2xl p-4 shadow-md bg-white">
        <h2 className="text-3xl font-semibold text-blue-900 mb-4">{heading}</h2>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scroll">
          {notificationList.length > 0 ? (
            notificationList.map((noti, i) => (
              <div
                key={i}
                className="bg-blue-100 border border-blue-300 rounded-xl px-4 py-3 hover:bg-blue-200 transition cursor-pointer"
                onClick={() => navigate(`/notifications/${noti._id}`)}
              >
                <p className="text-base text-slate-800 font-medium">
                  {noti.title}
                </p>
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic">No notifications available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationBox;
