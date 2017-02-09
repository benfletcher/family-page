import React, { Component } from 'react';

/* eslint react/prefer-stateless-function: 0 */
class PhotoNode extends Component {
  render() {
    return (
      <div className="node col-6">
        <div className="photoHeader inline">
          <img className="userIcon" src="./JamieDavella.png" alt="avatar" />
          <p className="nodeTitle">{this.props.user}</p>
        </div>
        <div className="photoContainer">
          <img className="familyPhoto" src={this.props.photo} alt="user upload" />
          <div className="photoFooter">
            <img className="messageIcon" src="messageicon.png" alt="icon" />
          </div>
        </div>
      </div>
    );
  }
}

PhotoNode.propTypes = {
  photo: React.PropTypes.string.isRequired,
  user: React.PropTypes.string.isRequired,
};

export default PhotoNode;
