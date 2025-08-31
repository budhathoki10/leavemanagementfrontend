import React, { useEffect, useRef } from "react";
import "../CSS/CircularProgressBar.css";

export default function CircularProgressBar({ taken, total }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percentage = taken / total;
  const offset = circumference - percentage * circumference;

  const circleRef = useRef(null);

  useEffect(() => {
    if (circleRef.current) {
      // Animate strokeDashoffset via CSS transition
      circleRef.current.style.strokeDasharray = circumference;
      circleRef.current.style.strokeDashoffset = circumference; // start hidden

      // trigger reflow so animation works
      requestAnimationFrame(() => {
        circleRef.current.style.strokeDashoffset = offset; // animate to value
      });
    }
  }, [circumference, offset]);

  return (
    <div className="skill">
      <div className="outer">
        <div className="inner">
          <div id="number">
            <span>{taken}</span>
            <p>/{total}</p>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
        <defs>
          <linearGradient id="GradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D5051" />
            <stop offset="100%" stopColor="#93FD70" />
          </linearGradient>
        </defs>

        <circle
          ref={circleRef}
          cx="80"
          cy="80"
          r={radius}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"   // start at 12 o’clock
          stroke="url(#GradientColor)"
          strokeWidth="20"
          fill="none"
          style={{
            transition: "stroke-dashoffset 1s ease",
          }}
        />
      </svg>
    </div>
  );
}
