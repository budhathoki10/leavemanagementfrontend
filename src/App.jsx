import "./App.css";
import "./index.css";
import "./CSS/Registration.css";
import "./components/SideBar";
import "./components/Dashboard";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <div className="layout">
        <div className="sidebar">
          {" "}
          <SideBar />
        </div>
        <Dashboard />
      </div>

      {/* <div className='topbar'>
            <TopBar/>
    </div>
            <div className='sideBar'>
              <SideBar/>
              </div> */}
    </>
  );
}

export default App;
