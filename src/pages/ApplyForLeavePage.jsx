import React, { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";
import userImage from "../assets/user.jpeg";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import "../CSS/ApplyForLeavePage.css";

const ApplyForLeave = () => {
  const [leaveType, setLeaveType] = useState("");
  const [moduleDetails, setModuleDetails] = useState([
    { moduleName: "", week: "", classType: "" },
  ]);
  const [reason, setReason] = useState("");
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);

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
      const token = Cookies.get("token");

      if (!token) {
        alert("No student token found. Please login first.");
        return;
      }

      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        alert("Session expired. Please login again.");
        Cookies.remove("token");
        return;
      }

      if (
        !leaveType ||
        !reason ||
        moduleDetails.some((m) => !m.moduleName || !m.week || !m.classType)
      ) {
        alert("Please fill in all required fields before submitting.");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("level", 6);
      formData.append("leaveType", leaveType.toLowerCase());
      formData.append("reason", reason);

      // Append modules as JSON
      formData.append(
        "leaves",
        JSON.stringify(
          moduleDetails.map((m) => ({
            moduledetails: m.moduleName, // backend ID
            week: parseInt(m.week),
            classtype: m.classType.toLowerCase(),
          }))
        )
      );

      // Append uploaded pictures
      pictures.forEach((pic) => {
        formData.append("pictures", pic);
      });

      const response = await axios.post(
        "https://leave-management-backend-8qav.onrender.com/api/task/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Leave request submitted successfully!");
      console.log("Response:", response.data);

      // ✅ Reset form
      setLeaveType("");
      setReason("");
      setModuleDetails([{ moduleName: "", week: "", classType: "" }]);
      setPictures([]);
    } catch (error) {
      console.error("Error submitting leave:", error.response || error);
      alert(error.response?.data?.message || "Failed to submit leave request.");
    } finally {
      setLoading(false);
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
                  {/* ⚠️ Replace values with real IDs */}
                  <option value="6892fc951b20a07e48284c19">
                    Computational Mathematics
                  </option>
                  <option value="6892fc5e1b20a07e48284c17">Physics</option>
                  <option value="6892fc9b1b20a07e48284c21">Chemistry</option>
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

        {/* Picture Upload */}
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
          <button
            className="cancel-btn"
            type="button"
            onClick={() => {
              setLeaveType("");
              setReason("");
              setModuleDetails([{ moduleName: "", week: "", classType: "" }]);
              setPictures([]);
            }}
          >
            Cancel
          </button>
          <button
            className="submit-btn"
            type="button"
            disabled={loading}
            onClick={handleSubmit}
          >
            <span className="material-symbols-outlined">check</span>
            {loading ? "Submitting..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyForLeave;
