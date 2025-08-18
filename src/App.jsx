import "./App.css";
import "./components/Calendar.jsx";
import "./CSS/Registration.css";
import "./components/ApplyForLeavePage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar.jsx";
import ApplyForLeavePage from "./components/ApplyForLeavePage.jsx";
import Profile from "./components/Profile.jsx";
import PendingLeave from "./components/PendingLeave.jsx";
import ApprovedLeave from "./components/ApprovedLeave.jsx";
import RejectedLeave from "./components/RejectedLeave.jsx";
import Feedback from "./components/Feedback.jsx";

function App() {
  return (
    <div className="layout">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/applyforleave" element={<ApplyForLeavePage />} />
          <Route path="/settings/profile" element={<Profile />} />
          <Route path="/leavehistory/pendingleave" element={<PendingLeave />} />
          <Route path="/settings/feedback" element={<Feedback />} />
          <Route
            path="/leavehistory/approvedleave"
            element={<ApprovedLeave />}
          />
          <Route
            path="/leavehistory/rejectedleave"
            element={<RejectedLeave />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
