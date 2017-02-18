import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <div className="navButton">
    <p className="navTitle">
      <a href="http://localhost:8080/auth/google">
        Login
      </a>
      <Link to="/">
      Home
      </Link>
      <span />
      <Link to="/gallery">
        Gallery
      </Link>
      <Link to="/upload">
        <i className="fa fa-cloud-upload fa-2x uploadButton" aria-hidden="true" />
      </Link>
    </p>
  </div>
);

export default Header;
