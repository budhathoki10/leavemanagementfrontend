import { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import "../CSS/Dashboard.css";
import userImage from "../assets/user.jpeg";
import clgLogo from "../assets/OIP.png";
import CircularProgressBar from "../components/CircularProgressBar";
import MonthlyLeaveChart from "../components/MonthlyLeaveChart";

export default function Dashboard() {
  const [studentName, setStudentName] = useState("Student");
  const [modules, setModules] = useState([
    { moduleName: "Computational Mathematics", taken: 0, total: 8 },
    {
      moduleName: "Interactive 3D Applications and Academic Skills",
      taken: 0,
      total: 8,
    },
    {
      moduleName: "Introduction to Object-Oriented Programming",
      taken: 0,
      total: 8,
    },
  ]);
  const [leavesApproved, setLeavesApproved] = useState(0);
  const [leavesPending, setLeavesPending] = useState(0);
  const [leavesRejected, setLeavesRejected] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    const fetchDashboard = () => {
      fetch(
        "https://leavesssssssssssssss.onrender.com/profile",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.studentname) setStudentName(data.data.studentname);
        })
        .catch((err) => console.error("Profile fetch error:", err));

      fetch(
        "https://leavesssssssssssssss.onrender.com/user/dashboard",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) {
            setLeavesApproved(data.data.totalLeaveTaken || 0);
            setLeavesPending(data.data.leavesPending || 0);
            setLeavesRejected(data.data.leavesRejected || 0);

            // Update module progress bars
            const updatedModules = data.data.moduleWiseStats.map((m) => ({
              moduleName: m.module.Modulename,
              taken: m.daysTaken,
              total: m.daysTaken + m.remainingLeaves,
            }));
            setModules(updatedModules);

            // Map moduleWiseStats to chart data
            const chartData = data.data.moduleWiseStats.map((m) => ({
              module: { Modulename: m.module.Modulename },
              daysTaken: m.daysTaken,
            }));
            setMonthlyData(chartData);
          }
        })
        .catch((err) => console.error("Dashboard fetch error:", err));
    };

    // Initial fetch
    fetchDashboard();

    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchDashboard, 5000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="dashboard-content">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <section className="dashboard-headers">
        <p className="dashboard">Dashboard</p>
        <div className="icons">
          <div className="notifications">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <div className="user-pfp">
            <img src={userImage} alt="user" />
          </div>
          <div className="user-text">
            <p className="username">{studentName}</p>
            <p className="username-user">Student</p>
          </div>
        </div>
      </section>
      <hr className="parting-line" />

      <MidTop>
        <UserInfoCard>
          <div className="inner-top">
            <div className="level-date">
              <p className="level">Level 5</p>
              <p className="date">{formattedDate}</p>
            </div>
            <div className="clg-logo">
              <img src={clgLogo} alt="college logo" />
            </div>
          </div>
          <div className="user-info-card-details">
            <div className="course-details">
              <span className="course-label">Course</span>
              <p className="course-name">
                Bachelor in Computer Science and Technology
              </p>
            </div>
            <div className="intake-details">
              <span className="intake-label">Intake</span>
              <p className="intake-name">Winter</p>
            </div>
          </div>
        </UserInfoCard>

        <LeavePerModule>
          <span className="leave-per-module-label">Leave Per Module</span>
          {modules.length === 0 || modules.every((mod) => mod.taken === 0) ? (
            <NoLeavesMessage>No leaves taken</NoLeavesMessage>
          ) : (
            modules.map((mod) => {
              const percentage = (mod.taken / mod.total) * 100;
              return (
                <LeavePerModuleProgressBar key={mod.moduleName}>
                  <div className="text">
                    <p className="module-name">{mod.moduleName}</p>
                    <p className="takenLeaves">
                      {mod.taken} / {mod.total}
                    </p>
                  </div>
                  <div className="progressbar">
                    <div
                      className="progress"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </LeavePerModuleProgressBar>
              );
            })
          )}
        </LeavePerModule>
      </MidTop>

      <Bottom>
        <LeavesTakenCard>
          <p className="leaves-taken-label">Leaves Taken</p>
          <div className="circular-progress-bar">
            <CircularProgressBar taken={leavesApproved} total={24} />
          </div>
          <p className="leaves-taken-this-semester">This semester: 3</p>
        </LeavesTakenCard>

        <MonthlyLeaveChart monthlyData={monthlyData} />
      </Bottom>
    </div>
  );
}

// Styled-components
const MidTop = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 30px;
`;

const UserInfoCard = styled.div`
  background-color: white;
  flex: 1 1 487px;
  min-width: 300px;
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .inner-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .level-date {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .level {
    font-size: 26px;
    font-weight: bold;
  }

  .date {
    font-size: 14px;
    color: #6b7280;
  }

  .clg-logo img {
    border-radius: 12px;
    width: 150px;
    height: 75px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }

  .user-info-card-details {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .course-details,
  .intake-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .course-label,
  .intake-label {
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
  }

  .course-name,
  .intake-name {
    font-size: 16px;
    color: #111827;
  }
`;

const LeavePerModule = styled.div`
  background-color: white;
  flex: 1 1 437px;
  min-width: 250px;
  min-height: 210px;
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  .leave-per-module-label {
    display: block;
    font-size: 18px;
    font-weight: bold;
  }
`;

const LeavePerModuleProgressBar = styled.div`
  .module-name {
    margin-top: 12px;
    font-size: 15px;
  }
  .text {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .takenLeaves {
    font-size: 12px;
    color: gray;
  }
  .progressbar {
    width: 100%;
    height: 8px;
    background: hsl(215, 50%, 91%);
    border-radius: 20px;
    overflow: hidden;
    margin-top: 5px;
  }
  .progress {
    height: 8px;
    background: #4caf50;
    border-radius: 20px;
    transition: width 0.3s ease;
  }
`;

const LeavesTakenCard = styled.div`
  max-width: 250px;
  max-height: 353px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 20px;
  margin-right: 20px;
  flex: 1 1 350px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  .leaves-taken-label {
    font-size: 22px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }

  .leaves-taken-this-semester {
    display: grid;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    font-size: 20px;
    font-weight: 700;
    color: hsla(0, 0%, 0%, 0.725);
  }
`;

const Bottom = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

const NoLeavesMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #37ac39ff;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
`;
