import React, { Component } from 'react';
// import { Link } from 'react-router';
import Upload from './Upload';

class NavBar extends Component {


  render() {
    return (
      <div>
        <button type="submit">Gallery</button>
        <Upload />
      </div>
    );
  }
}

export default NavBar;
