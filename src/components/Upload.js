import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      caption: ''
    };
    this.uploadSubmit = this.uploadSubmit.bind(this);
    this.urlInputChange = this.urlInputChange.bind(this);
    this.captionInputChange = this.captionInputChange.bind(this);
  }

  uploadSubmit(event) {
    // grabs text url and dispatches action to post to database
    event.preventDefault();
    this.props.dispatch(actions.postImg({
      userId: this.props.userId,
      url: this.state.imageUrl,
      caption: this.state.caption
    }));
    this.setState({ imageUrl: '', caption: '' });
  }

  urlInputChange(event) {
    // console.log(this.state.imageUrl);
    this.setState({ imageUrl: event.target.value });
  }

  captionInputChange(event) {
    this.setState({ caption: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.uploadSubmit}>
          <input
            type="text"
            placeholder="url to upload"
            value={this.state.imageUrl}
            onChange={this.urlInputChange}
          />
          <input
            type="text"
            placeholder="describe your picture"
            value={this.state.caption}
            onChange={this.captionInputChange}
          />
          <button type="submit">Upload</button>
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
  userId: state.status.userId
});

export default connect(mapStateToProps)(Upload);
