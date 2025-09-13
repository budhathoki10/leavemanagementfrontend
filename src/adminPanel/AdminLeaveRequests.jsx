import { useState } from "react";
import "../CSS/AdminLeaveRequests.css";
import userImage from "../assets/user.jpeg";

export default function LeaveRequests() {
  const [view, setView] = useState("table"); // "table" or "cards"

  // Sample data
  const requests = [
    {
      name: "Eveline Shah",
      program: "BSCIT, Level 4",
      leavesTaken: 2,
      totalDays: 5,
      email: "np99cs7s200090@heraldcollege.edu.np",
      date: "21/07/2025–23/07/2025",
      type: "Medical",
      status: "Pending",
    },
    {
      name: "Eveline Shah",
      program: "BSCIT, Level 4",
      leavesTaken: 2,
      totalDays: 5,
      email: "np99cs7s200090@heraldcollege.edu.np",
      date: "21/07/2025–23/07/2025",
      type: "Personal",
      status: "Approved",
    },
    {
      name: "Eveline Shah",
      program: "BSCIT, Level 4",
      leavesTaken: 2,
      totalDays: 5,
      email: "np99cs7s200090@heraldcollege.edu.np",
      date: "21/07/2025–23/07/2025",
      type: "Personal",
      status: "Rejected",
    },
    {
      name: "Eveline Shah",
      program: "BSCIT, Level 4",
      leavesTaken: 2,
      totalDays: 5,
      email: "np99cs7s200090@heraldcollege.edu.np",
      date: "21/07/2025–23/07/2025",
      type: "Academic",
      status: "Approved",
    },
  ];

  return (
    <div className="leave-requests-content">
      {/* Header */}
      <section className="dashboard-header">
        <p className="dashboard">Leave Requests</p>
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

      {/* Body */}
      <div className="leave-requests-body">
        <h2 className="subheading">All Leave Requests</h2>

        {/* Controls */}
        <div className="controls">
          <div className="view-buttons">
            <button
              className={`btn ${view === "table" ? "active" : ""}`}
              onClick={() => setView("table")}
            >
              <span className="material-symbols-outlined">list</span>
            </button>
            <button
              className={`btn ${view === "cards" ? "active" : ""}`}
              onClick={() => setView("cards")}
            >
              <span className="material-symbols-outlined">grid_view</span>
            </button>
          </div>

          <div className="sort-search">
            <select>
              <option>Sort by</option>
              <option>Name</option>
              <option>Leave Type</option>
              <option>Date</option>
            </select>
            <input type="text" placeholder="Search" />
          </div>
        </div>

        {/* Table View */}
        {view === "table" && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Leave Type</th>
                  <th>Class Type</th>
                  <th>Dates</th>
                  <th>Files Attached</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, i) => (
                  <tr key={i}>
                    <td>{req.name}</td>
                    <td>{req.type}</td>
                    <td>Lecture, Workshop</td>
                    <td>{req.date}</td>
                    <td>
                      <a href="#">Untitled.pdf</a>
                      <span className="material-symbols-outlined">
                        open_in_new
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Card View */}
        {view === "cards" && (
          <div className="cards-container">
            {requests.map((req, i) => (
              <div
                key={i}
                className={`leave-card-box ${req.status.toLowerCase()}`}
              >
                <div className="card-header">{req.status}</div>
                <div className="card-body">
                  <span className="material-symbols-outlined profile-icon">
                    person
                  </span>
                  <div className="card-info">
                    <p className="name">{req.name}</p>
                    <p>{req.program}</p>
                    <p>📊 {req.leavesTaken} leaves taken</p>
                    <p>🗓 Total {req.totalDays} days</p>
                    <p>📧 {req.email}</p>
                  </div>
                  <div className="card-extra">
                    <p>📅 Date: {req.date}</p>
                    <p>📄 Leave Type: {req.type}</p>
                    <a href="#">Details</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
