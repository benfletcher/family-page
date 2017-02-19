import React, { Component } from 'react';
import { connect } from 'react-redux'

class CommentInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.textInputChange = this.textInputChange.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  textInputChange(event) {
    this.setState({ text: event.target.value });
  }

  postComment() {
    this.props.dispatch(postComment({
      messageId: this.props.messageId,
      to: this.props.to,
      text: this.state.text,
    }));
    this.setState({ showInput: true });
  }

  render() {
    return (
            <div className="commentInputParent">
              <div className="commentInputContainer">
                <img
                  src={this.props.currentAvatar}
                  alt="avatar"
                  className="userIcon"
                />
                <input
                  onChange={this.textInputChange}
                  type="text"
                  placeholder={`Reply to ${this.props.replyTo}`}
                  className="commentBox"
                />
                <p
                  className="commentSubmit"
                  onClick={this.postComment}
                >
                submit
                </p>
              </div>
            </div>
)}

export default CommentInput;
