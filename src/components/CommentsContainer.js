import React from 'react';
import CommentNode from './CommentNode';
import CommentsThread from './CommentsThread';


const CommentsContainer = (props) => {
  // create an object with a key of userId and value of an array of comments
    // where that userId is involved as either a to or from.
  const commentBuckets = {};
  props.message.comments.forEach((comment) => {
    if (comment.from === props.currentUser) {
      if (!commentBuckets[comment.to]) { commentBuckets[comment.to] = []; }
      commentBuckets[comment.to].push(
        <div key={comment._id}>
          <CommentNode
            comment={comment}
            messageId={props.message._id}
            currentUser={props.currentUser}
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
        </div>);
    } else {
      if (!commentBuckets[comment.from]) { commentBuckets[comment.from] = []; }
      commentBuckets[comment.from].push(
        <div key={comment._id}>
          <CommentNode
            comment={comment}
            messageId={props.message._id}
            currentUser={props.currentUser}
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
        </div>);
    }
  });

  // create an array of jsx objects so that we can render each comment
    // thread with an input field to reply to that user at the bottom of each thread
  const commentsThread = [];
  for (const key in commentBuckets) {
    if (commentBuckets.hasOwnProperty(key)) {
      commentsThread.push(
        <CommentsThread
          key={key}
          to={key}
          currentAvatar={props.currentAvatar}
          messageId={props.message._id}
          messageUserId={props.message.userId}
          members={props.members}
        >
          {commentBuckets[key]}
        </CommentsThread>
      );
    }
  }

  return (
    <div className="container">
      {commentsThread}
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
  currentUser: React.PropTypes.string.isRequired, // eslint-disable-line
  currentAvatar: React.PropTypes.string,
};

export default CommentsContainer;
