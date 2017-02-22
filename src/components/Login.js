import React from 'react';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Login = () => (
  <div>
    <div>
      <div className="logoContainer">
        <img className="logoImage" src="./familyLogo.png" alt="logo" />
      </div>
      <div className="loginContainer">
        <a href={`${serverUrl}/auth/google`}>
          <img className="loginImage" src="./googlelogin.png" alt="login" />
        </a>
      </div>
    </div>
  </div>
);

export default Login;
