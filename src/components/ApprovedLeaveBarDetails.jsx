import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ApprovedLeaveBarViewDetails from "./ApprovedLeaveBarViewDetails";
import "../CSS/ApprovedLeaveBarDetails.css";

const ApprovedLeaveBarDetails = () => {
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [activeLeaveId, setActiveLeaveId] = useState(null);

  const fetchLeaves = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return console.error("Token not found");

      const res = await fetch(
        "https://leave-management-backend-kkk.onrender.com/api/task/filterviewownleave?status=approve",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${text}`);
      }

      const data = await res.json();
      if (data.success && data.data) {
        setApprovedLeaves(data.data);
      }
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
    const interval = setInterval(fetchLeaves, 5000);
    return () => clearInterval(interval);
  }, []);

  const selectedLeave = approvedLeaves.find((l) => l._id === activeLeaveId);

  return (
    <>
      {approvedLeaves.length === 0 ? (
        <p className="no-approved-msg">No approved leaves found</p>
      ) : (
        approvedLeaves.map((leave) => (
          <div key={leave._id} className="approved-leave-card">
            <div className="approved-card-header">
              <div className="approved-status-container">
                <p className="approved-status-label">Approved</p>
                <p
                  className="approved-details-btn"
                  onClick={() => setActiveLeaveId(leave._id)}
                >
                  View Details
                </p>
              </div>
            </div>

            {leave.modules.map((mod) => (
              <div key={mod._id} className="approved-card-content">
                <div className="approved-info-block">
                  <div className="approved-info-label">
                    <span className="material-symbols-outlined">view_module</span>
                    <p className="approved-info-title">Module Name</p>
                  </div>
                  <p className="approved-info-value">
                    {mod.moduledetails?.Modulename || mod.moduledetails}
                  </p>
                </div>

                <div className="approved-info-block">
                  <div className="approved-info-label">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <p className="approved-info-title">Week</p>
                  </div>
                  <p className="approved-info-value">{mod.week}</p>
                </div>

                <div className="approved-info-block">
                  <div className="approved-info-label">
                    <span className="material-symbols-outlined">class</span>
                    <p className="approved-info-title">Class Type</p>
                  </div>
                  <p className="approved-info-value">{mod.classtype}</p>
                </div>

                <div className="approved-info-block">
                  <div className="approved-info-label">
                    <span className="material-symbols-outlined">event_busy</span>
                    <p className="approved-info-title">Leave Type</p>
                  </div>
                  <p className="approved-info-value">{leave.leaveType}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {activeLeaveId && selectedLeave && (
        <ApprovedLeaveBarViewDetails
          leave={selectedLeave}
          onClose={() => setActiveLeaveId(null)}
        />
      )}
    </>
  );
};

export default ApprovedLeaveBarDetails;
