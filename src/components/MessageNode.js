import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMessage } from '../actions/messages';

class MessageNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parentClass: (this.props.message.contentType === 'photo')
        ? 'photoHeader'
        : 'announcementTextNode',
      textClass: (this.props.message.contentType === 'photo')
        ? 'nodeTitle'
        : 'announcementTextNodeTitle',
    };

    this.deleteMessage = this.deleteMessage.bind(this);
  }

  deleteMessage() {
    this.props.dispatch(deleteMessage(this.props.message._id));
  }

  render() {
    return (
      <div className="node col-6">
        <div className={`${this.state.parentClass} inline`}>
          <img className="userIcon" src={this.props.memberAvatar} alt="avatar" />
          {
            this.props.message.contentType === 'announcement'
              ?
                <div className="deleteAnnouncement" >
                  {(this.props.message.userId === this.props.currentUser)
                  ?
                    <i
                      onClick={this.deleteMessage}
                      className="fa fa-trash-o deleteIcon"
                      aria-hidden="true"
                    />
                : null
              }
                </div>
            : null
          }
          <p className={this.state.textClass}>
            {this.props.message.text}
          </p>
        </div>
        <div className="photoContainer">
          {
            this.props.message.contentType === 'photo'
              ?
                <div>
                  <div className="deletePhoto" >
                    {
                      (this.props.message.userId === this.props.currentUser)
                        ?
                          <i
                            onClick={this.deleteMessage}
                            className="fa fa-trash-o deleteIcon"
                            aria-hidden="true"
                          />
                        : null
                    }
                  </div>
                  <img className="familyPhoto" src={this.props.message.url} alt="user upload" />
                </div>
              : null
          }
        </div>
      </div>
    );
  }
}


MessageNode.defaultProps = {
  memberAvatar: '',
};

MessageNode.propTypes = {
  currentUser: React.PropTypes.string.isRequired,
  memberAvatar: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
  message: React.PropTypes.object.isRequired, // eslint-disable-line
};

export default connect()(MessageNode);
