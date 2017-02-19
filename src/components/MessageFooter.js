import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment } from '../actions/messages';

class MessageFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      showInput: false
    };

    this.onClickShowInput = this.onClickShowInput.bind(this);
    this.textInputChange = this.textInputChange.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  onClickShowInput() {
    this.setState({ showInput: true });
  }

  textInputChange(event) {
    this.setState({ text: event.target.value });
  }

  postComment() {
    this.props.dispatch(postComment({
      messageId: this.props.messageId,
      to: this.props.to,
      text: this.state.text,
    }));
    this.setState({ showInput: true });
  }

  render() {
    return (
      <div>
        {
          this.state.showInput ?
            <div className="commentInputParent">
              <div className="commentInputContainer">
                <img
                  src={this.props.currentAvatar}
                  alt="avatar"
                  className="userIcon"
                />
                <input
                  onChange={this.textInputChange}
                  type="text"
                  placeholder={`Reply to ${this.props.replyTo}`}
                  className="commentBox"
                />
                <p
                  className="commentSubmit"
                  onClick={this.postComment}
                >
                submit
                </p>

              </div>
            </div>
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


MessageFooter.defaultProps = {
};

MessageFooter.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(MessageFooter);
