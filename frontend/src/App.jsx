import { useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Sample from "./Pages/Sample";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import AuthoritiesProfile from "./Pages/Authorities/AuthoritiesProfile";
import Auth from "./Auth/auth";
import { PrivateRoute } from "./component/Route/PrivateRoute";
import AuthCreateNotification from "./Pages/Authorities/AuthCreateNotification";
import ViewNotification from "./Pages/Authorities/ViewNotification";
import ShowNotification from "./Pages/ShowNotification";
import Dept from "./Pages/Dept";
import Club from "./Pages/Club";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sample" element={<Sample />} />
      <Route path="/department/:id" element={<Dept />} />
      <Route path="/club/:id" element={<Club />} />

      <Route path="/notifications/:id" element={<ShowNotification />} />

      <Route path="/authorities" element={<PrivateRoute />}>
        <Route path="profile" element={<AuthoritiesProfile />} />
        <Route
          path="create-notification"
          element={<AuthCreateNotification />}
        />
        <Route path="view-notification" element={<ViewNotification />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
