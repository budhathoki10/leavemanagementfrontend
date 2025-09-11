import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";   
import Cookies from "js-cookie";
import "../CSS/Profile.css";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    dob: "2005-10-20",
    country: "Nepal",
    language: "English (United States)",
    profilePic: "",
  });
  const navigate = useNavigate();   


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("token"); 
        if (!token) {
          console.error("No token found, redirecting to login");
          navigate("/login");
          return;
        }

        const res = await fetch(
          "https://leave-management-backend-1-mp7s.onrender.com/api/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data && data.data) {
          setUser((prev) => ({
            ...prev,
            fullName: data.data.studentname || prev.fullName,
            email: data.data.email || prev.email,
          }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  const handleSave = () => {
    setEditing(false);

  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-photo">
            {user.profilePic ? (
              <img src={user.profilePic} alt="Profile" />
            ) : (
              <div className="photo-placeholder"></div>
            )}
          </div>
          <div className="photo-upload">
            <label htmlFor="upload-input" className="upload-btn">
              Add a photo
            </label>
            <input
              type="file"
              id="upload-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="profile-right">
          {!editing ? (
            <>
              <p style={{ fontSize: "32px", fontWeight: "500" }}>
                {user.fullName}
              </p>
              <p style={{ fontSize: "14px", color: "#555" }}>{user.email}</p>
            </>
          ) : (
            <>
              <input
                type="text"
                value={user.fullName}
                onChange={(e) =>
                  setUser({ ...user, fullName: e.target.value })
                }
              />
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </>
          )}
        </div>
      </div>

      <div className="info-box">
        <div className="info-header">
          <h4>Profile info</h4>
          {!editing ? (
            <button className="link-btn" onClick={() => setEditing(true)}>
              Edit profile info
            </button>
          ) : (
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div className="info-item">
          <div className="info-content">
            <strong>Date of birth</strong>
            {!editing ? (
              <p className="info-value">
                {isNaN(new Date(user.dob))
                  ? "Invalid Date"
                  : new Date(user.dob).toLocaleDateString()}
              </p>
            ) : (
              <input
                type="date"
                value={user.dob}
                onChange={(e) => setUser({ ...user, dob: e.target.value })}
              />
            )}
          </div>
          <span className="info-description">
            Your date of birth is used for account safety setting
          </span>
        </div>

        <div className="info-item">
          <div className="info-content">
            <strong>Country or region</strong>
            {!editing ? (
              <p className="info-value">{user.country}</p>
            ) : (
              <input
                type="text"
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              />
            )}
          </div>
          <span className="info-description">
            Your country and region are used for privacy settings
          </span>
        </div>

        <div
          className="info-item clickable"
          onClick={() => navigate("/changeprofile")}
        >
          <div className="info-content">
            <strong>Change Password</strong>
          </div>
          <span className="change">
            Click here if u want to change your password
          </span>
        </div>

        <div className="info-item">
          <div>
            <strong>Feel free to contact us</strong>
            <span>Naxal Bhagwati Marga, Kathmandu, Nepal</span>
          </div>
          <div>
            <span>Phone: </span>
            <strong>+9779801022637</strong>
          </div>
          <span>Email: </span>
          <strong>Heraldcollege@gmail.com</strong>
        </div>
      </div>
    </div>
  );
};

export default Profile;
