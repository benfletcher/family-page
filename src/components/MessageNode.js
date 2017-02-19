import React from 'react';

const MessageNode = (props) => {
  let parentClass = '';
  let textClass = '';

  if (props.message.contentType === 'photo') {
    parentClass = 'photoHeader';
    textClass = 'nodeTitle';
  } else {
    parentClass = 'announcementTextNode';
    textClass = 'announcementTextNodeTitle';
  }

  return (
    <div className="node col-6">
      <div className={`${parentClass} inline`}>
        <img className="userIcon" src={props.memberAvatar} alt="avatar" />
        <p className={textClass}>
          {props.caption}
        </p>
      </div>
      <div className="photoContainer">
        {
          props.message.contentType === 'photo'
            ? <img className="familyPhoto" src={props.photo} alt="user upload" />
            : null
        }
      </div>
    </div>
  );
};


MessageNode.defaultProps = {
  memberAvatar: '',
  caption: '(no caption)',
  photo: null,
};

MessageNode.propTypes = {
  photo: React.PropTypes.string,
  memberAvatar: React.PropTypes.string,
  caption: React.PropTypes.string,
  message: React.PropTypes.object.isRequired, // eslint-disable-line
};

export default MessageNode;
