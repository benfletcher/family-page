import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhotoNode from './PhotoNode';
import Header from './Header';
import CommentsContainer from './CommentsContainer';
import { fetchMessages } from '../actions/messages';
import { fetchMembers } from '../actions/members';
import UploadAnnouncement from './UploadAnnouncement';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: ''
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchMessages());
    this.props.dispatch(fetchMembers());
  }

  render() {
    // need to add logic
      // if that message has no comments then don't include CommentsContainer in return
        // instead return messageReplyFooter
    // pass down:
    const currentUserAvatar = this.props.currentUser in this.props.members
      ? this.props.members[this.props.currentUser].avatar
      : '';

    const currentUserName = this.props.currentUser in this.props.members
      ? this.props.members[this.props.currentUser].nickname
      : '';

    return (
      <div className="container">
        <Header />
        <ul className="userPhotoIcon" style={{ listStyle: 'none' }}>
          {
            Object.keys(this.props.members).map(member => (
              <li
                key={this.props.members[member]._id}
              >
                <img
                  src={this.props.members[member].avatar}
                  alt="avatar"
                  style={{ maxWidth: '50px', borderRadius: '50%' }}
                />
              </li>
            ))
          }
        </ul>

        <UploadAnnouncement
          currentUserAvatar={currentUserAvatar}
          currentUserName={currentUserName}
        />
        {
          this.props.messages.map(message =>
          (
            <div key={message._id}>
              <PhotoNode
                message={message}
                commentZoom={this.postComment}
                user={message.userId}
                photo={message.url}
                caption={message.text}
                memberAvatar={
                (message.userId in this.props.members)
                  ? this.props.members[message.userId].avatar
                  : null
                }
              />
              <CommentsContainer
                message={message}
                currentUserAvatar={currentUserAvatar}
              />
            </div>
          )
          )
        }
      </div>
    );
  }
}

App.defaultProps = {
  messages: [],
  members: {},
  currentUser: null,
};

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  members: React.PropTypes.objectOf(React.PropTypes.object),
  currentUser: React.PropTypes.string,
};

const mapStateToProps = state => ({
  currentUser: state.messages.currentUser,
  messages: state.messages.messages,
  members: state.members.members,
  zoomed: state.status.zoomed,
});

export default connect(mapStateToProps)(App);
