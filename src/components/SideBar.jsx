import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/SideBar.css";
import leavoLogo from "../assets/leavo-logo.png";
import { useState } from "react";
import SettingSideBar from "./SettingSideBar";
import LeaveHistoryBar from "./LeaveHistoryBar";
import Cookies from "js-cookie";

const SideBar = () => {
  const [showSettingMenu, setShowSettingMenu] = useState(false);
  const [showLeaveHisotryMenu, setShowLeaveHistoryMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });
    navigate("/login");
  };

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
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </NavLink>
        </li>

        <li className="apply-for-leave">
          <NavLink
            to="/applyforleave"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="material-symbols-outlined">post_add</span>
            Apply For Leave
          </NavLink>
        </li>

        <li
          className="leave-history"
          onClick={() => setShowLeaveHistoryMenu(!showLeaveHisotryMenu)}
        >
          <span className="material-symbols-outlined">history_2</span>
          Leave history{" "}
          <div className={`right-arrow ${showLeaveHisotryMenu ? "open" : ""}`}>
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </div>
          <div className="leave-history-toggle-bar">
            {showLeaveHisotryMenu && (
              <LeaveHistoryBar onClose={() => setShowLeaveHistoryMenu(false)} />
            )}
          </div>
        </li>

        <div className="gap-li">
          <li
            className="settings"
            onClick={() => setShowSettingMenu(!showSettingMenu)}
          >
            <span className="material-symbols-outlined">settings</span>
            Settings
          </li>

          {showSettingMenu && (
            <SettingSideBar onClose={() => setShowSettingMenu(false)} />
          )}

          <li
            className="signout"
            onClick={() => setShowLogoutConfirm(true)}
            style={{ cursor: "pointer" }}
          >
            <span className="material-symbols-outlined">exit_to_app</span>
            Signout
          </li>
        </div>
      </ul>

      {/* Custom Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-dialog">
            <p>Do you really want to sign out ?</p>
            <div className="logout-confirm-buttons">
              <button className="logout-yes" onClick={handleLogout}>
                Yes
              </button>
              <button
                className="logout-no"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
