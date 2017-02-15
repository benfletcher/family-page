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
        <form className="announcementForm" onSubmit={this.announcementSubmit}>
          <input
            type="text"
            placeholder="make an announcement"
            value={this.state.text}
            onChange={this.textInputChange}
          />
          <button type="submit">Post</button>
        </form>
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
