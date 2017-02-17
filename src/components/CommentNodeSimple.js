import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../actions/messages';

// need to post a comment when reply button is clicked


class CommentNodeSimple extends Component {
  constructor(props) {
    super(props);

    this.postComment = this.postComment.bind(this);
  }

  postComment() {
    this.props.dispatch(postComment({ from: 'Alex', to: 'Jamie', text: 'hi', userId: 'Alex', messageId: 2 }));
    console.log('clicked message bubble ready to dispatch postComment');
    // this.props.dispatch(postComment());
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
