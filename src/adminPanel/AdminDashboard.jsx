import { useNavigate } from "react-router-dom";
import "../CSS/AdminDashboard.css";
import userImage from "../assets/user.jpeg";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-content">
      {/* Header */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <section className="dashboard-header">
        <p className="dashboard">Dashboard</p>
        <div className="icons">
          <div className="notifications">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <div className="user-pfp">
            <img src={userImage} alt="user" />
          </div>
          <div className="user-text">
            <p className="username">John Snow</p>
            <p className="username-user">Admin</p>
          </div>
        </div>
      </section>
      <hr className="parting-line" />

      {/* Dashboard Body */}
      <div className="dashboard-body">
        {/* Left Panel */}
        <div className="left-panel">
          <p className="subheading">xyz</p>

          <div className="total-leave-card">
            <h2>30</h2>
            <p>Total Leave Requests</p>
          </div>

          <div className="leave-breakdown">
            <div className="leave-card">
              <span className="material-symbols-outlined">
                medical_services
              </span>
              <div>
                <h3>13</h3>
                <p>Medical Leave</p>
              </div>
            </div>

            <div className="leave-card">
              <span className="material-symbols-outlined">emergency</span>
              <div>
                <h3>5</h3>
                <p>Emergency Leave</p>
              </div>
            </div>

            <div className="leave-card">
              <span className="material-symbols-outlined">
                volunteer_activism
              </span>
              <div>
                <h3>2</h3>
                <p>Compassionate Leave</p>
              </div>
            </div>

            <div className="leave-card">
              <span className="material-symbols-outlined">person</span>
              <div>
                <h3>10</h3>
                <p>Personal Leave</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <h3>Pending Actions</h3>
          <div className="pending-box">
            <p>No pending requests</p>
            <a href="#">View all &gt;</a>
          </div>
        </div>
      </div>
    </div>
  );
}
