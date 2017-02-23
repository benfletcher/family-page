import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import { fetchMessages } from '../actions/messages';
import { fetchMembers } from '../actions/members';
import { fetchCurrentUser } from '../actions/current-user';

import MessageNode from './MessageNode';
import Header from './Header';
import CommentsContainer from './CommentsContainer';
import Announcement from './Announcement';
import CommentInput from './CommentInput';
import UserPhotoIcons from './UserPhotoIcons';

export class App extends Component {

  componentDidMount() {
    if (this.props.location.query.token) {
      cookie.save('accessToken', this.props.location.query.token);
    }
    this.props.dispatch(fetchMessages());
    this.props.dispatch(fetchMembers());
    this.props.dispatch(fetchCurrentUser());
  }

  render() {
    return (
      <div className="container">
        <Header />
        <UserPhotoIcons members={this.props.members} />
        <Announcement
          currentAvatar={this.props.currentAvatar}
          currentNickname={this.props.currentNickname}
        />

        {
          this.props.messages.map((message) => {
            const replyToName = message.userId in this.props.members
              ? this.props.members[message.userId].nickname
              : '...loading...';

            if ((message.comments.length === 0) && (message.userId === this.props.currentUser)) {
              return (
                <div>
                  <MessageNode
                    message={message}
                    currentUser={this.props.currentUser}
                    memberAvatar={
                    (message.userId in this.props.members)
                      ? this.props.members[message.userId].avatar
                      : null
                    }
                  />
                </div>
              );
            } else if (message.comments.length === 0) {
              return (
                <div key={message._id}>
                  <MessageNode
                    message={message}
                    currentUser={this.props.currentUser}
                    memberAvatar={
                      (message.userId in this.props.members)
                        ? this.props.members[message.userId].avatar
                        : null
                      }
                  />
                  <CommentInput
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
                  currentUser={this.props.currentUser}
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
              </div>
            );
          })
          }
      </div>
    );
  }
  }

App.defaultProps = {
};

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  location: React.PropTypes.object.isRequired,
  messages: React.PropTypes.array.isRequired,
  members: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.string.isRequired,
  currentAvatar: React.PropTypes.string.isRequired,
  currentNickname: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.currentUser.id,
  currentAvatar: state.currentUser.avatar,
  currentNickname: state.currentUser.name,
  messages: state.messages.messages,
  members: state.members.members,
  zoomed: state.status.zoomed,
});

export default connect(mapStateToProps)(App);
