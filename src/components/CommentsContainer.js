import React from 'react';
import CommentNode from './CommentNode';
import CommentsThread from './CommentsThread';


const CommentsContainer = (props) => {
  // create an object with a key of userId and value of an array of comments
  // where that userId is involved as either a to or from.
  const commentBuckets = {};
  props.message.comments.forEach((comment) => {
    if (comment.from === props.currentUser) {
      if (!commentBuckets[comment.to]) {
        commentBuckets[comment.to] = [];
      }
      commentBuckets[comment.to].push(
        <div key={comment._id}>
          <CommentNode
            comment={comment}
            messageId={props.message._id}
            currentUser={props.currentUser}
            currentFamily={props.currentFamily}
            from={comment.from in props.members
              ? props.members[comment.from].nickname
              : '...loading...'
            }
            fromAvatar={(comment.from in props.members)
              ? props.members[comment.from].avatar
              : null
            }
            key={comment._id}
          />
        </div>
      );
    } else {
      if (!commentBuckets[comment.from]) {
        commentBuckets[comment.from] = [];
      }
      commentBuckets[comment.from].push(
        <div key={comment._id}>
          <CommentNode
            comment={comment}
            messageId={props.message._id}
            currentUser={props.currentUser}
            currentFamily={props.currentFamily}
            from={comment.from in props.members
              ? props.members[comment.from].nickname
              : '...loading...'
            }
            fromAvatar={(comment.from in props.members)
              ? props.members[comment.from].avatar
              : null
            }
            key={comment._id}
          />
        </div>
      );
    }
  });

  return (
    <div className="container">
      {
        Object.keys(commentBuckets).map(key =>
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
        )
      }
    </div>
  );
};

CommentsContainer.defaultProps = {
  members: {},
};

CommentsContainer.propTypes = {
  members: React.PropTypes.object,
  message: React.PropTypes.object.isRequired,
};

export default CommentsContainer;
