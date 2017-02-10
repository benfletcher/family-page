import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class PhotoNode extends Component {
  render() {
    return (
      <div className="node col-6">
        <div className="photoHeader inline">
          <img className="userIcon" src={this.props.memberAvatar} alt="avatar" />
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

PhotoNode.defaultProps = {
  memberAvatar: './JamieDavella.png'
};

PhotoNode.propTypes = {
  photo: React.PropTypes.string.isRequired,
  user: React.PropTypes.string.isRequired,
  memberAvatar: React.PropTypes.string,
};

export default PhotoNode;
