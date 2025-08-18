import React, { useState } from "react";
import "../CSS/PendingLeaveBarDetails.css";
import PendingLeaveBarViewDetails from "./PendingLeaveBarViewDetails";

const LeaveBarDetails = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {!showDetails ? (
        <div className="pending-leave-bar-details">
          <div className="leave-bar-top">
            <div className="pending-view">
              <p className="pending-label">Pending</p>
              <p
                className="view-details"
                onClick={() => setShowDetails(true)}
              >
                Details
              </p>
            </div>
          </div>

          <div className="leave-bar-bottom">
            <div className="details-label-info">
              <div className="details-label">
                <span className="material-symbols-outlined">view_module</span>
                <p className="details-label">Module Name</p>
              </div>
              <p className="module">Computational Mathematics</p>
            </div>

            <div className="details-label-info">
              <div className="details-label">
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
                <p className="details-label">Week</p>
              </div>
              <p className="module">7</p>
            </div>

            <div className="details-label-info">
              <div className="details-label">
                <span className="material-symbols-outlined">view_module</span>
                <p className="details-label">Class type</p>
              </div>
              <p className="module">Lecture</p>
            </div>

            <div className="details-label-info">
              <div className="details-label">
                <span className="material-symbols-outlined">view_module</span>
                <p className="details-label">Leave Type</p>
              </div>
              <p className="module">Sick</p>
            </div>
            <p className="leaves-taken">5/24</p>
          </div>
        </div>
      ) : (
        <PendingLeaveBarViewDetails onClose={() => setShowDetails(false)} />
      )}
    </>
  );
};

export default LeaveBarDetails;
