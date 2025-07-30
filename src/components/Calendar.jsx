import React, { useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Helper functions
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

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
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

        <hr style={{ marginBottom: 10 }} />

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
    width: "100vw",
    backgroundColor: "#A1E8AF",
    padding: "20px 0",
    fontFamily: "Roboto, sans-serif",
    color: "#000",
    overflowY: "auto",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px 40px",
    maxWidth: "1000px",
    width: "100%",
    margin: "0 auto",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  title: {
    fontSize: "24px",
    margin: 0,
    color: "#000",
  },
  userIcons: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  icon: {
    fontSize: "18px",
    cursor: "pointer",
    color: "#000",
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
    color: "#000",
  },
  monthRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  monthText: {
    margin: 0,
    fontSize: "18px",
    color: "#000",
  },
  chevronButtons: {
    display: "flex",
    gap: "10px",
  },
  navBtn: {
    border: "none",
    backgroundColor: "#1B9C1B",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  calendarBox: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    width: "100%",
  },
  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  dayLabel: {
    padding: "10px 0",
    fontSize: "14px",
  },
  dayGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "8px",
  },
  dayCell: {
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "6px",
    height: "60px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontSize: "14px",
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
};

export default Calendar;
