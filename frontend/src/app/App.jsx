import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Landing from "../pages/navigation/Landing";
import Login from "../pages/auth/Login";
import Home from "../pages/navigation/Home";
import FourOhFour from "../pages/error/FourOhFour";

import VideoLobby from "../pages/navigation/VideoLobby";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/video" element={<VideoLobby />} />
        <Route path="*" element={<FourOhFour />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
