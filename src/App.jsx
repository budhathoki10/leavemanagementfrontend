import React from "react";
import "./App.css";
import "./CSS/Registration.css";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar.jsx";
import ApplyForLeavePage from "./pages/ApplyForLeavePage.jsx";
import PendingLeave from "./pages/PendingLeave.jsx";
import ApprovedLeave from "./pages/ApprovedLeave.jsx";
import RejectedLeave from "./pages/RejectedLeave.jsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Logout from "./pages/Logout";
import Settings from "./pages/Settings";
import Profile from "./setting-pages/Profile.jsx";
import Feedback from "./setting-pages/Feedback.jsx";

import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Layout with sidebar
function MainLayout() {
  return (
    <div className="layout">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />

 
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply-leave" element={<ApplyForLeavePage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/applyforleave" element={<ApplyForLeavePage />} />
        <Route path="/leavehistory/pendingleave" element={<PendingLeave />} />
        <Route path="/leavehistory/approvedleave" element={<ApprovedLeave />} />
        <Route path="/leavehistory/rejectedleave" element={<RejectedLeave />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<Profile />} />
        <Route path="/settings/feedback" element={<Feedback />} />
      </Route>
    </Routes>
  );
}

export default App;
