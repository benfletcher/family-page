import React, { Component } from 'react';

// need to post a comment when reply button is clicked


class CommentNodeSimple extends Component {
  constructor(props) {
    super(props);

    this.postComment = this.postComment.bind(this);
  }

  postComment() {
    console.log('clicked message bubble ready to dispatch postComment');
    // this.props.dispatch(postComment());
  }

  render() {
    return (
      <div className="node col-6">
        <div className="photoHeader inline">
          <img className="userIcon" src={this.props.fromAvatar} alt="avatar" />
          <p className="nodeTitle">
            {this.props.comment.from}: {this.props.comment.text}
          </p>
        </div>
        <div className="photoFooter">
          <img
            className="messageIcon"
            src="messageicon.png"
            alt="icon"
            onClick={this.postComment}
          />
        </div>
      </div>
    );
  }
}


CommentNodeSimple.defaultProps = {
  fromAvatar: './JamieDavella.png',
  comment: {
    text: 'default prop comment',
    to: 'Lauryn',
    from: 'Jamie'
  },
  loggedInUser: 'Jamie'
};

CommentNodeSimple.propTypes = {
  comment: React.PropTypes.obj,
  // loggedInUser: React.PropTypes.string,
  fromAvatar: React.PropTypes.string,
};

export default CommentNodeSimple;
