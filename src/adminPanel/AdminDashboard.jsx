import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";
import "../CSS/AdminDashboard.css";
import userImage from "../assets/user.jpeg";

export default function AdminDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const navigate = useNavigate();
  const API_BASE = "https://leave-management-backend-kkk.onrender.com/api";

  // Fetch leave requests (with optional status filter)
  const fetchLeaves = async (statusFilter = "all") => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;

      const response = await axios.get(`${API_BASE}/task/viewleave`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (response.data?.success && Array.isArray(response.data.data)) {
        setLeaveRequests(response.data.data);
      } else {
        setLeaveRequests([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch leave requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleApprove = async (id) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token available");

      await axios.put(
        `${API_BASE}/task/updateleave/${id}`,
        { status: "approve" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchLeaves(filter);
    } catch (error) {
      console.error("Approve error:", error);
      setError(
        `Failed to approve leave: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleReject = async (id) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token available");

      await axios.put(
        `${API_BASE}/task/updateleave/${id}`,
        { status: "reject" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchLeaves(filter);
    } catch (error) {
      console.error("Reject error:", error);
      setError(
        `Failed to reject leave: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(leaveRequests.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-dashboard">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      />

      {/* HEADER */}
      <section className="dashboard-header">
        <p className="dashboard">Dashboard</p>
        <div className="icons">
          <div
            className="notifications"
            onClick={() => setShowSettings((prev) => !prev)}
          >
            <span className="material-symbols-outlined">settings</span>
          </div>

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
            <p className="username">Student Service Department </p>
            <p className="username-user">Admin</p>
          </div>
        </div>
      </section>

      <hr className="parting-line" />

      {/* BODY */}
      <div className="dashboard-body">
        <div className="content-header">
          <h2>Leave Requests</h2>
          <div className="filter-controls">
            <label htmlFor="status-filter">Filter by Status:</label>
            <select
              id="status-filter"
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="status-filter"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approve">Approved</option>
              <option value="reject">Rejected</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading leave requests...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <span className="material-icons">error</span>
            <p>{error}</p>
            <button
              className="retry-btn"
              onClick={() => {
                fetchLeaves(filter);
              }}
            >
              Retry
            </button>
          </div>
        ) : leaveRequests.length === 0 ? (
          <div className="empty-state">
            <span className="material-icons">inbox</span>
            <p>No {filter !== "all" ? filter : ""} leave requests found</p>
            {filter !== "all" && (
              <button
                onClick={() => handleFilterChange("all")}
                className="view-all-btn"
              >
                View All Requests
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="leave-requests-grid">
              {currentItems.map((leave) => {
                const formattedDate = new Date(
                  leave.createdAt
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });

                const cardStatusClass = `leave-card status-${leave.status}`;

                return (
                  <div key={leave._id} className={cardStatusClass}>
                    <div className="card-header">
                      <div className="student-info">
                        <h3 className="student-name">
                          {leave.studentdetail?.studentname ||
                            "Unknown Student"}
                        </h3>
                        <p className="student-email">
                          {leave.studentdetail?.email || "No email provided"}
                        </p>
                      </div>
                      <div className="request-date">{formattedDate}</div>
                    </div>

                    <div className="card-body">
                      <div className="detail-row">
                        <span className="detail-label">Leave Type:</span>
                        <span className="detail-value">{leave.leaveType}</span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Module:</span>
                        <span className="detail-value">
                          {leave.modules?.[0]?.moduledetails?.Modulename ||
                            "N/A"}
                        </span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Level:</span>
                        <span className="detail-value">{leave.level}</span>
                      </div>

                      <div className="detail-row">
                        <span className="detail-label">Status:</span>
                        <span className={`status-badge status-${leave.status}`}>
                          {leave.status.charAt(0).toUpperCase() +
                            leave.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="card-actions">
                      <button
                        className="btn-details"
                        onClick={() => {
                          setSelectedLeave(leave);
                          setShowModal(true);
                        }}
                      >
                        <span className="material-icons">visibility</span>
                        View Details
                      </button>

                      {leave.status === "approve" ? (
                        <button className="btn-approved" disabled>
                          <span className="material-icons">check_circle</span>
                          Approved
                        </button>
                      ) : leave.status === "reject" ? (
                        <button className="btn-rejected" disabled>
                          <span className="material-icons">cancel</span>
                          Rejected
                        </button>
                      ) : (
                        <>
                          <button
                            className="btn-approve"
                            onClick={() => handleApprove(leave._id)}
                          >
                            <span className="material-icons">check_circle</span>
                            Approve
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => handleReject(leave._id)}
                          >
                            <span className="material-icons">cancel</span>
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`pagination-btn ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>

      {/* Logout confirmation */}
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

      {/* Modal (detailed view) */}
      {showModal && selectedLeave && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Leave Request Details</h2>
              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Student Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">
                    {selectedLeave.studentdetail?.studentname ||
                      "Unknown Student"}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">
                    {selectedLeave.studentdetail?.email || "No email provided"}
                  </span>
                </div>
              </div>

              <div className="modal-section">
                <h3>Leave Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Level:</span>
                  <span className="detail-value">{selectedLeave.level}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Leave Type:</span>
                  <span className="detail-value">
                    {selectedLeave.leaveType}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span
                    className={`status-badge status-${selectedLeave.status}`}
                  >
                    {selectedLeave.status.charAt(0).toUpperCase() +
                      selectedLeave.status.slice(1)}
                  </span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Reason:</span>
                  <span className="detail-value">{selectedLeave.reason}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Submitted On:</span>
                  <span className="detail-value">
                    {format(
                      new Date(selectedLeave.createdAt),
                      "MMMM dd, yyyy 'at' hh:mm a"
                    )}
                  </span>
                </div>
              </div>

              <div className="modal-section">
                <h3>Modules Details</h3>
                {selectedLeave.modules?.length > 0 ? (
                  selectedLeave.modules.map((mod, idx) => (
                    <div key={idx} className="module-card">
                      <div className="detail-row">
                        <span className="detail-label">Module:</span>
                        <span className="detail-value">
                          {mod.moduledetails?.Modulename || "N/A"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Week:</span>
                        <span className="detail-value">
                          {mod.week || "N/A"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Class Type:</span>
                        <span className="detail-value">
                          {mod.classtype || "N/A"}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Leave Day:</span>
                        <span className="detail-value">
                          {mod.leaveday || "N/A"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-data">No modules information provided</p>
                )}
              </div>

              <div className="modal-section">
                <h3>Attached Document</h3>
                {selectedLeave.image_data ? (
                  <div className="image-container">
                    <img
                      src={selectedLeave.image_data.secure_url}
                      alt="Attached Leave Document"
                      className="attached-image"
                    />
                    <a
                      href={selectedLeave.image_data.secure_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-full-links"
                    >
                      View full image
                    </a>
                  </div>
                ) : (
                  <p className="no-data">No document provided</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
