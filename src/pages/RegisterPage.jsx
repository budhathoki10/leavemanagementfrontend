import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";

import "./Register.css";

import leavoLogo from "../assets/leavo-logo.png";

import wolverhamptonLogo from "../assets/wlv-logo.png";

import heraldLogo from "../assets/herald-logo.png";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const password = watch("password");

  // local state for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerAPI = async (data) => {
    const { firstname, lastname, email, password, confirm_password } = data;
    try {
      const response = await fetch(
        // "https://devplat.heraldcollege.edu.np/leavo-api/api/user/register",
          "https://leavooooooooooooo.onrender.com/api/user/register",
        // "http://localhost:5000/api/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            confirm_password,
          }),
        }
      );

      if (!response.ok) {
        let errorMsg = "Unknown error";
        try {
          const errorData = await response.json();
          console.error("Backend error:", errorData);
          errorMsg = errorData.error || JSON.stringify(errorData);
        } catch (e) {
          console.error("Error parsing backend response", e);
        }
        alert("Register failed: " + errorMsg);
        return false;
      }

      alert("Registration successful!");
      return true;
    } catch (error) {
      alert("Error during registration: " + error.message);
      return false;
    }
  };

  const onSubmit = async (data) => {
    console.log("Registered User (frontend):", data);
    const success = await registerAPI(data);
    if (success) {
      reset();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="register-container">
      {/* Left Panel */}
      <div className="register-left">
        <div className="overlay">
          <h1>LEAVE MANAGEMENT</h1>
          <h2>SYSTEM</h2>
          <div className="logo-section">
            <img src={leavoLogo} alt="LEAVO" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="register-right">
        <div className="top-logos">
          <img src={wolverhamptonLogo} alt="Wolverhampton" />
          <img src={heraldLogo} alt="Herald" />
        </div>
        <h2>REGISTRATION</h2>

        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="your@heraldcollege.edu.np"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          {/* Password */}
          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="*******"
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
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          {/* Confirm Password */}
          <label htmlFor="confirm_password">Confirm Password</label>
          <div className="password-field">
            <input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirm_password", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="******"
            />
            <span
              className="toggle-icon"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <MdOutlineVisibility />
              ) : (
                <MdOutlineVisibilityOff />
              )}
            </span>
          </div>
          {errors.confirm_password && (
            <p className="error">{errors.confirm_password.message}</p>
          )}

          <div className="terms">
            <input
              type="checkbox"
              id="agree"
              {...register("agreeTerms", {
                required: "You must accept the terms and conditions",
              })}
            />
            <label htmlFor="agree">I agree to Terms and Conditions</label>
          </div>
          {errors.agreeTerms && (
            <p className="error">{errors.agreeTerms.message}</p>
          )}

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
