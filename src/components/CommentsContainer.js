import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentNode from './CommentNode';
import { postComment } from '../actions/messages';

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
    // if the current user is the sender of message then Complex comments
      // where back and forth comments with input field at the end of that subConvo

    // else simple Comments where one to one and do not need input field
    const eachComment = this.props.message.comments.map(comment => (
      <CommentNode
        comment={comment}
        messageId={this.props.message._id}
        from={
            comment.from in this.props.members
              ? this.props.members[comment.from].nickname
              : '...loading...'
          }
        fromAvatar={
            (comment.from in this.props.members)
              ? this.props.members[comment.from].avatar
              : null
          }
        key={comment._id}
      />
    ));

    const replyTo = this.props.message.userId in this.props.members
      ? this.props.members[this.props.message.userId].nickname
      : '...loading...';

    return (
      <div className="container">
        {eachComment}
        <div className="commentInputParent">
          <div className="commentInputContainer">
            <img
              src={this.props.currentAvatar}
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
  currentAvatar: 'http://cdn.patch.com/assets/layout/contribute/user-default.png'
};

CommentsContainer.propTypes = {
  members: React.PropTypes.objectOf(React.PropTypes.object),
  message: React.PropTypes.object.isRequired, // eslint-disable-line
  currentAvatar: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  members: state.members.members,
});

export default connect(mapStateToProps)(CommentsContainer);
