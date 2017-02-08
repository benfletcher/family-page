import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import * as actions from '../actions';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.dispatch(actions.fetchStatus());
    this.props.dispatch(actions.fetchPhotos());
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
          <div>Status: {this.props.status}</div>
          {
            this.props.photos.map(photo =>
              <img
                src={photo.url}
                alt="placeholder"
                key={photo.date}
              />
            )
          }
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  status: 'loading...',
  photos: [],
};

App.propTypes = {
  status: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
  photos: React.PropTypes.arrayOf(React.PropTypes.string),
};

const mapStateToProps = state => ({
  status: state.status.message,
  photos: state.photos.photos,
});

export default connect(mapStateToProps)(App);
