import React from 'react'
import NavBar from './NavBar/Navbar'
import { Routes, Route, useParams } from "react-router-dom";
import LoginFrom from './authentications/LoginFrom';
import RegistrationForm from './authentications/RegistrationForm';

const Index = () =>  {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/login-user" element={<LoginFrom />} />

        {/* <Route path={"/todo-list"} element={<TodoInputShows />} /> */}
        <Route path="/resgister-user" element={<RegistrationForm/>} ></Route>
      </Routes>
    </div>
  )
}

export default Index
