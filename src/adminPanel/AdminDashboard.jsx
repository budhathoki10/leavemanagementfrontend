import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";
import "../CSS/AdminDashboard.css";
import userImage from "../assets/user.jpeg";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // ✅ Logout confirmation toggle
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();
  const API_BASE = "https://leave-management-backend-1-mp7s.onrender.com/api";

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${API_BASE}/task/viewleave`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.success && Array.isArray(response.data.data)) {
          setLeaveRequests(response.data.data);
        } else {
          setLeaveRequests([]);
        }
      } catch (err) {
        setError("Failed to fetch leave requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  // ✅ Approve leave
  const handleApprove = async (id) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token available");

      const response = await axios.put(
        `${API_BASE}/task/updateleave/${id}`,
        { status: "approve" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Approve Response:", response.data);

      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status: "approve" } : leave
        )
      );
    } catch (error) {
      console.error("Error approving leave:", error);
      setError(
        `Failed to approve leave: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // ✅ Reject leave
  const handleReject = async (id) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token available");

      const response = await axios.put(
        `${API_BASE}/task/updateleave/${id}`,
        { status: "reject" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Reject Response:", response.data);

      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status: "reject" } : leave
        )
      );
    } catch (error) {
      console.error("Error rejecting leave:", error);
      setError(
        `Failed to reject leave: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // ✅ Logout handler
  const handleLogout = () => {
    Cookies.remove("token"); // remove auth token
    setShowLogoutConfirm(false);
    navigate("/login"); // redirect to login
  };

  // ✅ Filtered requests
  const filteredRequests =
    filter === "all"
      ? leaveRequests
      : leaveRequests.filter((req) => req.status === filter);

  return (
    <div className="dashboard-content">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <section className="dashboard-header">
        <p className="dashboard">Dashboard</p>
        <div className="icons">
          {/* ⚡ Settings Icon */}
          <div
            className="notifications"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <span className="material-symbols-outlined">settings</span>
          </div>

          {/* ✅ Settings Dropdown */}
          {showSettings && (
            <div className="settings-dropdown">
              <p className="dropdown-item" onClick={() => navigate("/profile")}>
                Profile
              </p>
              <p
                className="dropdown-item"
                onClick={() => navigate("/changeprofilePassword")}
              >
                Change Password
              </p>
              <p
                className="dropdown-item"
                onClick={() => navigate("/notifications")}
              >
                Notifications
              </p>
              <p
                className="dropdown-item"
                onClick={() => navigate("/feedback")}
              >
                Feedback and Support
              </p>
              <hr />
              <p
                className="dropdown-item signout"
                onClick={() => setShowLogoutConfirm(true)}
              >
                Sign Out
              </p>
            </div>
          )}

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

      <div className="dashboard-body">
        <p className="subheading">All Leave Requests</p>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="sort-dropdown"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approve">Approved</option>
          <option value="reject">Rejected</option>
        </select>

        {loading ? (
          <p>Loading requests...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : filteredRequests.length === 0 ? (
          <p>No leave requests</p>
        ) : (
          <div className="leave-list">
            {filteredRequests.map((leave) => (
              <div key={leave._id} className="leave-card">
                <div className="leave-header">
                  <span className="leave-user">
                    {leave.studentdetail?.email || "Unknown"}
                  </span>
                  <span className="leave-date">
                    {format(new Date(leave.createdAt), "MM/dd/yyyy")}
                  </span>
                </div>

                <div className="leave-details">
                  <p>
                    <strong>Leave Type:</strong> {leave.leaveType}
                  </p>
                  <p>
                    <strong>Reason:</strong> {leave.reason}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`status-${leave.status}`}>
                      {leave.status.charAt(0).toUpperCase() +
                        leave.status.slice(1)}
                    </span>
                  </p>
                  <p>
                    <strong>Level:</strong> {leave.level}
                  </p>
                </div>

                <div className="leave-actions">
                  <button
                    className="details-btn"
                    onClick={() => {
                      setSelectedLeave(leave);
                      setShowModal(true);
                    }}
                  >
                    View Details
                  </button>

                  {leave.status === "approve" ? (
                    <button className="approve-btn" disabled>
                      Approved
                    </button>
                  ) : leave.status === "reject" ? (
                    <button className="reject-btn" disabled>
                      Rejected
                    </button>
                  ) : (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(leave._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(leave._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-dialog">
            <p>Do you really want to sign out?</p>
            <div className="logout-confirm-buttons">
              <button className="logout-yes" onClick={handleLogout}>
                Yes
              </button>
              <button
                className="logout-no"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ MODAL */}
      {showModal && selectedLeave && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Leave Details</h2>
              <span className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </span>
            </div>
            <div className="modal-body">
              <p>
                <strong>Level:</strong> {selectedLeave.level}
              </p>
              <p>
                <strong>Leave Type:</strong> {selectedLeave.leaveType}
              </p>
              <p>
                <strong>Status:</strong> {selectedLeave.status}
              </p>
              <p>
                <strong>Reason:</strong> {selectedLeave.reason}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {format(new Date(selectedLeave.createdAt), "MMMM dd, yyyy")}
              </p>

              <h3>Modules</h3>
              {selectedLeave.modules?.length > 0 ? (
                selectedLeave.modules.map((mod, idx) => (
                  <div key={idx} className="module-card">
                    <p>
                      <strong>Module:</strong> {mod.moduleName}
                    </p>
                    <p>
                      <strong>Week:</strong> {mod.week}
                    </p>
                    <p>
                      <strong>Class Type:</strong> {mod.classType}
                    </p>
                    <p>
                      <strong>Leave Day(s):</strong> {mod.leaveDays}
                    </p>
                  </div>
                ))
              ) : (
                <p>No modules assigned</p>
              )}

              {/* ✅ Fixed Image Preview */}
              <div className="leave-image">
                <h3>Attached Image</h3>
                {selectedLeave.image_data != null ? (
                  <img
                    src={selectedLeave.image_data.secure_url}
                    alt="Attached Leave"
                    className="attached-img"
                  />
                ) : (
                  <p>No image provided</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
