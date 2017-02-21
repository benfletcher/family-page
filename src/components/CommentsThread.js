import React from 'react';
import CommentInput from './CommentInput';

const CommentsThread = (props) => {
  const replyToName = props.to in props.members
  ? props.members[props.to].nickname
  : '...loading...';

  return (
    <div>
      {props.children}
      <CommentInput
        currentAvatar={props.currentAvatar}
        messageId={props.messageId}
        to={props.to}
        replyToName={replyToName}
      />
    </div>
  );
};

CommentsThread.defaultProps = {
  children: null,
  members: {},
  currentAvatar: 'http://cdn.patch.com/assets/layout/contribute/user-default.png'
};

CommentsThread.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.object),
  members: React.PropTypes.objectOf(React.PropTypes.object),
  messageId: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  currentAvatar: React.PropTypes.string,
};

export default CommentsThread;
