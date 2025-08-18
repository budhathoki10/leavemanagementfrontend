import React, { useState } from "react";
import "../CSS/Feedback.css";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      alert("Please enter your feedback.");
      return;
    }
    alert("Thank you for your feedback!");
    setFeedback("");
  };

  return (
    <div className="feedback-page">
      <header className="feedback-header">
        <h2>Feedback and Support</h2>
      </header>

      <div className="feedback-container">
        <div className="feedback-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="feedback-text">Enter your feedback:</label>
            <textarea
              id="feedback-text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Type your feedback here..."
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="contact-section">
        <h3>Contact Us</h3>
        <p className="contact-sub">Feel free to reach out to us.</p>
        <p>
          Naxal Bhagwati Marga, Kathmandu, Nepal
          <br />
          Phone: <strong>+977 9801022637</strong>
          <br />
          Email: <strong>heraldcollege@gmail.com</strong>
        </p>
      </div>
    </div>
  );
};

export default Feedback;
