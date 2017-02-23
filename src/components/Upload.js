import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from './Header';
import { postMessage } from '../actions/messages';
import UploadContainer from './UploadContainer';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoUrl: '',
      caption: ''
    };

    this.uploadSubmit = this.uploadSubmit.bind(this);
    this.photoUrlInputChange = this.photoUrlInputChange.bind(this);
    this.captionInputChange = this.captionInputChange.bind(this);
  }

  uploadSubmit(event) {
    // grabs text url and dispatches action to post to database
    event.preventDefault();
    // TODO add to input validation
    if (this.state.photoUrl && this.state.caption) {
      this.props.dispatch(postMessage({
        userId: this.props.userId,
        url: this.state.photoUrl,
        text: this.state.caption
      }));
      this.setState({ photoUrl: '', caption: '' });
    } else if (!this.state.phototUrl || !this.state.caption) {
      alert('Both URL field and description need to be filled out'); // eslint-disable-line
    }
  }

  photoUrlInputChange(event) {
    this.setState({ photoUrl: event.target.value });
  }

  captionInputChange(event) {
    this.setState({ caption: event.target.value });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="uploadParent">
          <Link className="noMargin" to="/app">
            <i className="xIconUpload fa fa-times" aria-hidden="true"alt="close" />
          </Link>
          <div className="uploadChild">
            <UploadContainer />
          </div>
        </div>
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
