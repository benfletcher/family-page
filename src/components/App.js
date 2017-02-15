import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhotoNode from './PhotoNode';
import Header from './Header';
import CommentsContainer from './CommentsContainer';

import { fetchMessages } from '../actions/messages';
import { fetchMembers } from '../actions/members';

export class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchMessages());
    this.props.dispatch(fetchMembers());
  }

  render() {
    // need to add logic
    //  if message.contentType === photo want the photoNode to render
      // if that message has no comments then don't include CommentsContainer in return
        // instead return messageReplyFooter
      // else return photoNode with CommentsContainer
    // else if message.contentType === announcement want announcementNode to render
      // if that message has no comments then don't include CommentsContainer in return
    // else return announcementNode with CommentsContainer
    return (
      <div className="container">
        <Header />
        <ul className="userPhotoIcon" style={{ listStyle: 'none' }}>
          Family Members:
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
        {
          this.props.messages.map(message =>
            <PhotoNode
              user={message.userId}
              photo={message.url}
              caption={message.text}
              memberAvatar={
                (message.userId in this.props.members)
                  ? this.props.members[message.userId].avatar
                  : null
              }
              key={message._id}
            />
            <CommentsContainer
              message={message}
              key={message._id}
            />
          )
        }
      </div>
    );
  }
}

App.defaultProps = {
  messages: [],
  members: {},
};

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  members: React.PropTypes.objectOf(React.PropTypes.object),
};

const mapStateToProps = state => ({
  messages: state.messages.messages,
  members: state.members.members,
});

export default connect(mapStateToProps)(App);
