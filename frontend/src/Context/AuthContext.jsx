import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios - setting token in headers
  axios.defaults.headers.common["Authorization"] =
    auth && `Bearer ${auth?.token}`;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      setAuth({
        ...auth,
        user: JSON.parse(data).user,
        token: JSON.parse(data).token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
