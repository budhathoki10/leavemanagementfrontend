import "../CSS/PendingLeave.css";
import PendingLeaveBarDetails from "./PendingLeaveBarDetails";
const PendingLeave = () => {
  return (
    <div>
      <section className="leave-history-header">
        <p className="lh-pl">Leave History</p>
        <div className="icons">
          <div className="notifications">
            <span class="material-symbols-outlined">notifications</span>
          </div>
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

      <section className="pending-request-section">
        <p className="pending-requests-header">Pending-Requests</p>
        <PendingLeaveBarDetails />
      </section>
    </div>
  );
};

export default PendingLeave;
