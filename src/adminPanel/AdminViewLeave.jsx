// src/adminPanel/AdminViewLeave.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/AdminViewLeave.css";

export default function AdminViewLeave() {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leave requests from API
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming token is stored in localStorage
        const response = await axios.get(
          "https://leave-management-backend-1-mp7s.onrender.com/api/task/viewleave?level=6",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setLeaveRequests(response.data); // adapt this based on actual API response
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const handleApprove = async (id) => {
    try {
      // Call API if approve endpoint exists (replace with correct endpoint)
      // await axios.post(`/api/task/approve/${id}`, {}, { headers });
      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status: "approved" } : leave
        )
      );
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      // Call API if reject endpoint exists (replace with correct endpoint)
      // await axios.post(`/api/task/reject/${id}`, {}, { headers });
      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status: "rejected" } : leave
        )
      );
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading leave requests...</p>;
  }

  return (
    <div className="admin-view-container">
      <button
        className="back-btn"
        onClick={() => navigate("/adminDashboard")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#44bb42ff",
          color: "#fff",
          fontWeight: 500,
        }}
      >
        Back
      </button>

      <p className="admin-view-header">All Leave Requests</p>

      <div className="leave-list">
        {leaveRequests.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            No leave requests found
          </p>
        ) : (
          leaveRequests.map((leave) => (
            <div key={leave._id} className="leave-card">
              <div className="leave-header">
                <span className="leave-user">{leave.studentName}</span>
                <span className="leave-date">{leave.date}</span>
              </div>

              <div className="leave-details">
                <p>
                  <strong>Student ID:</strong> {leave.studentId}
                </p>
                <p>
                  <strong>Module ID:</strong> {leave.moduleId}
                </p>
                <p>
                  <strong>Reason:</strong> {leave.reason}
                </p>
                <p>
                  <strong>Duration:</strong> {leave.duration}
                </p>
              </div>

              <div className="leave-actions">
                {leave.status === "approved" ? (
                  <button className="approve-btn" disabled>
                    Approved
                  </button>
                ) : leave.status === "rejected" ? (
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
          ))
        )}
      </div>
    </div>
  );
}
