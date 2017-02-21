import React from 'react';

const CommentNode = (props) => {
  let commentPosition = '';

  if (props.comment.from === props.currentUser) {
    commentPosition = 'commentRight';
  } else {
    commentPosition = 'commentLeft';
  }
  return (
    <div className="commentParent">
      <div className="commentContainer">
        <div className="commentTextContainer">
          <p className="commentText">
            {props.from}: {props.comment.text}
          </p>
        </div>
        <img
          src={props.fromAvatar}
          alt="avatar"
          className={`userIcon ${commentPosition}`}
        />
      </div>
    </div>
  );
};

CommentNode.defaultProps = {
  fromAvatar: '',
  comment: {
    text: 'default prop comment',
    to: '',
    from: ''
  }
};

CommentNode.propTypes = {
  comment: React.PropTypes.object,
  fromAvatar: React.PropTypes.string,
  from: React.PropTypes.string.isRequired,
  currentUser: React.PropTypes.string.isRequired,
};

export default CommentNode;
