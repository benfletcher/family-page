import React from 'react';
import CommentNode from './CommentNode';
import CommentInput from './CommentInput';

const CommentsContainer = (props) => {
    // if the current user is the sender of message then Complex comments
      // where back and forth comments with input field at the end of that subConvo

    // sentTo = [Lauryn, Matt, Dad, Mom, Tara, UncleJoe, AuntCathy]
    // map over each person in sentTo
    // comments array filter(personName)
    // each comment = filtered array
  if (props.message.userId === props.currentUser) {
    let sentTo = [];
    props.message.comments.map((comment) => {
      if (comment.from !== props.currentUser) {
        sentTo.push(comment.from);
      }
    });
    sentTo = sentTo.filter((elem, i, array) => array.indexOf(elem) === i);
    // console.log(sentTo);

    const segment = {};
    sentTo.map((sender) => {
      // console.log('sender ', sender);
      segment[sender] = props.message.comments.filter((comment) => {
        if (comment.to === sender || comment.from === sender) {
          return true;
        }
      });
    });
    // console.log('segment ', segment);
    // now have an object with key of userId and array of comments by that user as value
    // this object has all the comments of the message
    const eachSegment = Object.values(segment);
    console.log(eachSegment);
    // gives you an array of arrays
  }

  const eachComment = props.message.comments.map(comment => (
    <CommentNode
      comment={comment}
      messageId={props.message._id}
      from={
            comment.from in props.members
              ? props.members[comment.from].nickname
              : '...loading...'
          }
      fromAvatar={
            (comment.from in props.members)
              ? props.members[comment.from].avatar
              : null
          }
      key={comment._id}
    />
    ));

  const replyToName = props.message.userId in props.members
      ? props.members[props.message.userId].nickname
      : '...loading...';

  return (
    <div className="container">
      {eachComment}
      <CommentInput
        currentAvatar={props.currentAvatar}
        messageId={props.message._id}
        to={props.message.userId}
        replyToName={replyToName}
      />
    </div>
  );
};

CommentsContainer.defaultProps = {
  members: {},
  currentAvatar: 'http://cdn.patch.com/assets/layout/contribute/user-default.png'
};

CommentsContainer.propTypes = {
  members: React.PropTypes.objectOf(React.PropTypes.object),
  message: React.PropTypes.object.isRequired, // eslint-disable-line
  currentUser: React.PropTypes.string.isRequired,
  currentAvatar: React.PropTypes.string,
};

export default CommentsContainer;
