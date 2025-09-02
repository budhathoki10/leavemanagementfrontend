import React, { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi"; 
import "../CSS/Profile.css";

const Profile = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [editingName, setEditingName] = useState(false);

  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Snow",
    username: "johnsnow2082",
    profilePic: "https://i.pravatar.cc/150?img=12",
    role: "User",
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
      setShowUpload(false); 
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <main className="main-content">
          <h2 className="main-title">My Profile</h2>

          <div className="profile-header">
            {/* Profile Picture */}
            <div className="avatar-wrapper">
              <img src={user.profilePic} alt="Profile" className="avatar-img" />

              {/* Show either pen OR upload button */}
              {!showUpload ? (
                <button
                  className="edit-icon"
                  onClick={() => setShowUpload(true)}
                >
                  <FiEdit2 size={16} />
                </button>
              ) : (
                <div className="upload-box">
                  <label htmlFor="upload-input" className="upload-btn">
                    Upload New Picture
                  </label>
                  <input
                    type="file"
                    id="upload-input"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button
                    className="cancel-btn"
                    onClick={() => setShowUpload(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            
            <div className="user-info">
              {editingName ? (
                <div className="name-edit">
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                    placeholder="Last Name"
                  />
                  <button
                    className="save-btn"
                    onClick={() => setEditingName(false)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <button
                    className="edit-btn"
                    onClick={() => setEditingName(true)}
                  >
                    Edit Name
                  </button>
                </>
              )}
              <p>{user.role}</p>
              <p>Kathmandu</p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="info-box">
            <h4>Personal Information</h4>
            <div className="info-grid">
              <div>
                <label>First Name</label>
                <input type="text" value={user.firstName} readOnly />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" value={user.lastName} readOnly />
              </div>
              <div>
                <label>Email Address</label>
                <input
                  type="text"
                  value="john.snow@heraldcollege.edu.np"
                  readOnly
                />
              </div>
              <div>
                <label>School</label>
                <input
                  type="text"
                  value="Herald College Kathmandu"
                  readOnly
                />
              </div>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Role</label>
                <input type="text" value={user.role} readOnly />
              </div>
            </div>
          </div>

          
          <div className="info-box">
            <h4>Address</h4>
            <div className="info-grid">
              <div>
                <label>Country</label>
                <input type="text" value="Nepal" readOnly />
              </div>
              <div>
                <label>Location</label>
                <input
                  type="text"
                  value="Naxal Bhagwati Marg, Kathmandu"
                  readOnly
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
