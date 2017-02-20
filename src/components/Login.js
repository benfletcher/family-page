import React from 'react';

const Login = () => (
  <div>
    <div>
      <div className="logoContainer">
        <img className="logoImage" src="./familyLogo.png" alt="logo" />
      </div>
      <div className="loginContainer">
        <a href="http://localhost:8080/auth/google">
          <img className="loginImage" src="./googlelogin.png" alt="login" />
        </a>
      </div>
    </div>
  </div>
);

export default Login;
