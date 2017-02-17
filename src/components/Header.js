import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <div className="navButton">
    <a href="http://localhost:8080/auth/google">
      Login to Google
    </a>
    <p className="navTitle">
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
