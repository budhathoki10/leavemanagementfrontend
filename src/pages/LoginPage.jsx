import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import leavoLogo from "../assets/leavo-logo.png";
import wolverhamptonLogo from "../assets/wlv-logo.png";
import heraldLogo from "../assets/Logo.png";
import Cookies from "js-cookie";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import googleLogo from "../assets/google.png";
import { apiUrl, GOOGLE_AUTH_URL } from "../config/auth";
import "./Login.css";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load saved credentials if "Remember Me" was previously checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const googleToken = params.get("token");
    const redirect = params.get("redirect") || "/dashboard";
    const authError = params.get("authError");

    if (authError) {
      alert(`Google sign-in failed: ${authError}`);
      window.history.replaceState(null, "", window.location.pathname);
      return;
    }

    if (googleToken) {
      Cookies.set("token", googleToken, { expires: 90, path: "/" });
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  // Regular login via email/password
  const loginAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        apiUrl("/user/login"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, rememberMe }),
          credentials: "include",
        }
      );

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      if (!response.ok) {
        const errorMsg = data.error || "Unknown error";
        console.error("Login failed:", errorMsg);
        alert(`Login failed: ${errorMsg}`);
        setLoading(false);
        return false;
      }

      Cookies.set("token", data.token, { expires: 90, path: "/" });

      console.log("Login response:", data);

      // Handle "Remember Me" storage
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password); // Note: Storing passwords is insecure
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      //admin email
      if (email === "studentservicedepartment@heraldcollege.edu.np") {
        navigate("/adminDashboard");
      } else {
        navigate("/dashboard");
      }

      return true;
    } catch (error) {
      console.error("Error during login:", error);
      alert(`Error during login: ${error.message}`);
      setLoading(false);
      return false;
    }
  };

  // Google sign-in
  const handleGoogleSignIn = () => {
    setLoading(true);
    window.location.assign(GOOGLE_AUTH_URL);
  };

  // Handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const success = await loginAPI();
    if (success) {
      setEmail("");
      setPassword("");
      setRememberMe(false);
    }
  };

  return (
    <div className="login-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading">
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

            <button type="submit" disabled={loading}>
              Sign In
            </button>
          </form>

          <p className="login-text">
            Don't have an account? <Link to="/">Register here</Link>
          </p>

          <div className="or-divider">OR</div>

          <button
            className="google-signin"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <img src={googleLogo} alt="Google logo" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
