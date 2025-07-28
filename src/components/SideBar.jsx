import "../CSS/SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      <div className="leavo-logo">
        <img src="src\assets\leavo-logo.png" alt="leavo-logo" />
      </div>
      <ul>
        <li className="dashboard-sidebar">
          <span class="material-symbols-outlined">dashboard</span>Dashboard
        </li>
        <li className="apply-for-leave">
          <span class="material-symbols-outlined">post_add</span>Apply For Leave
        </li>
        <li className="calendar">
          <span class="material-symbols-outlined">calendar_month</span>Calendar
        </li>
        <li className="leave-history">
          <span class="material-symbols-outlined">history_2</span>Pending
          Request
        </li>
        <div className="gap-li">
          <li className="settings">
            <span class="material-symbols-outlined">settings</span>Settings
          </li>
          <li className="signout">
            <span class="material-symbols-outlined">exit_to_app</span>Signout
          </li>
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
