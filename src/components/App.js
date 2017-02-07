import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.fetchStatus());
  }

  render() {
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
  status: state.status,
  loading: state.statusLoading,
});

export default connect(mapStateToProps)(App);
