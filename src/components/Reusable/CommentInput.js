import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../../actions/messages';

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
    this.setState({ text: '' });
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
            placeholder={`Reply to ${this.props.replyToName}`}
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
