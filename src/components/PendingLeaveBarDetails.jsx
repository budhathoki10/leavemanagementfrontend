
import React, { useEffect, useState } from "react";
import "../CSS/PendingLeaveBarDetails.css";
import PendingLeaveBarViewDetails from "./PendingLeaveBarViewDetails";
import Cookies from "js-cookie";

const LeaveBarDetails = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [showDetailsId, setShowDetailsId] = useState(null);

  const fetchLeaves = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return console.error("Token not found");

      const res = await fetch(
        "https://leavesssssssssssssss.onrender.com/task/filterviewownleave?status=pending",
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
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
        setPendingLeaves(data.data);
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

  const selectedLeave = pendingLeaves.find((l) => l._id === showDetailsId);

  return (
    <>
      {pendingLeaves.length === 0 ? (
        <p className="no-pending">No more pending leave</p>
      ) : (
        pendingLeaves.map((leave) => (
          <div key={leave._id} className="pending-leave-bar-details">
            <div className="leave-bar-top">
              <div className="pending-view">
                <p className="pending-label">Pending</p>
                <p
                  className="view-details"
                  onClick={() => setShowDetailsId(leave._id)}
                >
                  Details
                </p>
              </div>
            </div>

            {leave.modules.map((mod) => (
              <div key={mod._id} className="leave-bar-bottom">
                <div className="details-label-info">
                  <div className="details-label">
                    <span className="material-symbols-outlined">view_module</span>
                    <p className="details-label">Module Name</p>
                  </div>
                  <p className="module">
                    {mod.moduledetails?.Modulename || mod.moduledetails}
                  </p>
                </div>

                <div className="details-label-info">
                  <div className="details-label">
                    <span className="material-symbols-outlined">calendar_today</span>
                    <p className="details-label">Week</p>
                  </div>
                  <p className="module">{mod.week}</p>
                </div>

                <div className="details-label-info">
                  <div className="details-label">
                    <span className="material-symbols-outlined">class</span>
                    <p className="details-label">Class type</p>
                  </div>
                  <p className="module">{mod.classtype}</p>
                </div>

                <div className="details-label-info">
                  <div className="details-label">
                    <span className="material-symbols-outlined">event_busy</span>
                    <p className="details-label">Leave Type</p>
                  </div>
                  <p className="module">{leave.leaveType}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {/* Render modal outside the map to prevent remounting */}
      {showDetailsId && selectedLeave && (
        <PendingLeaveBarViewDetails
          leave={selectedLeave}
          onClose={() => setShowDetailsId(null)}
        />
      )}
    </>
  );
};

export default LeaveBarDetails;
