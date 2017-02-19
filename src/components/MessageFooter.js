import React, { Component } from 'react';
import CommentInput from './Reusable/CommentInput';

class MessageFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false
    };

    this.onClickShowInput = this.onClickShowInput.bind(this);
  }

  onClickShowInput() {
    this.setState({ showInput: true });
  }

  render() {
    return (
      <div>
        {
          this.state.showInput ?
            <CommentInput
              currentAvatar={this.props.currentAvatar}
              messageId={this.props.messageId}
              to={this.props.to}
              replyToName={this.props.replyToName}
            />
          : null
        }
        <div className="node col-6" style={{ paddingTop: '0px' }}>
          <div className="photoFooter">
            <i
              className="messageIcon fa fa-comment-o"
              aria-hidden="true"
              onClick={this.onClickShowInput}
            />
          </div>
        </div>
      </div>
    );
  }
}

MessageFooter.propTypes = {
  messageId: React.PropTypes.string.isRequired,
  to: React.PropTypes.string.isRequired,
  currentAvatar: React.PropTypes.string.isRequired,
  replyToName: React.PropTypes.string.isRequired,
};

export default MessageFooter;
