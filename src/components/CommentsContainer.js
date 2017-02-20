import React from 'react';
import CommentNode from './CommentNode';
import CommentInput from './CommentInput';

const CommentsContainer = (props) => {
    // if the current user is the sender of message then Complex comments
      // where back and forth comments with input field at the end of that subConvo
    // if (this.props.currentUser === this.props.message.userId) {
    //
    // }
    // else simple Comments where one to one and do not need input field
  const eachComment = props.message.comments.map(comment => (
    <CommentNode
      comment={comment}
      messageId={props.message._id}
      from={
            comment.from in props.members
              ? props.members[comment.from].nickname
              : '...loading...'
          }
      fromAvatar={
            (comment.from in props.members)
              ? props.members[comment.from].avatar
              : null
          }
      key={comment._id}
    />
    ));

  const replyToName = props.message.userId in props.members
      ? props.members[props.message.userId].nickname
      : '...loading...';

  return (
    <div className="container">
      {eachComment}
      <CommentInput
        currentAvatar={props.currentAvatar}
        messageId={props.message._id}
        to={props.message.userId}
        replyToName={replyToName}
      />
    </div>
  );
};

CommentsContainer.defaultProps = {
  members: {},
  currentAvatar: 'http://cdn.patch.com/assets/layout/contribute/user-default.png'
};

CommentsContainer.propTypes = {
  members: React.PropTypes.objectOf(React.PropTypes.object),
  message: React.PropTypes.object.isRequired, // eslint-disable-line
  currentUser: React.PropTypes.string.isRequired,
  currentAvatar: React.PropTypes.string,
};

export default CommentsContainer;
