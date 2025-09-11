import "../CSS/SettingSideBar.css";
import { NavLink } from "react-router-dom";

const SettingSideBar = ({ onClose }) => {
  return (
    <div className="setting-panel">
      <div className="settings-header">
        <h3>Settings</h3>
        <button className="close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <hr className="parting-line-setting-menu"></hr>
      <ul className="settings-links">
        <li>
          <NavLink to="/settings/profile" className="settings-sidebar-link">
            <p>My Profile</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings/notification" className="settings-sidebar-link">
            <p>Notifications</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="#" className="settings-sidebar-link">
            <p>Password and Security</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings/feedback" className="settings-sidebar-link">
            <p>Feedback and Support</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SettingSideBar;
