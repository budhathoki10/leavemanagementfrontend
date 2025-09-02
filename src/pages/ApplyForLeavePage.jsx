import React, { useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaPlus,
  FaMinus,
  FaUpload,
  FaTimes,
} from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";
import "../CSS/ApplyForLeavePage.css";

const ApplyForLeave = () => {
  const [leaveType, setLeaveType] = useState("Medical Leave");
  const [moduleDetails, setModuleDetails] = useState([
    { moduleName: "", week: "", classType: "", date: "" },
  ]);
  const [reason, setReason] = useState("");
  const [files, setFiles] = useState([]);
  const [remainingLeave, setRemainingLeave] = useState(7);

  // Pie chart data
  const leavesTaken = 4;
  const totalLeaves = 24;
  const pieData = [
    { name: "Taken", value: leavesTaken },
    { name: "Remaining", value: totalLeaves - leavesTaken },
  ];
  const COLORS = ["#00571e", "#e0e0e0"];

  const handleModuleChange = (index, field, value) => {
    const newModules = [...moduleDetails];
    newModules[index][field] = value;
    setModuleDetails(newModules);
  };

  const handleAddModule = () => {
    setModuleDetails([
      ...moduleDetails,
      { moduleName: "", week: "", classType: "", date: "" },
    ]);
  };

  const handleRemoveModule = (index) => {
    const newModules = [...moduleDetails];
    newModules.splice(index, 1);
    setModuleDetails(newModules);
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="apply-content">
      <header className="top-bar">
        <h2>Apply for Leave</h2>
        <div className="top-icons">
          <div className="profile-section">
            <FaUserCircle className="profile-icon" />
            <div>
              <span className="profile-name">John Snow</span>
              <span className="profile-role">User</span>
            </div>
          </div>
        </div>
      </header>

      <div className="leaves-section">
        <h3>Leaves Taken This Semester</h3>
        <div className="pie-chart">
          <PieChart width={180} height={120}>
            <Pie
              data={pieData}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={70}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
          <div className="pie-center">
            <span className="leaves-count">{leavesTaken}</span>
            <span className="leaves-total">/{totalLeaves}</span>
          </div>
        </div>
      </div>

      <div className="leave-form">
        <h4>Leave Request</h4>

        <div className="form-group">
          <label>Leave Type</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="Medical Leave">Medical Leave</option>
            <option value="Personal Leave">Personal Leave</option>
            <option value="Emergency Leave">Emergency Leave</option>
          </select>
        </div>

        {moduleDetails.map((module, index) => (
          <div key={index} className="module-box">
            <div className="module-row-week">
              <input
                type="text"
                placeholder="Enter Module name to be missed."
                value={module.moduleName}
                onChange={(e) =>
                  handleModuleChange(index, "moduleName", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Week"
                value={module.week}
                onChange={(e) =>
                  handleModuleChange(index, "week", e.target.value)
                }
              />
              <select
                value={module.classType}
                onChange={(e) =>
                  handleModuleChange(index, "classType", e.target.value)
                }
              >
                <option value="">Class Type</option>
                <option value="Lecture">Lecture</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Lab">Lab</option>
              </select>
              <input
                type="date"
                value={module.date}
                onChange={(e) =>
                  handleModuleChange(index, "date", e.target.value)
                }
              />
              <button
                className="icon-btn"
                onClick={() => handleRemoveModule(index)}
              >
                <FaMinus />
              </button>
              {index === moduleDetails.length - 1 && (
                <button className="icon-btn" onClick={handleAddModule}>
                  <FaPlus />
                </button>
              )}
            </div>
            {index === 0 && (
              <div className="module-remaining">
                Module Remaining Leave: {remainingLeave}
              </div>
            )}
          </div>
        ))}

        <div className="form-group">
          <label>Reason</label>
          <textarea
            placeholder="Enter your reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Upload Documents (optional)</label>
          <div className="file-upload">
            <input
              type="file"
              multiple
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput" className="upload-btn">
              <FaUpload className="upload-icon" /> Upload File
            </label>
          </div>
          <div className="file-list">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                <span>{file.name}</span>
                <button
                  className="icon-btn"
                  onClick={() => handleRemoveFile(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-btn">Cancel</button>
          <button className="submit-btn">✔ Send Request</button>
        </div>
      </div>
    </div>
  );
};

export default ApplyForLeave;
