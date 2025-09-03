import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import userImage from "../assets/user.jpeg";

import "../CSS/ApplyForLeavePage.css";

const ApplyForLeave = () => {
  const [leaveType, setLeaveType] = useState("");
  const [moduleDetails, setModuleDetails] = useState([
    { moduleName: "", week: "", classType: "" },
  ]);
  const [reason, setReason] = useState("");
  const [pictures, setPictures] = useState([]);

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
      { moduleName: "", week: "", classType: "" },
    ]);
  };

  const handleRemoveModule = (index) => {
    const newModules = [...moduleDetails];
    newModules.splice(index, 1);
    setModuleDetails(newModules);
  };

  const handlePictureChange = (e) => {
    setPictures([...pictures, ...Array.from(e.target.files)]);
  };

  const handleRemovePicture = (index) => {
    const newPics = [...pictures];
    newPics.splice(index, 1);
    setPictures(newPics);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("studentToken");

      if (!token) {
        alert(" No student token found. Please login first.");
        return;
      }

      const payload = {
        level: 6,
        leaveType: leaveType.toLowerCase(),
        reason: reason,
        leaves: moduleDetails.map((m) => ({
          moduledetails: m.moduleName, // replace with ID mapping
          week: parseInt(m.week),
          classtype: m.classType.toLowerCase(),
        })),
      };

      const response = await axios.post(
        "https://leave-management-backend-8qav.onrender.com/api/task/create",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(" Leave request submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error(" Error submitting leave:", error.response || error);
      alert("Failed to submit leave request.");
    }
  };

  return (
    <div className="apply-content">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      {/* Top Header */}
      <section className="dashboard-header">
        <p className="dashboard">Apply for Leave</p>
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

      {/* Leave Stats */}
      <div className="leaves-section">
        <h3>Leaves Taken This Semester</h3>
        <div className="pie-chart">
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
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

      {/* Leave Request Form */}
      <div className="leave-form">
        <h4>Leave Request</h4>

        {/* Leave Type */}
        <div className="form-group">
          <label>Leave Type</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="">Select your leave type</option>
            <option value="Medical">Medical Leave</option>
            <option value="Personal">Personal Leave</option>
            <option value="Emergency">Emergency Leave</option>
          </select>
        </div>

        {/* Module Info */}
        {moduleDetails.map((module, index) => (
          <div key={index} className="module-box">
            <div className="form-row">
              <div className="form-group">
                <label>Module Name</label>
                <select
                  value={module.moduleName}
                  onChange={(e) =>
                    handleModuleChange(index, "moduleName", e.target.value)
                  }
                >
                  <option value="">Enter Module name to be missed.</option>
                  {/* ⚠️ In real case, use IDs from backend instead of names */}
                  <option value="6892fc951b20a07e48284c19">
                    Computational Mathematics
                  </option>
                  <option value="6892fc5e1b20a07e48284c17">Physics</option>
                  <option value="6892fc9b1b20a07e48284c21">Chemistry</option>
                </select>
              </div>

              <div className="form-group small">
                <label>Week</label>
                <input
                  type="number"
                  placeholder="Eg. 6"
                  value={module.week}
                  onChange={(e) =>
                    handleModuleChange(index, "week", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Class Type</label>
                <select
                  value={module.classType}
                  onChange={(e) =>
                    handleModuleChange(index, "classType", e.target.value)
                  }
                >
                  <option value="">Select class type</option>
                  <option value="Lecture">Lecture</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Lab">Lab</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>

              {/* + - inside module box */}
              <div className="inline-actions">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={handleAddModule}
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
                {moduleDetails.length > 1 && (
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleRemoveModule(index)}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                )}
              </div>
            </div>

            <p className="module-extra">Module Remaining Leave: 7</p>
          </div>
        ))}

        {/* Reason */}
        <div className="form-group">
          <label>Reason</label>
          <textarea
            placeholder="Enter your reason."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* Picture Upload (optional, but not sent for <8 days) */}
        <div className="form-group">
          <label>Upload Pictures (Optional)</label>

          <div className="picture-preview-list">
            {pictures.map((pic, index) => (
              <div key={index} className="picture-box">
                <img
                  src={URL.createObjectURL(pic)}
                  alt="uploaded"
                  className="preview-img"
                />
                <div className="inline-actions">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => handleRemovePicture(index)}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="upload-btn"
            onClick={() => document.getElementById("pictureInput").click()}
          >
            <span className="material-symbols-outlined">add_a_photo</span>{" "}
            Upload Pictures
          </button>

          <input
            type="file"
            accept="image/*"
            multiple
            id="pictureInput"
            onChange={handlePictureChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button className="cancel-btn">Cancel</button>
          <button className="submit-btn" onClick={handleSubmit}>
            <span className="material-symbols-outlined">check</span>
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyForLeave;
