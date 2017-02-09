import React, { Component } from 'react';

/* eslint react/prefer-stateless-function: 0 */
class Welcome extends Component {
  render() {
    return (
      <div>
        <p> thee </p>
        <a href="/auth/google">
          <img className="googleButton" alt="google login" src="../googlelogin.png" />
        </a>
      </div>
    );
  }
}

export default Welcome;
