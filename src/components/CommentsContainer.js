import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentNodeComplex from './CommentNodeComplex';
import CommentNodeSimple from './CommentNodeSimple';
// pass in message object either from app.js or PhotoNode.js
// PhotoNode.js is a dumb component. Is it bad to pass down props 2 levels

class CommentsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // assume I have access to the one message object passed down as props
    const loggedInUser = this.props.loggedInUser;

    const eachComment = props.message.comments.map((comment) => {
      // determine if the logged in user should see this comment
      if ((loggedInUser === comment.to) || (loggedInUser === comment.from)) {
        // determine if logged in user is the sender of the message in which
        // case we will render the complex comment node interface
        if (loggedInUser === props.message.userId) {
          return (
            <CommentNodeComplex
              loggedInUser={loggedInUser}
              comment={comment}
              fromAvatar={
                (props.message.userId in this.props.members)
                  ? this.props.members[props.message.userId].avatar
                  : null
              }
              key={comment._id}
            />
          );
        }
        return (
          <CommentNodeSimple
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
