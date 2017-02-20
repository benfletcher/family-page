import React from 'react';
import CommentNode from './CommentNode';
import CommentInput from './CommentInput';

const CommentsContainer = (props) => {
  const commentBuckets = {
  };

  props.message.comments.forEach((comment) => {
    // console.log(props.currentUser);
    if (comment.from === props.currentUser) {
      if (!commentBuckets[comment.to]) { commentBuckets[comment.to] = []; }
      commentBuckets[comment.to].push(<div>{comment.text}</div>);
    }

    if (!commentBuckets[comment.from]) { commentBuckets[comment.from] = []; }
    commentBuckets[comment.from].push(<div>{comment.text}</div>);
  });

  const CommentsThread = p => (
    <div>
      {p.children}
      <input type="text" />
    </div>
    );
  const xyz = [];

  for (const key in commentBuckets) {
    xyz.push(<CommentsThread>
      {commentBuckets[key]}
    </CommentsThread>
  );
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
