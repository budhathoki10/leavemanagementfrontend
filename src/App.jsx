import React from "react";
import "./App.css";
import "./CSS/Registration.css";
import SideBar from "./components/SideBar";
import Dashboard from "./pages/Dashboard";
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
import ChangePassword from "./setting-pages/ChangePassword";
import Notification from "./setting-pages/Notification";

import { Routes, Route, Navigate, Outlet } from "react-router-dom";

{
  /* Admin route */
}

import AdminSettingSideBar from "./adminPanel/AdminSettingSideBar";
import AdminApplyForLeavePage from "./adminPanel/AdminApplyForLeavePage";
import AdminApprovedLeave from "./adminPanel/AdminApprovedLeave";
import AdminDashboard from "./adminPanel/AdminDashboard";
import AdminLeaveHistoryBar from "./adminPanel/AdminLeaveHistoryBar";
import AdminLeaveRequests from "./adminPanel/AdminLeaveRequests";
import AdminLogout from "./adminPanel/AdminLogout";
import AdminPendingLeave from "./adminPanel/AdminPendingLeave";
import AdminRejectedLeave from "./adminPanel/AdminRejectedLeave";
import AdminSettings from "./adminPanel/AdminSettings";
import AdminViewLeave from "./adminPanel/AdminViewLeave";

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
      {/* Render Register page at /leavo (root of basename) */}
      <Route path="/" element={<RegisterPage />} />
      {/* Authentication routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />
      {/* Main app routes */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings/notification" element={<Notification />} />
        <Route path="/apply-leave" element={<ApplyForLeavePage />} />
        <Route path="/applyforleave" element={<ApplyForLeavePage />} />
        <Route path="/leavehistory/pendingleave" element={<PendingLeave />} />
        <Route path="/leavehistory/approvedleave" element={<ApprovedLeave />} />
        <Route path="/leavehistory/rejectedleave" element={<RejectedLeave />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<Profile />} />
        <Route path="/settings/feedback" element={<Feedback />} />
        <Route path="/changeprofile" element={<ChangePassword />} />
      </Route>

      {/* Admin route */}
      <Route path="/adminSettingSideBar" element={<AdminSettingSideBar />} />
      <Route
        path="/adminApplyForLeavePage"
        element={<AdminApplyForLeavePage />}
      />
      <Route path="/adminApplyApprovedLeave" element={<AdminApprovedLeave />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/adminLeaveHistoryBar" element={<AdminLeaveHistoryBar />} />
      <Route path="/adminLeaveRequests" element={<AdminLeaveRequests />} />
      <Route path="/adminLogout" element={<AdminLogout />} />
      <Route path="/adminPendingLeave" element={<AdminPendingLeave />} />
      <Route path="/adminRejectedLeave" element={<AdminRejectedLeave />} />
      <Route path="/adminSettings" element={<AdminSettings />} />
      <Route path="/admin-view-leave" element={<AdminViewLeave />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/changeprofilePassword" element={<ChangePassword />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/notifications" element={<Notification />} />
        <Route path="/feedback" element={<Feedback />} />


      {/* Catch all */}
      <Route path="*" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
//registrytimetableexamination@gmail.com yo mail rakhyo vane matrai admin ma janxa
