import React from 'react';
import { Link } from 'react-router';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Header = () => (
  <div className="navButton">
    <p className="navTitle">
      <Link to="/app">
        Home
      </Link>
      <span />
      <Link to="/gallery">
        Gallery
      </Link>
      <a href={`${serverUrl}/auth/logout`}>
        Logout
      </a>
      <Link to="/upload">
        <i className="fa fa-cloud-upload fa-2x uploadButton" aria-hidden="true" />
      </Link>
    </p>
  </div>
);

export default Header;
