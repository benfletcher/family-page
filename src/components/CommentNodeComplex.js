import React from 'react';

// will need to do some logic to determine indentation when user replys to a comment
// need to post a comment when reply button is clicked


const CommentNodeComplex = props => (
  <div className="node col-6">
    <div className="photoHeader inline">
      <img className="userIcon" src={props.fromAvatar} alt="avatar" />
      <p className="nodeTitle">
        {props.comment.from}: {props.comment.text}
      </p>
      <button>Reply</button>
    </div>
  </div>
);


CommentNodeComplex.defaultProps = {
  fromAvatar: './JamieDavella.png',
};

CommentNodeComplex.propTypes = {
  comment: React.PropTypes.obj.isRequired,
  loggedInUser: React.PropTypes.string.isRequired,
  fromAvatar: React.PropTypes.string,
};

export default CommentNodeComplex;
