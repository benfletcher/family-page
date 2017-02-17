import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../actions/messages';

// need to post a comment when reply button is clicked


// when user clicks on message bubble, screen blacks out similar to zoomedView
// then user see an input box with a submit button and an X at the corner to exit.
// when user submits, exits out of box.

// when button is clicked action is dispatched which sets showCommentAdd to true.
// true will display the input box in a ternary
// need userID, and specific message Id to then dispatch action to DB.

class CommentNodeSimple extends Component {
  constructor(props) {
    super(props);

    this.postComment = this.postComment.bind(this);
  }

  postComment() {
    this.props.dispatch(postComment({ from: 'Alex', to: 'Jamie', text: this.commentText.value, userId: 'Alex', messageId: this.props.messageId }));
    this.commentText.value = '';
  }

  render() {
    return (
      <div className="commentParent">
        <div className="commentContainer">
          <div className="commentTextContainer">
            <p className="commentText">
              {this.props.comment.from}: {this.props.comment.text}
            </p>
          </div>
          <img
            onClick={this.postComment}
            src={this.props.fromAvatar}
            alt="avatar"
            className="userIcon"
            style={{ maxWidth: '50px' }}
          />
          <div className="commentInput">
            <input ref={input => this.commentText = input}type="text" className="commentBox" />
            <p onClick={this.postComment}>submit</p>
          </div>
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
  dispatch: React.PropTypes.func.isRequired,
  // loggedInUser: React.PropTypes.string,
  fromAvatar: React.PropTypes.string,
};

export default connect()(CommentNodeSimple);
