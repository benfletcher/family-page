import React from 'react';
import CommentNode from './CommentNode';
import CommentInput from './CommentInput';

const CommentsContainer = (props) => {
  if (props.message.userId === props.currentUser) {
    let sentTo = [];
    props.message.comments.map((comment) => {
      if (comment.from !== props.currentUser) {
        sentTo.push(comment.from);
      }
    });
    sentTo = sentTo.filter((elem, i, array) => array.indexOf(elem) === i);

    const segment = {};
    sentTo.map((sender) => {
      segment[sender] = props.message.comments.filter((comment) => {
        if (comment.to === sender || comment.from === sender) {
          return true;
        }
      });
    });
    console.log('segment ', segment);
    // now have an object with key of sender's userId and array of comments with that user as value
    // this object has all the comments of the message

    const eachComment = ((segment) => {
      // console.log('segment inside eachComment', segment);
      for (const key in segment) {
        // console.log('segment key/value inside eachComment for loop', key, segment[key]);
        if (segment.hasOwnProperty(key)) {
          const commentSegment = segment[key];
          if (commentSegment.length > 0) {
            const eachSegment = commentSegment.map(comment =>
              // console.log('comment inside eachComment', comment);
               (
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
            const replyToName = key in props.members
            ? props.members[props.message.userId].nickname
            : '...loading...';

            console.log('this is eachSegment after map', eachSegment);
            return (
              <div className="container">
                {eachSegment}
                <CommentInput
                  currentAvatar={props.currentAvatar}
                  messageId={props.message._id}
                  to={key}
                  replyToName={replyToName}
                />
              </div>
            );
          }
        }
      }
    });
    eachComment(segment);
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

  console.log('this is eachComment for simple comment', eachComment);
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
