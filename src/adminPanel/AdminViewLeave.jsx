import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/AdminViewLeave.css";

export default function AdminViewLeave() {
  const navigate = useNavigate();

  const initialLeaveRequests = [
    {
      id: 1,
      studentName: "Sisham Maharjan",
      studentId: "STU1001",
      moduleId: "CS101",
      reason: "Medical Leave - Fever",
      duration: "3 days",
      date: "2025-09-10",
      status: null,
    },
    {
      id: 2,
      studentName: "Saksham Rajkarnikar",
      studentId: "STU1002",
      moduleId: "ENG202",
      reason: "Personal Leave - Family Event",
      duration: "2 days",
      date: "2025-09-09",
      status: null,
    },
    {
      id: 3,
      studentName: "Budathoki",
      studentId: "STU1003",
      moduleId: "AI303",
      reason: "Medical Leave - Injury",
      duration: "5 days",
      date: "2025-09-08",
      status: null,
    },
    {
      id: 4,
      studentName: "Gurung",
      studentId: "STU1004",
      moduleId: "BUS204",
      reason: "Emergency Leave - Travel",
      duration: "4 days",
      date: "2025-09-07",
      status: null,
    },
    {
      id: 5,
      studentName: "Judwa",
      studentId: "STU1005",
      moduleId: "HIS110",
      reason: "Compassionate Leave",
      duration: "7 days",
      date: "2025-09-06",
      status: null,
    },
  ];

  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);

  const handleApprove = (id) => {
    setLeaveRequests((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: "approved" } : leave
      )
    );
  };

  const handleReject = (id) => {
    setLeaveRequests((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status: "rejected" } : leave
      )
    );
  };

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
      <p style={{ textAlign: "center", marginBottom: "20px", color: "gray" }}>
        (Dummy data for now — will integrate API later)
      </p>

      <div className="leave-list">
        {leaveRequests.map((leave) => (
          <div key={leave.id} className="leave-card">
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
                    onClick={() => handleApprove(leave.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(leave.id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
