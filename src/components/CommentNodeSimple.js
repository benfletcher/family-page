import React, { Component } from 'react';
import { connect } from 'react-redux';


class CommentNodeSimple extends Component {

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
            src={this.props.fromAvatar}
            alt="avatar"
            className="userIcon"
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
