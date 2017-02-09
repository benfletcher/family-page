import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import PhotoNode from './PhotoNode';
import Header from './Header';
import * as actions from '../actions';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.fetchStatus());
    this.props.dispatch(actions.fetchPhotos());
  }

  render() {
    console.log('photos in app:', this.props.photos);

    return (
      <div className="container">
        <Header />
        {
          this.props.photos.map(photo =>
            <PhotoNode user={photo.userId} photo={photo.url} />
          )
        }
      </div>
    );
  }
}

App.defaultProps = {
  photos: [],
};

App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  photos: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
});

export default connect(mapStateToProps)(App);
