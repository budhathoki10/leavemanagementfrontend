import React from "react";
import "../CSS/SemiCircularProgress.css";

const SemiCircularProgress = () => {
  return (
    <div
      role="progressbar"
      aria-valuenow={55}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ "--value": 65 }}
    ></div>
  );
};

export default SemiCircularProgress;
