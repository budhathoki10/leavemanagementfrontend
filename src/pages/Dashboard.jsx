import styled from "styled-components";
import "../CSS/Dashboard.css";
import userImage from "../assets/user.jpeg";
import clgLogo from "../assets/OIP.png";
import CircularProgressBar from "../components/CircularProgressBar";
import MonthlyLeaveChart from "../components/MonthlyLeaveChart";
import QuickActions from "../components/QuickActions";

const dashboardLeaveData = [
  {
    moduleName: "Concept and Technologies of AI",
    takenLeaves: "8 / 8",
  },
  {
    moduleName: "Full stack development",
    takenLeaves: "0 / 8",
  },
  {
    moduleName: "Object Oriented Programming",
    takenLeaves: "1 / 8",
  },
];

const leavesTakenData = [
  {
    leavesApproved: "8",
  },
];

export default function Dashboard() {
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
      <section className="dashboard-header">
        <p className="dashboard">Dashboard</p>
        <div className="icons">
          <div className="notifications">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <div className="user-pfp">
            <img src={userImage} alt="user" />
          </div>
          <div className="user-text">
            <p className="username">John Snow</p>
            <p className="username-user">User</p>
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
              <img src={clgLogo}></img>
            </div>
          </div>

          <div className="user-info-card-details">
            <div className="course-details">
              <span className="course-label">Course</span>
              <p className="course-name">
                Bachelor in computer science and technology
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
          {dashboardLeaveData.map((value) => {
            const [taken, total] = value.takenLeaves.split("/").map(Number);
            const percentage = (taken / total) * 100;

            return (
              <LeavePerModuleProgressBar key={value.moduleName}>
                <div className="text">
                  <p className="module-name">{value.moduleName}</p>
                  <p className="takenLeaves">{value.takenLeaves}</p>
                </div>

                <div className="progressbar">
                  <div
                    className="progress"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </LeavePerModuleProgressBar>
            );
          })}
        </LeavePerModule>
      </MidTop>
      <Bottom>
        <LeavesTakenCard>
          <p className="leaves-taken-label">Leaves Taken</p>
          <div className="circular-progress-bar">
            {leavesTakenData.map((value, index) => {
              const taken = Number(value.leavesApproved);
              return (
                <CircularProgressBar key={index} taken={taken} total={24} />
              );
            })}
            {/* <SemiCircularProgress/> */}
          </div>
          <p className="leaves-taken-pending-rejected-leaves">
            Pending Leaves: 0{" "}
          </p>
          <p className="leaves-taken-pending-rejected-leaves">
            Rejected Leaves: 3{" "}
          </p>
        </LeavesTakenCard>
        <MonthlyLeaveChart />
        <QuickActions />
      </Bottom>
    </div>
  );
}

const MidTop = styled.section`
  display: flex;
  flex-wrap: wrap; /* allows wrapping on small screens */
  gap: 20px; /* space between cards */
  padding-left: 30px;
  padding-right: 30px;
`;

const UserInfoCard = styled.div`
  background-color: white;
  flex: 1 1 487px; /* flexible width, prefers 500px */
  min-width: 300px; /* never shrink below this */
  height: 210px;
  padding: 25px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  .inner-top {
    /* border: 1px solid; */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .inner-top img {
    /* border: 1px solid; */
    border-radius: 12px;
    width: 150px;
    height: 75px;
    margin-top: -30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }

  .level-date {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
  }
  .level {
    font-size: 26px;
  }
  .date {
    font-size: 14px;
  }
  .user-info-card-details {
    display: flex;
    justify-content: space-between;
  }
  .course-label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .course-name {
    font-size: 16px;
    font-weight: bold;
  }
  .intake-label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  .intake-name {
    font-size: 16px;
    font-weight: bold;
  }
`;

const LeavePerModule = styled.div`
  background-color: white;
  flex: 1 1 437px; /* flexible width, prefers 350px */
  min-width: 250px; /* never shrink below this */
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
  /* max-height: 353px; */
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
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: bold;
  }
  .leaves-taken-pending-rejected-leaves {
    display: grid;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    font-size: 18px;
    font-weight: 500;
    color: hsla(0, 0%, 0%, 0.525);
  }
`;

const Bottom = styled.section`
  display: flex;
`;
