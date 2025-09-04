import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/SideBar.css";
import leavoLogo from "../assets/leavo-logo.png";
import { useState } from "react";
import SettingSideBar from "./SettingSideBar";
import { Navigate } from "react-router-dom";
import LeaveHistoryBar from "./LeaveHistoryBar";

const SideBar = () => {
  const [showSettingMenu, setShowSettingMenu] = useState(false);
  const [showLeaveHisotryMenu, setShowLeaveHistoryMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <div
        className="leavo-logo"
        onClick={() => navigate("/dashboard")}
        style={{ cursor: "pointer" }}
      >
        <img src={leavoLogo} alt="leavo-logo" />
      </div>
      <ul className="sidebar-ul">
        <li className="dashboard-sidebar">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span class="material-symbols-outlined">dashboard</span>Dashboard
          </NavLink>
        </li>

        <li className="apply-for-leave">
          <NavLink
            to="/applyforleave"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span class="material-symbols-outlined">post_add</span>Apply For
            Leave
          </NavLink>
        </li>

        <li className="calendar">
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span class="material-symbols-outlined">calendar_month</span>
            Calendar
          </NavLink>
        </li>

        <li
          className="leave-history"
          onClick={() => setShowLeaveHistoryMenu(!showLeaveHisotryMenu)}
        >
          <span class="material-symbols-outlined">history_2</span>Leave history
        </li>
        {showLeaveHisotryMenu && (
          <LeaveHistoryBar onClose={() => setShowLeaveHistoryMenu(false)} />
        )}

        <div className="gap-li">
          <li
            className="settings"
            onClick={() => setShowSettingMenu(!showSettingMenu)}
          >
            <span class="material-symbols-outlined">settings</span>Settings
          </li>
          {showSettingMenu && (
            <SettingSideBar onClose={() => setShowSettingMenu(false)} />
          )}

          <li className="signout">
            <span class="material-symbols-outlined">exit_to_app</span>Signout
          </li>
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
