import React from 'react';
import { Link } from 'react-router';

const Login = () => (
  <div>
    <div>
      <div className="logoContainer">
        <img className="logoImage" src="./familyLogo.png" alt="logo" />
      </div>
      <div className="loginContainer">
        <Link to="/">
          <img className="loginImage" src="./googlelogin.png" alt="login" />
        </Link>
      </div>
    </div>
  </div>
);

export default Login;
