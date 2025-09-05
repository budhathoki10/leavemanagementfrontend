import "../CSS/SettingSideBar.css";

const SettingSideBar = ({ onClose }) => {
  return (
    <div className="setting-panel">
      
      <div className="settings-header">
        <h3>Settings</h3>
        <button className="close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <hr className="parting-line-setting-menu" />

      <ul className="settings-links">
        <li>
          <a href="/settings/profile" className="settings-sidebar-link">
            <p>My Profile</p>
          </a>
        </li>
        <li>
          <a href="#" className="settings-sidebar-link">
            <p>Notifications</p>
          </a>
        </li>
        <li>
          <a
            href="http://localhost:7500/changeprofile"
            className="settings-sidebar-link"
          >
            <p>Password and Security</p>
          </a>
        </li>
        <li>
          <a href="/settings/feedback" className="settings-sidebar-link">
            <p>Feedback and Support</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SettingSideBar;
