import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage } from '../actions/messages';


class Announcement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.announcementSubmit = this.announcementSubmit.bind(this);
    this.textInputChange = this.textInputChange.bind(this);
  }

  announcementSubmit(event) {
    event.preventDefault();
    if (this.state.text) {
      this.props.dispatch(postMessage({
        contentType: 'announcement',
        text: this.state.text
      }));
      this.setState({ text: '' });
    } else if (!this.state.text) {
      alert('Can not post blank Announcement field'); // eslint-disable-line
    }
  }


  textInputChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div className="announcementParent">
        <div className="announcementContainer">
          <div className="announcementHeader" />
          <div className="avatarDiv">
            <img
              alt="avatar"
              className="avatarPhoto"
              src={this.props.currentAvatar}
            />
          </div>
          <div className="announcementInputBox">
            <input
              className="announcementInput"
              placeholder={`${this.props.currentNickname}, what's on your mind`}
              value={this.state.text}
              onChange={this.textInputChange}
              type="text"
            />
          </div>
          <div className="announcementFooter">
            <div className="announcementBlueLine" />
            <p
              onClick={this.announcementSubmit}
              className="announcementPost"
            >
             Post
             <i className="fa fa-bullhorn postIcon" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Announcement.defaultProps = {
  currentNickname: null,
  currentAvatar: '',
  members: {}
};

Announcement.propTypes = {
  currentNickname: React.PropTypes.string,
  currentAvatar: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.currentUser.id,
  members: state.members.members,
});

export default connect(mapStateToProps)(Announcement);
