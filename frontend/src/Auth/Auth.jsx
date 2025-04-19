import React from "react";
import { useAuth } from "../Context/AuthContext";

const Auth = () => {
  const [auth, setAuth] = useAuth();
  return <pre>{JSON.stringify(auth, null, 4)}</pre>;
};

export default Auth;
