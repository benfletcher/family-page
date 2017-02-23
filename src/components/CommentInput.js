import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../actions/messages';

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

  postComment(e) {
    e.preventDefault();
    if (this.state.text.length) {
      this.props.dispatch(postComment({
        messageId: this.props.messageId,
        to: this.props.to,
        text: this.state.text,
      }));
      this.setState({ text: '' });
    }
  }

  render() {
    return (
      <div className="commentInputParent">
        <div className="commentInputContainer">
          <hr className="inputHr" />
          <img
            src={this.props.currentAvatar}
            alt="avatar"
            className="userIcon"
          />
          <form
            className="commentInputForm"
            onSubmit={this.postComment}
          >
            <input
              onChange={this.textInputChange}
              type="text"
              value={this.state.text}
              placeholder={`Reply to ${this.props.replyToName}...`}
              className="commentBox"
            />
          </form>
          <p
            className="commentSubmit"
            onClick={this.postComment}
            style={{
              visibility: (this.state.text.length)
                ? 'visible'
                : 'hidden'
            }}
          >
            submit
            <i className="fa fa-share-square-o submitIcon" aria-hidden="true" />
          </p>
        </div>
      </div>
    );
  }
}

CommentInput.defaultProps = {
  currentAvatar: ''
};

CommentInput.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  messageId: React.PropTypes.string.isRequired,
  replyToName: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  currentAvatar: React.PropTypes.string,
};

export default connect()(CommentInput);
