import "../CSS/RejectedLeave.css";
import RejectedLeaveBarDetails from "../components/RejectedLeaveBarDetails";
const RejectedLeave = () => {
  return (
    <div>
      <section className="leave-history-rejected-leave-header">
        <p className="lh-pl">Leave History</p>
        <div className="icons">
          <div className="notifications">
            <span class="material-symbols-outlined">notifications</span>
          </div>
          <div className="user">
            <span class="material-symbols-outlined">account_circle</span>
          </div>
        </div>
      </section>
      <hr className="parting-line"></hr>

      <section className="rejected-request-section">
        <p className="rejected-requests-header">Rejected Requests</p>
        <div className="rejected-leave-bar">
          {" "}
          <RejectedLeaveBarDetails />
        </div>
      </section>
    </div>
  );
};

export default RejectedLeave;
