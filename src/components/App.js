import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PhotoNode from './PhotoNode';
import Header from './Header';
import { fetchPhotos } from '../actions/photos';
import { fetchMembers } from '../actions/members';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPhotos());
    this.props.dispatch(fetchMembers());
  }

  render() {
    console.log('photos in app:', this.props.photos);

    return (
      <div className="container">
        <Header />
        <ul style={{ listStyle: 'none' }}>Family Members:
          {
            Object.keys(this.props.members).map(member => (
              <li
                key={this.props.members[member]._id} // eslint-disable-line no-underscore-dangle
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
          this.props.photos.map(photo =>
            <PhotoNode
              user={photo.userId}
              photo={photo.url}
              memberAvatar={this.props.members[photo.userId].avatar}
              key={photo._id} // eslint-disable-line no-underscore-dangle
            />
          )
        }
      </div>
    );
  }
}

App.defaultProps = {
  photos: [],
  members: {},
};

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  photos: React.PropTypes.arrayOf(React.PropTypes.object),
  members: React.PropTypes.objectOf(React.PropTypes.object),
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  members: state.members.members,
});

export default connect(mapStateToProps)(App);
