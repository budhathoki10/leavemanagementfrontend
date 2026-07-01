import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import leavoLogo from "../assets/leavo-logo.png";
import heraldLogo from "../assets/herald-logo.png";
import wolverhamptonLogo from "../assets/wlv-logo.png";
import Cookies from "js-cookie";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import googleLogo from "../assets/google.png";
import { apiUrl, GOOGLE_AUTH_URL } from "../config/auth";

import "../CSS/AdminLogin.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // API call function
  const loginAPI = async () => {
    try {
      const response = await fetch(
        apiUrl("/admin/login"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, rememberMe }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        let errorMsg = "Unknown error";
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || JSON.stringify(errorData);
        } catch (e) {
          console.error("Error parsing backend response", e);
        }
        alert("Login failed: " + errorMsg);
        return false;
      }

      const data = await response.json();
      Cookies.set("token", data.token, { expires: 90, path: "/" });

      navigate("/adminDashboard");
      return true;
    } catch (error) {
      alert("Error during login: " + error.message);
      return false;
    }
  };

  // Submit handler
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const success = await loginAPI();
    if (success) {
      setEmail("");
      setPassword("");
      setRememberMe(false);
    }
  };

  const handleGoogleSignIn = () => {
    window.location.assign(GOOGLE_AUTH_URL);
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-left">
        <div className="overlay">
          <h1>LEAVE MANAGEMENT</h1>
          <h2>SYSTEM</h2>
          <div className="logo-section">
            <img src={leavoLogo} alt="LEAVO" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="top-logos">
          <img src={wolverhamptonLogo} alt="Wolverhampton" />
          <img src={heraldLogo} alt="Herald" />
        </div>

        <div className="form-container">
          <h2>LOG IN</h2>
          <form onSubmit={handleSubmitForm}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <MdOutlineVisibility />
                ) : (
                  <MdOutlineVisibilityOff />
                )}
              </span>
            </div>

            <div className="term">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password
              </Link>
            </div>

            <button type="submit">Sign In</button>
          </form>

          <p>
            Don't have an account? <Link to="/admin-register">Register here</Link>
          </p>

          <div className="or-divider">OR</div>
          <button className="google-signin" onClick={handleGoogleSignIn}>
            <img src={googleLogo} alt="Google logo" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
