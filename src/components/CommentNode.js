import React from 'react';

const CommentNode = (props) => {
  let commentPosition = '';
  let replyTextPosition = '';


  if (props.comment.from === props.currentUser) {
    commentPosition = 'commentRight';
    replyTextPosition = 'commentTextContainer';
  } else {
    commentPosition = 'commentLeft';
    replyTextPosition = 'replyCommentTextContainer';
  }
  return (
    <div className="commentParent">
      <div className="commentContainer">
        <div className={`${replyTextPosition}`}>
          <p>
            <span className="bold">{props.from}</span>: {props.comment.text}
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
