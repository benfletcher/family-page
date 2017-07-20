import React from 'react';
import { Link } from 'react-router';

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
        <Link to="/families?token=ya29.Gl2MBF80GaFFHNsNryjRy-Pg3-swpuN117V1m37IeYc_8EdiWFvNjhXIIaC6vI0LBQ9_Y9AHBUMvhBAeeHSTos8rzJ543zWiDvMhSDW_yFAr95MRNWk307BbuYUU5z8">
          <div
            className="loginImage trial"
          >Explore without Login</div>
        </Link>
      </div>
    </div>
  </div>
);

export default Login;
