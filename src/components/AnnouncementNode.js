import React from 'react';

//


//


//


//


const AnnouncementNode = props => (
  <div className="node col-6">
    <div className="announcementTextNode inline">
      <img className="userIcon" src={props.memberAvatar} alt="avatar" />
      <p className="announcementTextNodeTitle">
        {props.caption}
      </p>
    </div>
    <div className="photoContainer">
      <div className="photoFooter">
        <img className="messageIcon" src="messageicon.png" alt="icon" />
      </div>
    </div>
  </div>
);


AnnouncementNode.defaultProps = {
  memberAvatar: './JamieDavella.png',
  caption: '(no caption)'
};

AnnouncementNode.propTypes = {
  memberAvatar: React.PropTypes.string,
  caption: React.PropTypes.string,
};

export default AnnouncementNode;
