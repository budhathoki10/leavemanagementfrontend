import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";   
import "../CSS/Profile.css";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();   

  const [user, setUser] = useState({
    fullName: "None",
    dob: "2005-10-20", 
    country: "Nepal",
    language: "English (United States)",
    profilePic: "",
  });


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, profilePic: imageUrl });
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
          <h3>Full name</h3>
          {!editing ? (
            <>
              <p>{user.fullName}</p>
              <button
                className="link-btn"
                onClick={() => setUser({ ...user, fullName: "John Snow" })}
              >
                Add a name
              </button>
            </>
          ) : (
            <input
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            />
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
          <span className="change">Click here to change your current password </span> 
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
