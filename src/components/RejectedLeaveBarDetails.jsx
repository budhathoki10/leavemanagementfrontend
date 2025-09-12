import React, { useEffect, useState } from "react";
import "../CSS/RejectedLeaveBarDetails.css";
import RejectedLeaveViewModal from "./RejectedLeaveBarViewDetails";
import Cookies from "js-cookie";

const RejectedLeaveDetails = () => {
  const [rejectedLeaves, setRejectedLeaves] = useState([]);
  const [activeLeaveId, setActiveLeaveId] = useState(null);

  const fetchLeaves = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return console.error("Token not found");

      const res = await fetch(
        "https://leave-management-backend-1-mp7s.onrender.com/api/task/filterviewownleave?status=reject",
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
        setRejectedLeaves(data.data);
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

  const selectedLeave = rejectedLeaves.find((l) => l._id === activeLeaveId);

  return (
    <>
      {rejectedLeaves.length === 0 ? (
        <p className="no-rejected-msg">No rejected leaves found</p>
      ) : (
        rejectedLeaves.map((leave) => (
          <div key={leave._id} className="rejected-leave-card">
            <div className="leave-card-header">
              <div className="leave-status-container">
                <p className="leave-status-label">Rejected</p>
                <p
                  className="leave-details-btn"
                  onClick={() => setActiveLeaveId(leave._id)}
                >
                  View Details
                </p>
              </div>
            </div>

            {leave.modules.map((mod) => (
              <div key={mod._id} className="leave-card-content">
                <div className="info-block">
                  <div className="info-label">
                    <span className="material-symbols-outlined">
                      view_module
                    </span>
                    <p className="info-title">Module Name</p>
                  </div>
                  <p className="info-value">
                    {mod.moduledetails?.Modulename || mod.moduledetails}
                  </p>
                </div>

                <div className="info-block">
                  <div className="info-label">
                    <span className="material-symbols-outlined">
                      calendar_today
                    </span>
                    <p className="info-title">Week</p>
                  </div>
                  <p className="info-value">{mod.week}</p>
                </div>

                <div className="info-block">
                  <div className="info-label">
                    <span className="material-symbols-outlined">class</span>
                    <p className="info-title">Class Type</p>
                  </div>
                  <p className="info-value">{mod.classtype}</p>
                </div>

                <div className="info-block">
                  <div className="info-label">
                    <span className="material-symbols-outlined">
                      event_busy
                    </span>
                    <p className="info-title">Leave Type</p>
                  </div>
                  <p className="info-value">{leave.leaveType}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {activeLeaveId && selectedLeave && (
        <RejectedLeaveViewModal
          leave={selectedLeave}
          onClose={() => setActiveLeaveId(null)}
        />
      )}
    </>
  );
};

export default RejectedLeaveDetails;
