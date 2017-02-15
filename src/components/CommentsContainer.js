import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentNode from './CommentNode';
// pass in message object either from app.js or PhotoNode.js
// PhotoNode.js is a dumb component. Is it bad to pass down props 2 levels

export class CommentsContainer extends Component {

  render() {
    // assume I have access to the one message object passed down as props
    const loggedInUser = this.props.loggedInUser;

    const eachComment = props.message.comments.map((comment) => {
      if ((loggedInUser === comment.to) || (loggedInUser === comment.from)) {
        return (
          <CommentNode
            loggedInUser={loggedInUser}
            comment={comment}
            fromAvatar={
              (props.message.userId in this.props.members)
                ? this.props.members[message.userId].avatar
                : null
            }
            key={comment._id}
          />
        );
      }
    });
    return (
      <div className="container">
        {eachComment}
      </div>
    );
  }
}

CommentsContainer.defaultProps = {
  members: {},
};

CommentsContainer.propTypes = {
  members: React.PropTypes.objectOf(React.PropTypes.object),
  loggedInUser: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  members: state.members.members,
  loggedInUser: state.status.userId,
});

export default connect(mapStateToProps)(CommentsContainer);
