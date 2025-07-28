import bg from "../assets/bg.png";
import "../CSS/Registration.css";
import herald from "../assets/herald-logo.png";
import wlv from "../assets/wlv-logo.png";
import leavo from "../assets/leavo-logo.png";
function Registration() {
  return (
    <div className="registration-wrapper">
      <div className="left-section">
        <div className="main-title">
          <p className="leave-management">LEAVE MANAGEMENT</p>
          <p className="system">SYSTEM</p>
          <img src="src\assets\leavo-logo.png" alt="leavo-logo" />
        </div>
      </div>

      <div className="right-section">
        <div className="top-img-bar">
          <img
            src="src\assets\wlv-logo.png"
            alt="wlv-logo"
            className="wlv-logo"
          />
          <img
            src="src\assets\herald-logo.png"
            alt="herald-logo"
            className="herald-logo"
          />
        </div>
        <p className="login">LOGIN</p>
        <div className="login-credentials">
          <div className="email">
            <p>Email</p>
            <input
              type="text"
              className="input-container"
              placeholder="Enter your email"
            ></input>
          </div>
          <div className="email">
            <p>Password</p>
            <input
              type="text"
              className="input-container"
              placeholder="Enter your password"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
