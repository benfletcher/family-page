import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentNodeSimple from './CommentNodeSimple';
import { postComment } from '../actions/messages';
// pass in message object either from app.js or PhotoNode.js
// PhotoNode.js is a dumb component. Is it bad to pass down props 2 levels

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
    this.postComment = this.postComment.bind(this);
  }

  postComment() {
    this.props.dispatch(postComment({
      messageId: this.props.message._id,
      to: this.props.message.userId,
      text: this.commentText.value,
    }));
    this.commentText.value = '';
  }

  render() {
    const loggedInUser = this.props.loggedInUser;

    console.log(this.props.loggedInAvatar);
    const eachComment = this.props.message.comments.map(comment => (
      <CommentNodeSimple
        loggedInUser={loggedInUser}
        comment={comment}
        messageId={this.props.message._id}
        from={
            comment.from in this.props.members
              ? this.props.members[comment.from].nickname
              : '...loading...'
          }
        fromAvatar={
            (this.props.message.userId in this.props.members)
              ? this.props.members[this.props.message.userId].avatar
              : null
          }
        key={comment._id}
      />
    ));

    const replyTo = this.props.message.userId in this.props.members
      ? this.props.members[this.props.message.userId].nickname
      : '...loading...';

    const avatar = this.props.message.currentUser in this.props.members
      ? this.props.members[this.props.message.currentUser].avatar
      : './JamieDavella.png';

    return (
      <div className="container">
        {eachComment}
        <div className="commentInputParent">
          <div className="commentInputContainer">
            <img
              src={this.props.loggedInAvatar}
              alt="avatar"
              className="userIcon"
            />
            <input
              ref={input => this.commentText = input}
              type="text"
              placeholder={`Reply to ${replyTo}`}
              className="commentBox"
            />
            <p className="commentSubmit" onClick={this.postComment}>submit</p>
          </div>
        </div>
      </div>
    );
  }
}

CommentsContainer.defaultProps = {
  members: {},
  loggedInAvatar: 'http://cdn.patch.com/assets/layout/contribute/user-default.png',
};

CommentsContainer.propTypes = {
  members: React.PropTypes.objectOf(React.PropTypes.object),
  loggedInUser: React.PropTypes.string.isRequired,
  message: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  members: state.members.members,
  loggedInUser: state.status.userId,
  loggedInAvatar: state.messages.currentAvatar,
  loggedNickname: state.messages.currentNickname,
});

export default connect(mapStateToProps)(CommentsContainer);
