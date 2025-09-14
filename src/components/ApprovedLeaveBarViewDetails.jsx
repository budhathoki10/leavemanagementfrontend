import React from "react";
import "../CSS/ApprovedLeaveBarViewDetails.css";

const ApprovedLeaveBarViewDetails = ({ leave, onClose }) => {
  if (!leave) return null;

  const formattedDate = new Date(leave.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="approved-modal-backdrop">
      <div className="approved-modal-card">
        <button className="approved-modal-close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Leave Details</h2>

        <div className="approved-modal-leave-info">
          <p>
            <strong>Level:</strong> 5
          </p>
          <p>
            <strong>Leave Type:</strong> {leave.leaveType}
          </p>
          <p>
            <strong>Status:</strong> {leave.status}
          </p>
          <p>
            <strong>Created At:</strong> {formattedDate}
          </p>
          <p>
            <strong>Reason:</strong> {leave.reason}
          </p>
        </div>

        <div className="approved-modal-leave-modules">
          <h3>Modules</h3>
          {leave.modules.map((mod) => (
            <div key={mod._id} className="approved-modal-module-item">
              <p>
                <strong>Module:</strong>{" "}
                {mod.moduledetails?.Modulename || mod.moduledetails}
              </p>
              <p>
                <strong>Week:</strong> {mod.week}
              </p>
              <p>
                <strong>Class Type:</strong> {mod.classtype}
              </p>
              <p>
                <strong>Leave Day:</strong> {mod.leaveday}
              </p>
            </div>
          ))}
        </div>

        <div className="approved-modal-leave-image">
          <h3>Attached Image</h3>
          {leave.image_data != null ? (
            <>
              <img src={leave.image_data.secure_url} />
              <a
                href={leave.image_data.secure_url}
                target="_blank"
                rel="noopener noreferrer"
                className="view-full-link"
              >
                View full image
              </a>
            </>
          ) : (
            <p>{"No image provided"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovedLeaveBarViewDetails;
