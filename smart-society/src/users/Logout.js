import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

function Logout() {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      navigate("/login");
    }
    const url = `${process.env.REACT_APP_BACKEND_HOST}/api/logout/`;
    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      await response.json();
    };
    localStorage.getItem("token") && fetchData();
  }, [navigate]);

  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("group");
  localStorage.setItem("isLoggedIn", "false");
  return <Navigate to="/login" />;
}

export default Logout;
