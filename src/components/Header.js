import React from 'react';
import { Link } from 'react-router';

const Header = () => (
  <div className="navButton">
    <p className="navTitle">
      <Link to="/">
      Home
      </Link>
      <span>  </span>
      <Link to="/gallery">
   		Gallery
   	  </Link>
      <Link to="/upload">
        <img className="uploadButton" alt="upload" src="upload.png" />
      </Link>
    </p>
  </div>
);

export default Header;
