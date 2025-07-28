import "../CSS/LeaveCards.css";
export default function LeaveCards() {
  return (
    <section className="leave-status-container">
      <div className="leave-status total-leave">
        <div className="total-leaves">
          <span class="material-symbols-outlined">list</span>
          <div className="total-leave-info">
            <p className="total-leaves-txt">Total leaves</p>
            <p className="total-leaves-number">5</p>
          </div>
        </div>
      </div>
      <div className="leave-status approved-leave">
        <div className="approved-leaves">
          <span class="material-symbols-outlined">approval</span>{" "}
          <div className="approved-leave-info">
            <p className="approved-leaves-txt">Approved leaves</p>
            <p className="approved-leaves-number">5</p>
          </div>
        </div>
      </div>
      <div className="leave-status pending-leave">
        <div className="pending-leaves">
          <span class="material-symbols-outlined">alarm</span>{" "}
          <div className="pending-leave-info">
            <p className="pending-leaves-txt">Pending leaves</p>
            <p className="pending-leaves-number">5</p>
          </div>
        </div>
      </div>
      <div className="leave-status rejected-leave">
        <div className="rejected-leaves">
          <span class="material-symbols-outlined">block</span>{" "}
          <div className="rejected-leave-info">
            <p className="rejected-leaves-txt">Rejected leaves</p>
            <p className="rejected-leaves-number">5</p>
          </div>
        </div>
      </div>
    </section>
  );
}
