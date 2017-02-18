import React from 'react';

const CommentNode = props => (
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
        className="userIcon"
      />
    </div>
  </div>
    );


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
};

export default CommentNode;
