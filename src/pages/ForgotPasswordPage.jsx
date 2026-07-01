import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import leavoLogo from "../assets/leavo-logo.png";
import wolverhamptonLogo from "../assets/wlv-logo.png";
import heraldLogo from "../assets/herald-logo.png";
import { apiUrl } from "../config/auth";
import "./Login.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const readResponse = async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || data.message || "Request failed");
    }
    return data;
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apiUrl("/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      await readResponse(response);
      setOtpSent(true);
      alert("OTP sent to your email.");
    } catch (error) {
      alert(`Could not send OTP: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(apiUrl("/reset-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      await readResponse(response);
      alert("Password reset successful.");
      navigate("/login", { replace: true });
    } catch (error) {
      alert(`Could not reset password: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
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
          <h2>RESET PASSWORD</h2>
          <form onSubmit={otpSent ? handleResetPassword : handleSendOtp}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={otpSent || loading}
              required
            />

            {otpSent && (
              <>
                <label htmlFor="otp">OTP</label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="123456"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  required
                />

                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="********"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
              </>
            )}

            <button type="submit" disabled={loading}>
              {otpSent ? "Reset Password" : "Send OTP"}
            </button>
          </form>

          <p className="login-text">
            Remembered it? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
