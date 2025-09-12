import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token cookie
    Cookies.remove("token", { path: "/" });

    // Optional: clear other storage
    localStorage.removeItem("user");
    const timer = setTimeout(() => {
      navigate("/login");
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <p>Logging out...</p>;
}

export default Logout;
