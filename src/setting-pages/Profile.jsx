import React from "react";
import { FaUserCircle } from "react-icons/fa";

import "../CSS/Profile.css";

const Profile = () => {
  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <main className="main-content">
          <h2 className="main-title">My Profile</h2>

          <div className="profile-header">
            <FaUserCircle className="avatar-icon" />
            <div className="user-info">
              <h3>John Snow</h3>
              <p>Student</p>
              <p>Kathmandu</p>
            </div>
          </div>

          <div className="info-box">
            <h4>Personal Information</h4>
            <div className="info-grid">
              <div>
                <label>First Name</label>
                <p>John</p>
              </div>
              <div>
                <label>Last Name</label>
                <p>Snow</p>
              </div>
              <div>
                <label>Email Address</label>
                <p>john.snow@heraldcollege.edu.np</p>
              </div>
              <div>
                <label>Phone</label>
                <p>9800000000</p>
              </div>
              <div>
                <label>Username</label>
                <p>johnsnow</p>
              </div>
              <div>
                <label>School</label>
                <p>Herald College Kathmandu</p>
              </div>
              <div>
                <label>Role</label>
                <p>Student</p>
              </div>
            </div>
          </div>

          <div className="info-box">
            <h4>Address</h4>
            <div className="info-grid">
              <div>
                <label>Country</label>
                <p>Nepal</p>
              </div>
              <div>
                <label>Location</label>
                <p>Naxal Bhagwati Marg, Kathmandu</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
