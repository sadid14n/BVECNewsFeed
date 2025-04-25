import React, { useContext, useEffect, useState } from "react";
import Layout from "../component/Layout";
import { useData } from "../Context/DataContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotificationBox from "./../component/NotificationBox";

const Club = () => {
  const [club, setClub] = useState();
  const [notifications, setNotifications] = useState([]);

  const { id } = useParams();

  const getClubInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user/get-club/${id}`
      );
      console.log(res.data.user);
      setClub(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getClubNotification = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/notifications/get-notification/user/${id}`
      );
      console.log("Notifications", res.data.data);
      setNotifications(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClubInfo();
    getClubNotification();
  }, []);
  return (
    <Layout>
      <div>
        <h1 className="text-center text-4xl py-4 bg-blue-300">
          {club && club.name}
        </h1>
      </div>
      <div className="w-[80%] mx-auto bg-slate-100 mt-5">
        <NotificationBox
          heading={"All Notifications"}
          notificationList={notifications}
        />
      </div>
    </Layout>
  );
};

export default Club;
