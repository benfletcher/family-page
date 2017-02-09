import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <div className="navButton">
    <p className="navTitle">Gallery
      <Link to="/upload">
        <img className="uploadButton" alt="upload" src="upload.png" />
      </Link>
    </p>
  </div>
);

export default Header;
