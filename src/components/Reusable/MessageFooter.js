import React from 'react';

const MessageFooter = () => (
  <div className="node col-6" style={{ paddingTop: '0px' }}>
    <div className="photoFooter">
      <i
        className="messageIcon fa fa-comment-o"
        aria-hidden="true"
      />
    </div>
  </div>
);

MessageFooter.defaultProps = {
};

MessageFooter.propTypes = {
};

export default MessageFooter;
