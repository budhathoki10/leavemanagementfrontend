import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import leavoLogo from "../assets/leavo-logo.png";
import wolverhamptonLogo from "../assets/wlv-logo.png";
import heraldLogo from "../assets/Logo.png";
import microsoftLogo from "../assets/Mircosoft.png";
import axios from "axios";
import { auth, provider } from "./FireBase";
import Cookies from "js-cookie";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const loginAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://devplat.heraldcollege.edu.np/leavo-api/api/user/login",
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
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      navigate("/dashboard");
      return true;
    } catch (error) {
      alert("Error during login: " + error.message);
      return false;
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const success = await loginAPI();
    if (success) {
      setEmail("");
      setPassword("");
      setRememberMe(false);
    } else {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
        try {
      setLoading(true);
      const loginResponse = await signInWithPopup(auth, provider);
      const user = loginResponse.user;
        console.log(loginResponse)
        console.log(user)
      const userData = {
        email: user.email,
        studentname:user.displayName
      };

      const response = await axios.post(
        "https://devplat.heraldcollege.edu.np/leavo-api/api/loginwithmicrosoft",
        userData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = response.data;
      console.log(response);
      console.log("Login successful:", data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading">
            <p>Loading...</p>
          </div>
        </div>
      )}

      <div className="login-left">
        <div className="overlay">
          <h1>LEAVE MANAGEMENT</h1>
          <h2>SYSTEM</h2>
          <div className="logo-section">
            <img src={leavoLogo} alt="LEAVO" />
          </div>
        </div>
      </div>

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
              placeholder="your@heraldcollege.edu.np"
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
            Don't have an account? <Link to="/">Register here</Link>
          </p>

          <div className="or-divider">OR</div>

          <button className="google-signin" onClick={handleGoogleSignIn}>
            <img src={microsoftLogo} alt="Microsoft logo" />
            Sign in with Microsoft
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
