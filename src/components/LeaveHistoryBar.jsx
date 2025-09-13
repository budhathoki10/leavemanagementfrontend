import "../CSS/LeaveHistoryBar.css";
import { NavLink } from "react-router-dom";

const LeaveHistoryBar = () => {
  return (
    <div className="leave-history-panel">
      <ul className="leave-history-links">
        <li className="leave-history-options">
          <NavLink
            to="/leavehistory/approvedleave"
            className={({ isActive }) =>
              isActive ? "leave-history-link active" : "leave-history-link"
            }
          >
            <span className="material-symbols-outlined">approval</span>
            Approved Leave
          </NavLink>
        </li>

        <li className="leave-history-options">
          <NavLink
            to="/leavehistory/pendingleave"
            className={({ isActive }) =>
              isActive ? "leave-history-link active" : "leave-history-link"
            }
          >
            <span className="material-symbols-outlined">pending</span>
            Pending Leave
          </NavLink>
        </li>

        <li className="leave-history-options">
          <NavLink
            to="/leavehistory/rejectedleave"
            className={({ isActive }) =>
              isActive ? "leave-history-link active" : "leave-history-link"
            }
          >
            <span className="material-symbols-outlined">block</span>
            Rejected Leave
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LeaveHistoryBar;
