import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../CSS/ApplyForLeavePage.css";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Custom input component for react-datepicker with icon inside
const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="input-with-icon" onClick={onClick} ref={ref}>
    <input
      type="text"
      readOnly
      className="custom-datepicker-input"
      value={value}
      placeholder={placeholder}
    />
    <FaCalendarAlt className="calendar-icon-inside" />
  </div>
));

export default function ApplyForLeavePage() {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      leaveType,
      fromDate,
      toDate,
      reason,
      file,
    });
  };

  return (
    <div className="leave-form-full">
      <h2 className="form-title">Apply for Leave</h2>
      <form className="leave-form" onSubmit={handleSubmit}>
        <label>Leave Type</label>
        <select
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          className="full-width"
        >
          <option value="">Choose Leave Type</option>
          <option value="Sick">Sick Leave</option>
          <option value="Casual">Casual Leave</option>
          <option value="Emergency">Emergency Leave</option>
        </select>

        <label>From Date</label>
        <DatePicker
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          placeholderText="Select From Date"
          customInput={<CustomInput placeholder="Select From Date" />}
          dateFormat="MMM d, yyyy"
          renderCustomHeader={({
            monthDate,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="custom-header">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="custom-nav-btn"
                aria-label="Previous Month"
                type="button"
              >
                <FaChevronLeft />
              </button>
              <span>
                {monthDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="custom-nav-btn"
                aria-label="Next Month"
                type="button"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        />

        <label>To Date</label>
        <DatePicker
          selected={toDate}
          onChange={(date) => setToDate(date)}
          placeholderText="Select To Date"
          customInput={<CustomInput placeholder="Select To Date" />}
          dateFormat="MMM d, yyyy"
          renderCustomHeader={({
            monthDate,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="custom-header">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="custom-nav-btn"
                aria-label="Previous Month"
                type="button"
              >
                <FaChevronLeft />
              </button>
              <span>
                {monthDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="custom-nav-btn"
                aria-label="Next Month"
                type="button"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        />

        <label>Reason</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Type your reason..."
        />

        <label>Upload Documents (Optional)</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit" className="submit-btn">
          Apply Leave
        </button>
      </form>
    </div>
  );
}
