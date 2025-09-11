import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import userImage from "../assets/user.jpeg";
import "../CSS/ApplyForLeavePage.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ApplyForLeave = () => {
  const [leaveType, setLeaveType] = useState("");
  const [moduleDetails, setModuleDetails] = useState([
    { moduleName: "", week: "", classType: "" },
  ]);
  const [reason, setReason] = useState("");
  const [pictures, setPictures] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveStats, setLeaveStats] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "info",
  });
  const leavesTaken = leaveStats ? leaveStats.totalDaysTaken : 0;
  const totalLeaves = 24;

  const pieData = [
    { name: "Taken", value: leavesTaken },
    { name: "Remaining", value: totalLeaves - leavesTaken },
  ];
  const COLORS = ["#00571e", "#e0e0e0"];

  const getModuleRemainingLeaves = (moduleId) => {
    if (!leaveStats || !leaveStats.moduleWiseStats) return 7;

    const moduleStat = leaveStats.moduleWiseStats.find(
      (stat) => stat.module._id === moduleId
    );

    return moduleStat ? moduleStat.remainingLeaves : 7;
  };

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
    if (e.target.files.length > 0) {
      setPictures([...e.target.files]);
    }
  };

  const handleRemovePicture = (index) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  // Custom alert handler
  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "info" });
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!leaveType) {
      showAlert("Please select a leave type", "error");
      return;
    }

    const invalidModule = moduleDetails.find(
      (m) => !m.moduleName || !m.week || !m.classType
    );
    if (invalidModule) {
      showAlert("Please fill all module details", "error");
      return;
    }

    if (!reason.trim()) {
      showAlert("Please provide a reason for leave", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = Cookies.get("token");
      if (!token) {
        showAlert("You are not logged in. Please log in first.", "error");
        setIsSubmitting(false);
        return;
      }

      let response;

      if (pictures.length > 0) {
        const formData = new FormData();
        formData.append("level", 6);
        formData.append("leaveType", leaveType.toLowerCase());
        formData.append("reason", reason);

        moduleDetails.forEach((module, index) => {
          formData.append(`leaves[${index}][moduledetails]`, module.moduleName);
          formData.append(`leaves[${index}][week]`, parseInt(module.week));
          formData.append(
            `leaves[${index}][classtype]`,
            module.classType.toLowerCase()
          );
          formData.append(`leaves[${index}][leaveday]`, 1);
        });

        formData.append("myfile", pictures[0]);

        response = await axios.post(
          "https://leave-management-backend-1-mp7s.onrender.com/api/task/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        const payload = {
          level: 6,
          leaveType: leaveType.toLowerCase(),
          reason: reason,
          leaves: moduleDetails.map((m) => ({
            moduledetails: m.moduleName,
            week: parseInt(m.week),
            classtype: m.classType.toLowerCase(),
            leaveday: 1,
          })),
        };

        response = await axios.post(
          "https://leave-management-backend-1-mp7s.onrender.com/api/task/create",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      showAlert("Leave request submitted successfully!", "success");

      // Reset form
      setLeaveType("");
      setModuleDetails([{ moduleName: "", week: "", classType: "" }]);
      setReason("");
      setPictures([]);
    } catch (error) {
      console.error("Error submitting leave:", error.response?.data || error);
      showAlert(
        "Failed to submit leave request. Please check your login or try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="apply-content">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />

      {/* Custom Alert */}
      {alert.show && (
        <div className={`custom-alert custom-alert-${alert.type}`}>
          <span className="material-symbols-outlined alert-icon">
            {alert.type === "success" ? "check_circle" : "error"}
          </span>
          <span>{alert.message}</span>
        </div>
      )}

      <section className="dashboard-header">
        <p className="dashboard">Apply for Leave</p>
        <div className="icons">
          <div className="user-pfp">
            <img src={userImage} alt="user" />
          </div>
          <div className="user-text">
            <p className="username">John Snow</p>
            <p className="username-user">
              {isLoggedIn ? "Logged in" : "Not Logged In"}
            </p>
          </div>
        </div>
      </section>

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
        {leaveStats && (
          <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
            Last updated: {new Date(leaveStats.lastUpdated).toLocaleString()}
            <br />
            <small>Updates automatically every 10 seconds</small>
          </p>
        )}
      </div>

      <div className="leave-form">
        <h4>Leave Request</h4>

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
                  <option value="688386b9b65720836a037725">
                    Computational Mathematics
                  </option>
                  <option value="688386ecb65720836a037728">
                    Introduction to Object-Oriented Programming
                  </option>
                  <option value="68838752b65720836a03772a">
                    Interactive 3D Applications and Academic Skills
                  </option>
                </select>
              </div>

              <div className="form-group small">
                <label>Week</label>
                <select
                  value={module.week}
                  onChange={(e) =>
                    handleModuleChange(index, "week", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Week {i + 1}
                    </option>
                  ))}
                </select>
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

            <p className="module-extra">
              Module Remaining Leave:{" "}
              {module.moduleName
                ? getModuleRemainingLeaves(module.moduleName)
                : 7}
            </p>
          </div>
        ))}

        <div className="form-group">
          <label>Reason</label>
          <textarea
            placeholder="Enter your reason."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Upload Picture (Optional)</label>

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
            Upload Picture
          </button>

          <input
            type="file"
            accept="image/*"
            id="pictureInput"
            onChange={handlePictureChange}
            style={{ display: "none" }}
            multiple
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button
            type="button"
            className="submit-btn"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <span className="material-symbols-outlined">check</span>
            {isSubmitting ? "Submitting..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyForLeave;
