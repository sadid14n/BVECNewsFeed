import React, { createContext, useEffect, useState } from "react";
import Layout from "../component/Layout";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "../component/Card";
import { useData } from "../Context/DataContext";

export const DataContext = createContext({});

const Home = () => {
  const [principalNotifications, setPrincipalNotifications] = useState([]);
  const [suNotifications, setSuNotifications] = useState([]);
  const [departments, setDepartment] = useState([]);
  const [clubs, setClubs] = useState([]);

  const [departmenstProfile, setDepartmentsProfile] = useState([]);

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // fetching post for principal
  const fetchPostsByRole = async (role) => {
    try {
      const res = await axios.get(
        `${baseURL}/api/v1/notifications/role/${role}`
      );
      return res.data.data;
    } catch (err) {
      console.error("Error fetching posts by role:", err);
      return [];
    }
  };

  // fetch User by role
  const getUserByRole = async (role) => {
    try {
      const res = await axios.get(`${baseURL}/api/v1/user/role/${role}`);
      return res.data.data;
    } catch (error) {
      console.log("Getting error while fetch user by role ", error);
      return [];
    }
  };

  useEffect(() => {
    const principalNotifications = async () => {
      const posts = await fetchPostsByRole("principal");
      console.log(posts);
      setPrincipalNotifications(posts);
    };
    const suNotifications = async () => {
      const posts = await fetchPostsByRole("student_union");
      console.log(posts);
      setSuNotifications(posts);
    };

    const getDepartmentsProfiles = async () => {
      const users = await getUserByRole("department");
      setDepartmentsProfile(users);
    };
    const getClubProfiles = async () => {
      const users = await getUserByRole("club");
      setClubs(users);
    };
    principalNotifications();
    suNotifications();
    getDepartmentsProfiles();
    getClubProfiles();
  }, []);

  return (
    <>
      <Layout>
        <DataContext.Provider value={{ departments, setDepartment }}>
          <div className="mx-6">
            {/* First Section */}

            <div className="flex flex-col md:flex-row gap-4 h-auto min-h-[60dvh] w-full px-4 py-6 bg-slate-50">
              {/* Principal Desk Section */}
              <div className="w-full md:w-1/2 border-2 border-blue-900 rounded-2xl p-4 shadow-md bg-white">
                <h2 className="text-3xl font-semibold text-blue-900 mb-4">
                  Principal's Office
                </h2>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scroll">
                  {principalNotifications.length > 0 ? (
                    principalNotifications.map((noti, i) => (
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
                    <p className="text-slate-500 italic">
                      No notifications available.
                    </p>
                  )}
                </div>
              </div>

              {/* Student Union Section */}
              <div className="w-full md:w-1/2 border-2 border-blue-900 rounded-2xl p-4 shadow-md bg-white">
                <h2 className="text-3xl font-semibold text-blue-900 mb-4">
                  Student Union
                </h2>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto custom-scroll">
                  {suNotifications.length > 0 ? (
                    suNotifications.map((noti, i) => (
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
                    <p className="text-slate-500 italic">
                      No notifications available.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Department Profile */}
            <section className="py-7">
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">
                Departments
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {departmenstProfile.map((dept, i) => (
                  <Card
                    key={i}
                    titleName={dept.name}
                    link={`department/${dept._id}`}
                  />
                ))}
              </div>
            </section>

            {/* Club Profiles */}
            <section className="py-7 pb-10">
              <h2 className="text-3xl font-semibold text-blue-900 mb-4">
                Clubs
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {clubs.map((club, i) => (
                  <Card
                    key={i}
                    titleName={club.name}
                    link={`/club/${club._id}`}
                  />
                ))}
              </div>
            </section>
          </div>
        </DataContext.Provider>
      </Layout>
    </>
  );
};

export default Home;
