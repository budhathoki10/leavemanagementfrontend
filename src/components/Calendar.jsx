import React, { useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
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
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");
  const [eventColor, setEventColor] = useState("#1a73e8");
  const [editingEventIndex, setEditingEventIndex] = useState(null);

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const totalDays = getDaysInMonth(currentMonth, currentYear);
  const startDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array(startDay)
    .fill(null)
    .concat(Array.from({ length: totalDays }, (_, i) => i + 1));
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayClick = (day) => {
    if (!day) return;
    const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
    setSelectedDate(dateKey);
    setNewEvent("");
    setEventColor("#1a73e8");
    setEditingEventIndex(null);
  };

  const handleSaveEvent = () => {
    if (!newEvent.trim()) return;
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      const eventObj = { title: newEvent, color: eventColor };
      if (editingEventIndex !== null) {
        updatedEvents[selectedDate][editingEventIndex] = eventObj;
      } else {
        updatedEvents[selectedDate] = [
          ...(updatedEvents[selectedDate] || []),
          eventObj,
        ];
      }
      return updatedEvents;
    });
    setNewEvent("");
    setSelectedDate(null);
    setEditingEventIndex(null);
  };

  const handleDeleteEvent = (dateKey, index) => {
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      updatedEvents[dateKey].splice(index, 1);
      if (updatedEvents[dateKey].length === 0) {
        delete updatedEvents[dateKey];
      }
      return updatedEvents;
    });
  };

  const handleEditEvent = (dateKey, index) => {
    setSelectedDate(dateKey);
    setNewEvent(events[dateKey][index].title);
    setEventColor(events[dateKey][index].color || "#1a73e8");
    setEditingEventIndex(index);
  };

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
            {days.map((day, index) => {
              const isToday =
                day &&
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              const dateKey = day
                ? `${currentYear}-${currentMonth + 1}-${day}`
                : null;

              return (
                <div
                  key={index}
                  style={styles.dayCell}
                  onClick={() => day && handleDayClick(day)}
                >
                  {day && (
                    <>
                      <span
                        style={{
                          ...styles.dayNumber,
                          ...(isToday ? styles.todayCircle : {}),
                        }}
                      >
                        {day}
                      </span>
                      <div style={styles.eventsList}>
                        {events[dateKey]?.map((evt, i) => (
                          <div
                            key={i}
                            style={{
                              ...styles.eventItem,
                              backgroundColor: evt.color,
                              color: "#fff",
                            }}
                          >
                            <span>{evt.title}</span>
                            <div style={styles.eventActions}>
                              <FaEdit
                                style={styles.actionIcon}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditEvent(dateKey, i);
                                }}
                              />
                              <FaTrash
                                style={{ ...styles.actionIcon, color: "red" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteEvent(dateKey, i);
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popup Overlay */}
      {selectedDate && (
        <div style={styles.overlayBackdrop}>
          <div style={styles.overlayCard}>
            <h3 style={styles.overlayTitle}>
              {editingEventIndex !== null ? "Edit Event" : "Add Event"}
            </h3>
            <input
              style={styles.overlayInput}
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="Event title..."
            />
            <div style={styles.colorRow}>
              <label>Event Color: </label>
              <input
                type="color"
                value={eventColor}
                onChange={(e) => setEventColor(e.target.value)}
              />
            </div>
            <div style={styles.overlayButtons}>
              <button
                style={{ ...styles.saveBtn, backgroundColor: eventColor }}
                onClick={handleSaveEvent}
              >
                Save
              </button>
              <button
                style={styles.cancelBtn}
                onClick={() => {
                  setSelectedDate(null);
                  setEditingEventIndex(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "16px 24px",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  container: { display: "flex", flexDirection: "column", height: "100%" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: "10px",
  },
  title: { fontSize: "24px", fontWeight: "500", color: "#202124" },
  userIcons: { display: "flex", alignItems: "center", gap: "20px" },
  icon: { fontSize: "18px", cursor: "pointer", color: "#333" },
  userInfo: { display: "flex", alignItems: "center", gap: "6px" },
  userText: {
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
    lineHeight: "1.2",
  },
  userName: { fontSize: "14px", color: "#000" },
  userRole: { color: "#666" },
  monthRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  monthText: { fontSize: "20px", fontWeight: "600", color: "#202124" },
  chevronButtons: { display: "flex", gap: "8px" },
  navBtn: {
    border: "none",
    backgroundColor: "#fff",
    color: "#5f6368",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  calendarBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    textAlign: "center",
    fontWeight: "500",
    padding: "8px 0",
    borderBottom: "1px solid #e0e0e0",
    fontSize: "14px",
    color: "#5f6368",
  },
  dayLabel: { padding: "8px 0" },
  dayGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridAutoRows: "100px",
    gap: "2px",
  },
  dayCell: {
    border: "1px solid #e0e0e0",
    padding: "6px",
    fontSize: "14px",
    color: "#202124",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    cursor: "pointer",
  },
  dayNumber: { marginBottom: "4px", padding: "2px 6px", borderRadius: "4px" },
  todayCircle: {
    backgroundColor: "#1a73e8",
    color: "#fff",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  eventsList: {
    marginTop: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  eventItem: {
    fontSize: "12px",
    padding: "2px 4px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "4px",
  },
  eventActions: { display: "flex", gap: "4px" },
  actionIcon: { cursor: "pointer", fontSize: "12px", color: "#fff" },

  /* Overlay Styles */
  overlayBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  overlayCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  overlayTitle: { fontSize: "18px", marginBottom: "8px", textAlign: "center" },
  overlayInput: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  colorRow: { display: "flex", alignItems: "center", gap: "8px" },
  overlayButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  saveBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "8px 14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Calendar;
