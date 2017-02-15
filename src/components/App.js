import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhotoNode from './PhotoNode';
import Header from './Header';


import { fetchMessages } from '../actions/messages';
import { fetchMembers } from '../actions/members';
import UploadAnnouncement from './UploadAnnouncement';

export class App extends Component {

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
        <UploadAnnouncement />
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
