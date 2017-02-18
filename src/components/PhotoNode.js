import React from 'react';

const PhotoNode = (props) => {
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
        <div className="photoFooter">
          <i
            onClick={props.commentZoom}
            className="messageIcon fa fa-comment-o"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};


PhotoNode.defaultProps = {
  memberAvatar: '',
  caption: '(no caption)',
  photo: null,
};

PhotoNode.propTypes = {
  photo: React.PropTypes.string,
  memberAvatar: React.PropTypes.string,
  caption: React.PropTypes.string,
  message: React.PropTypes.object.isRequired, // eslint-disable-line
};

export default PhotoNode;
