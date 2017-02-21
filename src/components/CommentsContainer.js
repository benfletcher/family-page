import React from 'react';
import CommentNode from './CommentNode';
import CommentInput from './CommentInput';

const CommentsContainer = (props) => {
  const commentBuckets = {};

  props.message.comments.forEach((comment) => {
    // console.log(props.currentUser);
    if (comment.from === props.currentUser) {
      if (!commentBuckets[comment.to]) { commentBuckets[comment.to] = []; }
      commentBuckets[comment.to].push(
        <div>
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
        </div>);
    } else {
      if (!commentBuckets[comment.from]) { commentBuckets[comment.from] = []; }
      commentBuckets[comment.from].push(<div>
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
      </div>);
    }
  });

  const CommentsThread = (p) => {
    const replyToName = p.to in p.members
    ? p.members[p.to].nickname
    : '...loading...';

    console.log('this is props.children inside commentsThread', p.children);
    return (
      <div>
        {p.children}
        <CommentInput
          currentAvatar={p.currentAvatar}
          messageId={p.messageId}
          to={p.to}
          replyToName={replyToName}
        />
      </div>
    );
  };

  const xyz = [];
  for (const key in commentBuckets) {
    if (commentBuckets.hasOwnProperty(key)) {
      xyz.push(
        <CommentsThread
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

  console.log('final buckets', commentBuckets);

  return (
    <div className="container">
      {xyz}
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
