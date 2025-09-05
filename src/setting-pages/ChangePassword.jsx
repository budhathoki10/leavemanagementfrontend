import React, { useState, useEffect } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Load Google Material Symbols font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // TODO: Add API call to update password
    alert("Password changed successfully!");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      padding: "20px",
      boxSizing: "border-box",
    },
    card: {
      background: "#fff",
      padding: "40px 30px",
      borderRadius: "15px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "450px",
      boxSizing: "border-box",
    },
    title: { textAlign: "center", fontSize: "26px", fontWeight: 600, marginBottom: "5px" },
    subtitle: { textAlign: "center", color: "#666", marginBottom: "25px", fontSize: "14px" },
    inputGroup: { marginBottom: "20px" },
    label: { display: "block", marginBottom: "5px", fontWeight: 500, color: "#333" },
    inputWrapper: { position: "relative" },
    input: {
      width: "100%",
      padding: "12px 40px 12px 15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
      transition: "all 0.3s",
      boxSizing: "border-box",
    },
    toggle: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#87b56c",
      fontSize: "20px",
      userSelect: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#87b56c",
      color: "#fff",
      fontSize: "16px",
      fontWeight: 500,
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  const PasswordField = ({ label, value, setValue, show, setShow }) => (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrapper}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={styles.input}
          required
        />
        <span
          className="material-symbols-outlined"
          style={styles.toggle}
          onClick={() => setShow(!show)}
        >
          {show ? "visibility_off" : "visibility"}
        </span>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Change Password</h2>
        <p style={styles.subtitle}>
          Ensure your account is using a strong password
        </p>
        <form onSubmit={handleSubmit}>
          <PasswordField
            label="Old Password"
            value={oldPassword}
            setValue={setOldPassword}
            show={showOld}
            setShow={setShowOld}
          />
          <PasswordField
            label="New Password"
            value={newPassword}
            setValue={setNewPassword}
            show={showNew}
            setShow={setShowNew}
          />
          <PasswordField
            label="Confirm New Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            show={showConfirm}
            setShow={setShowConfirm}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6fa35c")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#87b56c")}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
