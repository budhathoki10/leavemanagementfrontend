import React, { useState } from "react";
import "../CSS/Notification.css";

const Notification = () => {
  const [emailNoti, setEmailNoti] = useState(true);
  const [smsNoti, setSmsNoti] = useState(false);
  const [appNoti, setAppNoti] = useState(true);

  return (
    <div className="notification-container">
      <h2 className="notification-title">Notification Settings</h2>
      <p className="notification-subtitle">
        Manage how you receive updates about your leaves.
      </p>

      
      <div className="notification-card">
        <div className="notification-item">
          <div>
            <span className="notification-label">Turn on Notifications</span>
            <p className="notification-desc">
              Change your Notification Status to ON or OFF. 
            </p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={emailNoti}
              onChange={() => setEmailNoti(!emailNoti)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* SMS Notification Box */}
      <div className="notification-card">
        <div className="notification-item">
          <div>
            <span className="notification-label">Email Notifications</span>
            <p className="notification-desc">
              Get updates directly to your email inbox about your leave status.
            </p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={smsNoti}
              onChange={() => setSmsNoti(!smsNoti)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* App Notification Box */}
      <div className="notification-card">
        <div className="notification-item">
          <div>
            <span className="notification-label">Approved or Rejected Notifications</span>
            <p className="notification-desc">
             Get Notifications of your Request status to see if it is approved or rejected.
            </p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={appNoti}
              onChange={() => setAppNoti(!appNoti)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Notification;
