import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage } from '../actions/messages';


class UploadAnnouncement extends Component {
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
        userId: this.props.userId,
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
              src={this.props.userPhoto}
            />
          </div>
          <div className="announcementInputBox">
            <input
              className="announcementInput"
              placeholder="ihold places..."
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
             </p>
          </div>
        </div>
      </div>
    );
  }
}

UploadAnnouncement.propTypes = {
  userId: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.status.userId
});

export default connect(mapStateToProps)(UploadAnnouncement);
