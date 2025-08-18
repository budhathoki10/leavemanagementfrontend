import React from "react";
import "../CSS/LeaveHistoryBar.css";
import { NavLink } from "react-router-dom";
const LeaveHistoryBar = ({ onClose }) => {
  return (
    <div className="leave-history-panel">
      <ul className="leave-history-links">
        <div className="leave-history-options">
          <li>
            <NavLink to="/leavehistory/approvedleave">
              <span class="material-symbols-outlined">approval</span>Approved
              Leave
            </NavLink>
          </li>
        </div>

        <div className="leave-history-options">
          <li>
            <NavLink to="/leavehistory/pendingleave">
              <span class="material-symbols-outlined">pending</span>Pending
              Leave
            </NavLink>
          </li>
        </div>

        <div className="leave-history-options">
          <li>
            <NavLink to="/leavehistory/rejectedleave">
              <span class="material-symbols-outlined">block</span>Rejected Leave
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default LeaveHistoryBar;
