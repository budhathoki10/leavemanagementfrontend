import "../CSS/RejectedLeave.css";
import RejectedLeaveBarDetails from "./RejectedLeaveBarDetails";
const RejectedLeave = () => {
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

      <section className="rejected-request-section">
        <p className="rejected-requests-header">Rejected Requests</p>
        <RejectedLeaveBarDetails />
      </section>
    </div>
  );
};

export default RejectedLeave;
