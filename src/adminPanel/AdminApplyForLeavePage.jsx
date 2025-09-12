import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaPlus, FaMinus } from "react-icons/fa";
import userImage from "../assets/user.jpeg";

import "../CSS/ApplyForLeavePage.css";
const ApplyForLeave = () => {
  const [leaveType, setLeaveType] = useState("");
  const [moduleDetails, setModuleDetails] = useState([
    { moduleName: "", week: "", classType: "" },
  ]);
  const [reason, setReason] = useState("");
  const [uploadFiles, setUploadFiles] = useState([{ fileName: "" }]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");

  const handleModuleChange = (index, field, value) => {
    const newModuleDetails = [...moduleDetails];
    newModuleDetails[index][field] = value;
    setModuleDetails(newModuleDetails);
  };

  const addModuleDetail = () => {
    setModuleDetails([
      ...moduleDetails,
      { moduleName: "", week: "", classType: "" },
    ]);
  };

  const removeModuleDetail = (index) => {
    if (moduleDetails.length > 1) {
      const newModuleDetails = moduleDetails.filter((_, i) => i !== index);
      setModuleDetails(newModuleDetails);
    }
  };

  const handleFileChange = (index, e) => {
    if (e.target.files.length > 0) {
      const newUploadFiles = [...uploadFiles];
      newUploadFiles[index].fileName = e.target.files[0].name;
      setUploadFiles(newUploadFiles);
    }
  };

  const addUploadField = () => {
    setUploadFiles([...uploadFiles, { fileName: "" }]);
  };

  const removeUploadField = (index) => {
    if (uploadFiles.length > 1) {
      const newUploadFiles = uploadFiles.filter((_, i) => i !== index);
      setUploadFiles(newUploadFiles);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!leaveType) {
      setPopupMessage("Please select a Leave Type.");
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    const hasIncompleteModule = moduleDetails.some(
      (detail) => !detail.moduleName || !detail.week || !detail.classType
    );
    if (hasIncompleteModule) {
      setPopupMessage(
        "Please fill all Module Details (Module Name, Week, Class Type)."
      );
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    if (!reason.trim()) {
      setPopupMessage("Please enter a Reason.");
      setPopupType("error");
      setShowPopup(true);
      return;
    }

    // If all required fields are filled, show success popup
    setPopupMessage("Leave request submitted successfully!");
    setPopupType("success");
    setShowPopup(true);

    // Reset form after success (optional, can be removed if you want to keep data)
    setLeaveType("");
    setModuleDetails([{ moduleName: "", week: "", classType: "" }]);
    setReason("");
    setUploadFiles([{ fileName: "" }]);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3500); // 3.5 seconds
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="apply-leave-wrapper">
      {/* Top Bar */}
      <section className="dashboard-header">
        <p className="dashboard">Apply for leave</p>
        <div className="icons">
          <div className="notifications">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <div className="user-pfp">
            <img src={userImage} alt="user" />
          </div>
          <div className="user-text">
            <p className="username">John Snow</p>
            <p className="username-user">User</p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Leave Stats */}
      <div className="leave-stats-box">
        <div className="leave-stats-numbers">
          <span className="taken">4</span>/<span className="total">24</span>
        </div>
        <p className="leave-stats-text">Leaves Taken This Semester</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "16%" }}></div>
        </div>
      </div>

      {/* Leave Request Form */}
      <form className="leave-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Leave Request</h2>

        <div className="form-group">
          <label>Leave Type</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="full-width"
          >
            <option value="">Select your leave type</option>
            <option>Academic Leave</option>
            <option>Medical Leave</option>
            <option>Personal Leave</option>
            <option>Professional Leave</option>
 
          </select>
        </div>

        {moduleDetails.map((detail, index) => (
          <div className="form-group module-container" key={index}>
            <div className="form-row bordered">
              <div className="form-group">
                <label>Module Name</label>
                <select
                  value={detail.moduleName}
                  onChange={(e) =>
                    handleModuleChange(index, "moduleName", e.target.value)
                  }
                  className="third-width"
                >
                  <option value="">Select your module name</option>
                  <option>Computation Mathematics</option>
                  <option>Introduction to Object Oriented Programming</option>
                  <option>
                    Interactive 3D Application and Academic Skills
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label>Week</label>
                <select
                  value={detail.week}
                  onChange={(e) =>
                    handleModuleChange(index, "week", e.target.value)
                  }
                  className="third-width"
                >
                  <option value="">Select week</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((week) => (
                    <option key={week} value={week}>
                      {week}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Class Type</label>
                <select
                  value={detail.classType}
                  onChange={(e) =>
                    handleModuleChange(index, "classType", e.target.value)
                  }
                  className="third-width"
                >
                  <option value="">Select class type</option>
                  <option>Lecture</option>
                  <option>Tutorial</option>
                  <option>Workshop</option>
                </select>
              </div>
              <div className="button-group">
                {index === moduleDetails.length - 1 && (
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addModuleDetail}
                  >
                    <FaPlus />
                  </button>
                )}
                {moduleDetails.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeModuleDetail(index)}
                  >
                    <FaMinus />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="form-group">
          <label>Reason</label>
          <textarea
            placeholder="Enter your reason."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="full-width"
          />
        </div>

        {uploadFiles.map((file, index) => (
          <div className="form-group upload-container" key={index}>
            <label>
              Upload Documents <span className="optional">(Optional)</span>
            </label>
            <div className="file-upload bordered">
              <input
                type="file"
                id={`file-${index}`}
                onChange={(e) => handleFileChange(index, e)}
                hidden
              />
              <label htmlFor={`file-${index}`} className="upload-btn">
                Upload File
              </label>
              <span className="file-name">{file.fileName}</span>
              <div className="button-group">
                {index === uploadFiles.length - 1 && (
                  <button
                    type="button"
                    className="add-btn"
                    onClick={addUploadField}
                  >
                    <FaPlus />
                  </button>
                )}
                {uploadFiles.length > 1 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeUploadField(index)}
                  >
                    <FaMinus />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="form-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            ✓ Send Request
          </button>
        </div>
      </form>

      {showPopup && (
        <div className={`popup ${popupType}`}>
          <div className="popup-content">
            <p>{popupMessage}</p>
            <div className="timer-bar"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyForLeave;
