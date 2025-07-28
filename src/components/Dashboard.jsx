import "../CSS/Dashboard.css";
import "../components/LeaveCards";
import LeaveCards from "../components/LeaveCards";
import LeaveTable from "./LeaveTable";
export default function Dashboard() {
  return (
    <div className="dashboard-content">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <section className="dashboard-header">
        <p className="dashboard">Dashboard</p>
        <div className="icons">
          <div className="notifications">
            <span class="material-symbols-outlined">notifications</span>
          </div>
          <hr className="vr-line"></hr>
          <div className="user">
            <span class="material-symbols-outlined">account_circle</span>{" "}
          </div>
          <div className="user-text">
            <p className="username">John Snow</p>
            <p className="username-user">User</p>
          </div>
        </div>
      </section>
      <hr className="parting-line"></hr>
      <section className="today-section">
        <div className="today-date">
          <p className="today">Today</p>
          <p className="date">22 July, 2025</p>
        </div>
        <div className="today-btn">
          <button className="apply-for-leave-btn">Apply for leave</button>
          <button className="view-calendar-btn">View Calendar</button>
        </div>
      </section>
      <LeaveCards />
      <LeaveTable />
    </div>
  );
}
