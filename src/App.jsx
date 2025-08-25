import "./App.css";
import "./pages/Calendar.jsx";
import "./CSS/Registration.css";
import "./pages/ApplyForLeavePage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar.jsx";
import ApplyForLeavePage from "./pages/ApplyForLeavePage.jsx";
import Profile from "./setting-pages/Profile.jsx";
import PendingLeave from "./pages/PendingLeave.jsx";
import ApprovedLeave from "./pages/ApprovedLeave.jsx";
import RejectedLeave from "./pages/RejectedLeave.jsx";
import Feedback from "./setting-pages/Feedback.jsx";

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
