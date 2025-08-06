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
        </Routes>
      </div>
    </div>
  );
}

export default App;
