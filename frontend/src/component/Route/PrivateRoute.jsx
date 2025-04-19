import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/user-auth"
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};
