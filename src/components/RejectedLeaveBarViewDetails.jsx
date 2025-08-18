import "../CSS/RejectedLeaveBarViewDetails.css";

const RejectedLeaveBarViewDetails = ({ onClose }) => {
  return (
    <>
      <div className="rejected-expanded-view">
        <div className="leave-bar-top">
          <div className="rejected-view">
            <p className="rejected-label">Rejected</p>
            <div className="lbvb-close-btn">
              <span className="material-symbols-outlined" onClick={onClose}>
                close
              </span>
            </div>
          </div>
        </div>
        <div className="leave-bar-bottom">
          <div className="details-label-info">
            <div className="details-label">
              <span className="material-symbols-outlined">view_module</span>
              <p className="details-label">Module Name</p>
            </div>
            <p className="module">Computational Mathematics</p>
          </div>

          <div className="details-label-info">
            <div className="details-label">
              <span className="material-symbols-outlined">calendar_today</span>
              <p className="details-label">Week</p>
            </div>
            <p className="module">7</p>
          </div>

          <div className="details-label-info">
            <div className="details-label">
              <span className="material-symbols-outlined">view_module</span>
              <p className="details-label">Class type</p>
            </div>
            <p className="module">Lecture</p>
          </div>

          <div className="details-label-info">
            <div className="details-label">
              <span className="material-symbols-outlined">view_module</span>
              <p className="details-label">Leave Type</p>
            </div>
            <p className="module">Sick</p>
          </div>
          <p className="leaves-taken">5/24</p>
        </div>

        <div className="reason-box">
          <p className="reason-label">Reason</p>
          <p className="reason-brief">
            I would like to inform you that I will not be able to attend classes
            from July 21st to July 28th due to high fever along with persistent
            cough. Pictures of prescribed medicine and lab reports are attached
            below. Sorry for the inconvenience.
            {/* sssssssssssssssssssssssssssssssssssssssssssssss
            sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaa */}
          </p>
          <p className="posted-time">posted at 12:00 PM</p>
        </div>

        <div className="attached-document">
          <img src="#" alt="img_1"></img>
          <img src="#" alt="img_2"></img>
          <p className="document-count">2 files attached.</p>
        </div>
      </div>
    </>
  );
};

export default RejectedLeaveBarViewDetails;
