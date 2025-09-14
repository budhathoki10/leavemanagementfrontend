import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";
import "../CSS/AdminDashboard.css";

export default function AdminDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_BASE = "https://leave-management-backend-1-mp7s.onrender.com/api";

  // Fetch leave requests with status filter
  const fetchLeaves = async (statusFilter = "all") => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      // Build query parameters
      const params = {};
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      const response = await axios.get(`${API_BASE}/task/viewleave`, {
        headers: { Authorization: `Bearer ${token}` },
        params: params
      });
      
      if (response.data?.success && Array.isArray(response.data.data)) {
        setLeaveRequests(response.data.data);
      } else {
        setLeaveRequests([]);
      }
    } catch (err) {
      setError("Failed to fetch leave requests.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves(filter);
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

      // Refresh the data after update
      fetchLeaves(filter);
    } catch (error) {
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

      // Refresh the data after update
      fetchLeaves(filter);
    } catch (error) {
      setError(
        `Failed to reject leave: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleFilterChange = (newFilter) => {
    setLoading(true);
    setFilter(newFilter);
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Leave Management Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">
              <span className="material-icons">account_circle</span>
            </div>
            <div className="user-details">
              <p className="user-name">John Snow</p>
              <p className="user-role">Administrator</p>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
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
            <button onClick={() => fetchLeaves(filter)} className="retry-btn">
              Retry
            </button>
          </div>
        ) : leaveRequests.length === 0 ? (
          <div className="empty-state">
            <span className="material-icons">inbox</span>
            <p>No {filter !== "all" ? filter : ""} leave requests found</p>
            {filter !== "all" && (
              <button onClick={() => handleFilterChange("all")} className="view-all-btn">
                View All Requests
              </button>
            )}
          </div>
        ) : (
          <div className="leave-requests-grid">
            {leaveRequests.map((leave) => {
              const formattedDate = new Date(leave.createdAt).toLocaleDateString(
                "en-US",
                { month: "long", day: "numeric", year: "numeric" }
              );

              return (
                <div key={leave._id} className="leave-card">
                  <div className="card-header">
                    <div className="student-info">
                      <h3 className="student-name">
                        {leave.studentdetail?.studentname || "Unknown Student"}
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
                      <span className="detail-label">Reason:</span>
                      <span className="detail-value">{leave.reason}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Level:</span>
                      <span className="detail-value">{leave.level}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span className={`status-badge status-${leave.status}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
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
        )}
      </div>

      {/* Modal for Detailed View */}
      {showModal && selectedLeave && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Leave Request Details</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Student Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">
                    {selectedLeave.studentdetail?.studentname || "Unknown Student"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">
                    {selectedLeave.studentdetail?.email || "No email provided"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Student ID:</span>
                  <span className="detail-value">
                    {selectedLeave.studentdetail?._id || "N/A"}
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
                  <span className="detail-value">{selectedLeave.leaveType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge status-${selectedLeave.status}`}>
                    {selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Reason:</span>
                  <span className="detail-value">{selectedLeave.reason}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Submitted On:</span>
                  <span className="detail-value">
                    {format(new Date(selectedLeave.createdAt), "MMMM dd, yyyy 'at' hh:mm a")}
                  </span>
                </div>
              </div>

              <div className="modal-section">
                <h3>Affected Modules</h3>
                {selectedLeave.modules?.length > 0 ? (
                  selectedLeave.modules.map((mod, idx) => (
                    <div key={idx} className="module-card">
                      <div className="detail-row">
                        <span className="detail-label">Module:</span>
                        <span className="detail-value">{mod.moduleName || "N/A"}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Week:</span>
                        <span className="detail-value">{mod.week || "N/A"}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Class Type:</span>
                        <span className="detail-value">{mod.classType || "N/A"}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Leave Day(s):</span>
                        <span className="detail-value">{mod.leaveDays || "N/A"}</span>
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
                      className="view-full-link"
                    >
                      View full image
                    </a>
                  </div>
                ) : (
                  <p className="no-data">No document provided</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}