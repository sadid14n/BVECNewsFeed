import { useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Sample from "./Pages/Sample";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sample" element={<Sample />} />
    </Routes>
  );
}

export default App;
