import { useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Departments from "./component/department";
import CSEDepartment from "./deptpages/CSEdepartment";
import ETEDepartment from "./deptpages/ETEdepartment";
import CEDepartment from "./deptpages/CEdepartment";
import Events from "./component/events";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Departments />} />
        <Route path="/departments/cse" element={<CSEDepartment />} />
        <Route path="/departments/ee" element={<ETEDepartment />} />
        <Route path="/departments/ce" element={<CEDepartment />} />
        <Route path="/events" element={<Events/>} />
    </Routes>
  );
}

export default App;
