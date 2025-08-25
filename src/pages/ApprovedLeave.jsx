import "../CSS/ApprovedLeave.css";
import ApprovedLeaveBarDetails from "../components/ApprovedLeaveBarDetails";
const ApprovedLeave = () => {
  return (
    <div>
      <section className="leave-history-approved-leave-header">
        <p className="lh-al">Leave History</p>
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

      <section className="approved-request-section">
        <p className="approved-requests-header">Approved Leaves</p>
        <div className="approved-leave-bar">
          <ApprovedLeaveBarDetails />
          <ApprovedLeaveBarDetails
            moduleName="Software Engineering"
            week={6}
            classType="Lab"
            leaveType="Personal"
            leavesTaken="8/24"
            reason="Family function"
            postedTime="2:30 PM"
            documents={[]}
          />
        </div>
      </section>
    </div>
  );
};

export default ApprovedLeave;
