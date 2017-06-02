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
          <div className="announcementAvatar">
            <img
              alt="avatar"
              className="avatarPhoto"
              src={this.props.currentAvatar}
            />
          </div>
          <div className="announcementInputBox">
            <form onSubmit={this.announcementSubmit}>
              <input
                className="announcementInput"
                placeholder={`${this.props.currentNickname}, say hi to the family`}
                value={this.state.text}
                onChange={this.textInputChange}
                onSubmit={this.announcementSubmit}
                type="text"
              />
            </form>
          </div>
          <div className="announcementFooter">
            <div className="announcementBlueLine" />
            <p
              onClick={this.announcementSubmit}
              className="announcementPost"
              style={{
                visibility: (this.state.text.length)
                  ? 'visible'
                  : 'hidden'
              }}
            >
              Post{'\u00A0' /* non-breaking space unicode */}
              <i className="fa fa-bullhorn announcementPostIcon" aria-hidden="true" />
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
};

Announcement.propTypes = {
  currentNickname: React.PropTypes.string,
  currentAvatar: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  members: state.family.members,
});

export default connect(mapStateToProps)(Announcement);
