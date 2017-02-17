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

    const eachComment = this.props.message.comments.map(comment =>
        // determine if logged in user is the sender of the message in which
        // case we will render the complex comment node interface
      // if (loggedInUser === this.props.message.userId) {
      //   return (
      //     <CommentNodeComplex
      //       loggedInUser={loggedInUser}
      //       comment={comment}
      //       fromAvatar={
      //           (this.props.message.userId in this.props.members)
      //             ? this.props.members[this.props.message.userId].avatar
      //             : null
      //         }
      //       key={comment._id}
      //     />
      //   );
      // }
       (
         <CommentNodeSimple
           loggedInUser={loggedInUser}
           comment={comment}
           fromAvatar={
                (this.props.message.userId in this.props.members)
                  ? this.props.members[this.props.message.userId].avatar
                  : null
              }
           key={comment._id}
         />
      ));

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
  message: React.PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  members: state.members.members,
  loggedInUser: state.status.userId,
});

export default connect(mapStateToProps)(CommentsContainer);
