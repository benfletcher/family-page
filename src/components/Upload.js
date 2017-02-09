import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.uploadSubmit = this.uploadSubmit.bind(this);
  }

  uploadSubmit(event) {
    // grabs text url and dispatches action to post to database
    event.preventDefault();
    const imageUrl = this.textInput.value;
    this.props.dispatch(actions.postImg({ userId: this.props.userId, url: imageUrl }));
    this.textInput.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.uploadSubmit}>
          <input
            type="text"
            placeholder="url to upload"
            ref={(input) => { this.textInput = input; }}
          />
        </form>
      </div>
    );
  }
}

Upload.propTypes = {
  userId: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.userId
});

export default connect(mapStateToProps)(Upload);
