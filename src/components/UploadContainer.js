import React, { Component } from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import { postMessage } from '../actions/messages';
import { fetchMembers } from '../actions/members';
import { fetchCurrentUser } from '../actions/current-user';
import { switchFamily } from '../actions/family';

// import Header from './Header';
import UploadBox from './UploadBox';

const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;

class UploadContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: '',
      uploadedFile: null,
      size: 0,
      previewUrl: '',
      uploadPhotoName: '',
      zoomedIn: true
    };

    this.resetState = this.resetState.bind(this);
    this.saveUpload = this.saveUpload.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.captionInputChange = this.captionInputChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.currentFamily && !sessionStorage.currentFamily) {
      // check if necessary user/family information is in state or sessionStorage
      hashHistory.push('/families');
    } else if (!this.props.currentFamily) {
      // if currentFamily is in sessionStorage, dispatch neccessary actions to update state
      this.props.dispatch(fetchCurrentUser());
      this.props.dispatch(switchFamily(sessionStorage.currentFamily));
      this.props.dispatch(fetchMembers(sessionStorage.currentFamily));
    }
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
      uploadPhotoName: files[0].name,
      previewUrl: files[0].preview
    });
  }

  resetState() {
    this.setState({
      zoomedIn: false,
      caption: '',
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      size: 0,
      previewUrl: 'photoPlaceholder.jpg',
      uploadPhotoName: ''
    });
  }

  captionInputChange(event) {
    this.setState({ caption: event.target.value });
  }

  saveUpload(event) {
    event.preventDefault();
    this.handleImageUpload(this.state.uploadedFile, this.state.caption);
    this.resetState();
    // redirect to homepage
    hashHistory.push('/app');
  }

  handleImageUpload(file, caption) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.props.dispatch(postMessage({
          url: response.body.secure_url,
          family: this.props.currentFamily,
          text: `${caption}`
        }));
      }
    });
  }

  render() {
    return (
      <div>
        <div className="uploadParent">
          <Link className="noMargin" to="/app">
            <i className="xIconUpload fa fa-times" aria-hidden="true"alt="close" />
          </Link>
          <div className="uploadChild">
            {
              this.state.uploadedFile
                ?
                  <div className="imageDropPreview">
                    <img
                      src={this.state.previewUrl}
                      alt="preview"
                      style={{ maxWidth: '250px' }}
                    />
                  </div>
                :
                  <UploadBox onImageDrop={this.onImageDrop} />
              }
            <form onSubmit={this.saveUpload}>
              <input
                className="imageDescription"
                type="text"
                placeholder="describe your picture"
                value={this.state.caption}
                onChange={this.captionInputChange}
              />
            </form>
            <div />
            {
          this.state.uploadedFile
          ?
            <span>
              <p
                className="dropZoneText"
                onClick={this.saveUpload}
              >
              Save
              </p>
              <p
                className="dropZoneText"
                onClick={this.resetState}
              >
              Cancel
              </p>
            </span>
          : null
        }
          </div>
        </div>
      </div>
    );
  }
}

UploadContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  currentFamily: React.PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentFamily: state.family.currentFamily
});

export default connect(mapStateToProps)(UploadContainer);
