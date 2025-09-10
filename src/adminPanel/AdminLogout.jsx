import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token cookie
    Cookies.remove("token", { path: "/" });
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  // Optional: show something while redirecting
  return <p>Logging out...</p>;
}

export default Logout;
