import React from 'react';

const PhotoNode = props => (
  <div className="node col-6">
    <div className="photoHeader inline">
      <img className="userIcon" src={props.memberAvatar} alt="avatar" />
      <p className="nodeTitle">
        {props.user}: {props.caption}
      </p>
    </div>
    <div className="photoContainer">
      <img className="familyPhoto" src={props.photo} alt="user upload" />
      <div className="photoFooter">
        <img className="messageIcon" src="messageicon.png" alt="icon" />
      </div>
    </div>
  </div>
);


PhotoNode.defaultProps = {
  memberAvatar: './JamieDavella.png',
  caption: '(no caption)'
};

PhotoNode.propTypes = {
  photo: React.PropTypes.string.isRequired,
  user: React.PropTypes.string.isRequired,
  memberAvatar: React.PropTypes.string,
  caption: React.PropTypes.string,
};

export default PhotoNode;
