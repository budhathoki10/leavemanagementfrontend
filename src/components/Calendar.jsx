import React, { useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const totalDays = getDaysInMonth(currentMonth, currentYear);
  const startDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array(startDay)
    .fill("")
    .concat(
      Array.from({ length: totalDays }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
      )
    );

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Calendar</h2>
          <div style={styles.userIcons}>
            <FaBell style={styles.icon} />
            <div style={styles.userInfo}>
              <FaUserCircle size={24} />
              <div style={styles.userText}>
                <div style={styles.userName}>John Snow</div>
                <small style={styles.userRole}>User</small>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={styles.monthRow}>
          <h3 style={styles.monthText}>
            {monthNames[currentMonth]}, {currentYear}
          </h3>
          <div style={styles.chevronButtons}>
            <button style={styles.navBtn} onClick={handlePrev}>
              <FaChevronLeft />
            </button>
            <button style={styles.navBtn} onClick={handleNext}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={styles.calendarBox}>
          <div style={styles.weekRow}>
            {daysOfWeek.map((day, index) => (
              <div key={index} style={styles.dayLabel}>
                {day}
              </div>
            ))}
          </div>
          <div style={styles.dayGrid}>
            {days.map((day, index) => (
              <div key={index} style={styles.dayCell}>
                {day && <span>{day}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100%", // FIXED: removed horizontal scrollbar
    backgroundColor: "#A1E8AF",
    padding: "20px 16px",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "24px",
    maxWidth: "1000px",
    margin: "0 auto",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    fontSize: "28px",
    margin: 0,
    color: "#1a1a1a",
  },
  userIcons: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  icon: {
    fontSize: "18px",
    cursor: "pointer",
    color: "#333",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  userText: {
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
    lineHeight: "1.2",
  },
  userName: {
    fontSize: "14px",
    color: "#000",
  },
  userRole: {
    color: "#666",
  },
  monthRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  monthText: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  chevronButtons: {
    display: "flex",
    gap: "10px",
  },
  navBtn: {
    border: "none",
    backgroundColor: "#1B9C1B",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  calendarBox: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "16px",
    backgroundColor: "#fff",
    width: "100%",
  },
  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "12px",
    fontSize: "14px",
    color: "#333",
  },
  dayLabel: {
    padding: "8px 0",
  },
  dayGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "10px",
  },
  dayCell: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "6px",
    height: "60px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontSize: "14px",
    fontWeight: "bold",
    backgroundColor: "#fafafa",
  },
};

export default Calendar;
