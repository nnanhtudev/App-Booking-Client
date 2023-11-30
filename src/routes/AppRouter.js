import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import List from "../pages/list/List";
import Hotel from "../pages/hotel/Hotel";
import Register from "../pages/auth/register/Register";
import Login from "../pages/auth/login/Login";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<List />} />
      <Route path="/hotels-booking/:id" element={<PrivateRoutes />} />
      <Route path="/hotels/:id" element={<Hotel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/transaction" element={<PrivateRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
