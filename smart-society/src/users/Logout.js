import React from "react";
import { Navigate } from "react-router";

function Logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.setItem("isLoggedIn", "false");
  return <Navigate to="/login" />;
}

export default Logout;
