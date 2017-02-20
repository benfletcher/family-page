import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMessages } from '../actions/messages';
import { fetchMembers } from '../actions/members';

import MessageNode from './MessageNode';
import Header from './Header';
import CommentsContainer from './CommentsContainer';
import Announcement from './Announcement';
import MessageFooter from './MessageFooter';

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

        <Announcement
          currentAvatar={this.props.currentAvatar}
          currentNickname={this.props.currentNickname}
        />

        {
          this.props.messages.map((message) => {
            const replyToName = message.userId in this.props.members
              ? this.props.members[message.userId].nickname
              : '...loading...';

            if (message.comments.length === 0) {
              return (
                <div key={message._id}>
                  <MessageNode
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
                  <MessageFooter
                    currentAvatar={this.props.currentAvatar}
                    messageId={message._id}
                    to={message.userId}
                    replyToName={replyToName}
                  />
                </div>
              );
            }
            return (
              <div key={message._id}>
                <MessageNode
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
                  currentAvatar={this.props.currentAvatar}
                  currentUser={this.props.currentUser}
                  members={this.props.members}
                />

                <MessageFooter
                  currentAvatar={this.props.currentAvatar}
                  messageId={message._id}
                  to={message.userId}
                  replyToName={replyToName}
                />
              </div>
            );
          })
          }
      </div>
    );
  }
  }

App.defaultProps = {
  messages: [{}],
  members: {},
  currentUser: null,
  currentAvatar: null,
  currentNickname: null,
};

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  members: React.PropTypes.objectOf(React.PropTypes.object),
  currentUser: React.PropTypes.string,
  currentAvatar: React.PropTypes.string,
  currentNickname: React.PropTypes.string,
};

const mapStateToProps = state => ({
  currentUser: state.messages.currentUser,
  currentAvatar: state.messages.currentAvatar,
  currentNickname: state.messages.currentNickname,
  messages: state.messages.messages,
  members: state.members.members,
  zoomed: state.status.zoomed,
});

export default connect(mapStateToProps)(App);
