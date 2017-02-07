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
          <div>Status: {this.props.loading ? 'loading...' : this.props.status}</div>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  status: state.status.message,
  loading: state.status.loading,
  photos: state.photo.photos,
});

export default connect(mapStateToProps)(App);
