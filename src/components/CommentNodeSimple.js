import React, { Component } from 'react';

// will need to do some logic to determine indentation when user replys to a comment
// need to post a comment when reply button is clicked


class CommentNodeSimple extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="node col-6">
        <div className="photoHeader inline">
          <img className="userIcon" src={props.fromAvatar} alt="avatar" />
          <p className="nodeTitle">
            {props.comment.from}: {props.comment.text}
          </p>
        </div>
        <div className="photoFooter">
          <img className="messageIcon" src="messageicon.png" alt="icon" onClick={postComment} />
        </div>
      </div>
    );
  }
}


CommentNodeSimple.defaultProps = {
  fromAvatar: './JamieDavella.png',
};

CommentNodeSimple.propTypes = {
  comment: React.PropTypes.obj.isRequired,
  loggedInUser: React.PropTypes.string.isRequired,
  fromAvatar: React.PropTypes.string,
};

export default CommentNodeSimple;
