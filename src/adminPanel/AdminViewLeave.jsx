import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { format } from "date-fns";
import "../CSS/AdminViewLeave.css";

export default function AdminViewLeave() {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "https://leave-management-backend-final.onrender.com/api";

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${API_BASE}/task/viewleave`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response (Fetch Leaves):", response.data);
        if (response.data?.success) {
          if (Array.isArray(response.data.data)) {
            setLeaveRequests(response.data.data);
          } else if (
            response.data.data?.Array &&
            Array.isArray(response.data.data.Array)
          ) {
            setLeaveRequests(response.data.data.Array);
          } else if (
            response.data.data === null ||
            response.data.data === undefined
          ) {
            setLeaveRequests([]);
            console.warn("No data returned from API:", response.data);
          } else {
            setLeaveRequests([]);
            console.warn("Unexpected data structure:", response.data);
          }
        } else {
          setLeaveRequests([]);
          console.warn("API success is false or undefined:", response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching leaves:",
          error.response?.data || error.message
        );
        setError(
          "Failed to fetch leave requests. This may be due to a CORS issue or server error. Please check your connection or contact support."
        );
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [navigate]);

  const handleApprove = async (id) => {
    try {
      console.log("handleApprove called with ID:", id); // Log the initial ID
      if (!id || typeof id !== "string") {
        throw new Error(`Invalid or missing leave ID: ${id}`);
      }
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token available");
      }
      console.log("Token:", token.substring(0, 10) + "..."); // Log partial token for verification
      const requestConfig = {
        url: `${API_BASE}/task/updateleave/${id}`,
        method: "put",
        data: { status: "approve" },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      console.log("Request Config:", requestConfig); // Log the full request config
      const response = await axios(requestConfig);
      console.log("Approve Response:", response.data);
      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status: "approve" } : leave
        )
      );
    } catch (error) {
      console.error(
        "Error approving leave:",
        error.response?.data || error.message,
        "Response Status:",
        error.response?.status,
        "Response Headers:",
        error.response?.headers
      );
      setError(
        `Failed to approve leave: ${
          error.response?.data?.message || error.message
        } (Status: ${error.response?.status || "N/A"})`
      );
    }
  };

  const handleReject = async (id) => {
    try {
      console.log("handleReject called with ID:", id); // Log the initial ID
      if (!id || typeof id !== "string") {
        throw new Error(`Invalid or missing leave ID: ${id}`);
      }
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token available");
      }
      console.log("Token:", token.substring(0, 10) + "..."); // Log partial token for verification
      const requestConfig = {
        url: `${API_BASE}/task/updateleave/${id}`,
        method: "put",
        data: { status: "reject" },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      console.log("Request Config:", requestConfig); // Log the full request config
      const response = await axios(requestConfig);
      console.log("Reject Response:", response.data);
      setLeaveRequests((prev) =>
        prev.map((leave) =>
          leave._id === id ? { ...leave, status: "reject" } : leave
        )
      );
    } catch (error) {
      console.error(
        "Error rejecting leave:",
        error.response?.data || error.message,
        "Response Status:",
        error.response?.status,
        "Response Headers:",
        error.response?.headers
      );
      setError(
        `Failed to reject leave: ${
          error.response?.data?.message || error.message
        } (Status: ${error.response?.status || "N/A"})`
      );
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          className="spinner"
          style={{
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #44bb42ff",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
            margin: "20px auto",
          }}
        ></div>
        <p>Loading leave requests...</p>
      </div>
    );
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

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="leave-list">
        {leaveRequests.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            No leave requests found
          </p>
        ) : (
          leaveRequests.map((leave) => (
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
                {leave.image !== "No image provided" && leave.image_data && (
                  <div className="leave-image">
                    <h3>Attached Image</h3>
                    {leave.image_data != null ? (
                      <p>{leave.image_data.secure_url}</p>
                    ) : (
                      <p>{"No image provided"}</p>
                    )}
                  </div>
                )}
                {leave.modules?.map((mod) => (
                  <div key={mod._id}>
                    <p>
                      <strong>Module ID:</strong>{" "}
                      {mod.moduledetails || "Unknown Module"}
                    </p>
                    <p>
                      <strong>Week:</strong> {mod.week || "N/A"}
                    </p>
                    <p>
                      <strong>Class Type:</strong> {mod.classtype || "N/A"}
                    </p>
                    <p>
                      <strong>Leave Days:</strong> {mod.leaveday || "N/A"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="leave-actions">
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
          ))
        )}
      </div>
    </div>
  );
}
