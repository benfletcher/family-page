import React, { Component } from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { postMessage } from '../actions/messages';

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
    this.handleImageUpload(this.state.uploadedFile, this.props.userId, this.state.caption);
    this.resetState();
    // redirect to homepage
    hashHistory.push('/app');
  }

  handleImageUpload(file, userId, caption) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      // console.log('handleImageUpload response.body', response.body);
      // https://res.cloudinary.com/family/c_thumb,g_faces,h_150,w_200/nayysx6lzbbewmjtneou.jpg
      // c_thumb,g_faces,h_400,r_5,w_400

      if (response.body.secure_url !== '') {
        this.props.dispatch(postMessage({
          url: response.body.secure_url,
          userId,
          text: `${caption}`
        }));
      }
    });
  }

  render() {
    return (
      <div>
        {
          this.state.uploadedFile ?
            <div className="imageDropPreview">
              <img src={this.state.previewUrl} alt="preview" style={{ maxWidth: '250px' }} />
            </div>
          :
            <UploadBox onImageDrop={this.onImageDrop} />
        }
        <img
          className="imageDropPreview"
          alt="preview" src={this.state.previewUrl}
          style={{ maxWidth: '200px' }}
        />
        <input
          className="imageDescription"
          type="text"
          placeholder="describe your picture"
          value={this.state.caption}
          onChange={this.captionInputChange}
        />
        <div />
        {
          this.state.uploadedFile ?
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
    );
  }
}

UploadContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userId: state.currentUser.id
});

export default connect(mapStateToProps)(UploadContainer);
