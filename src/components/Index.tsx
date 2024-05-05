import React from "react";
import NavBar from "./NavBar/Navbar";
import { Routes, Route, useParams } from "react-router-dom";
import LoginFrom from "./authentications/LoginFrom";
import RegistrationForm from "./authentications/RegistrationForm";
import VideosList from "./videos/VideosList";
import VideosPlay from "./videos/VideosPlay";

const Index = () => {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<VideosList />} />
        <Route path="/login-user" element={<LoginFrom />} />

        <Route path={"/video-play/:id"} element={<VideosPlay />} />
        <Route path="/resgister-user" element={<RegistrationForm />}></Route>
      </Routes>
    </div>
  );
};

export default Index;
