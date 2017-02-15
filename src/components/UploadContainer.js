import React, { Component } from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import UploadBox from './UploadBox';
import { Link } from 'react-router';
import { postMessage } from '../actions/messages';

const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;

let placeholder = '';

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
      previewUrl: '',
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
  }

  handleImageUpload(file, userId, caption) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(response.body.secure_url);
        this.props.dispatch(postMessage({
          url: response.body.secure_url,
          userId,
          text: `testing captions ${caption}`
        }));
      }
    });
  }

  render() {
    if (!this.state.previewUrl) {
      placeholder = 'photoPlaceholder.jpg';
    } else {
      placeholder = this.state.previewUrl;
    }

    return (
      <div>
        <UploadBox onImageDrop={this.onImageDrop} />
        <img
          className="imageDropPreview"
          alt="preview" src={placeholder}
          style={{ maxWidth: '200px' }}
        />
        <input
          className="imageDescription"
          type="text"
          placeholder="describe your picture"
          value={this.state.caption}
          onChange={this.captionInputChange}
        />
        <div>
          {this.state.uploadPhotoName === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <p>{this.state.uploadedFile.size}</p>
          </div>}
        </div>
        <Link to="/">
          <p
            className="dropZoneText"
            onClick={this.saveUpload}
          >Save
          </p>
        </Link>
        <p
          className="dropZoneText"
          onClick={this.resetState}
        >
          Cancel
        </p>
      </div>
    );
  }
}

UploadContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  userId: React.PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  userId: state.status.userId
});

export default connect(mapStateToProps)(UploadContainer);
