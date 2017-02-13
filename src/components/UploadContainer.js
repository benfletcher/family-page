import React, { Component } from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import UploadBox from './UploadBox';
import { postPhoto } from '../actions/photos';

const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
console.log(CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET);
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
    console.log(this.state.caption);
  }

  saveUpload(event) {
    event.preventDefault();
    console.log('saveUpload button clicked');
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
        this.props.dispatch(postPhoto({
          url: response.body.secure_url,
          userId,
          caption
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
        <img alt="preview" src={placeholder} style={{ maxWidth: '200px' }} />
        <input
          type="text"
          placeholder="describe your picture"
          value={this.state.caption}
          onChange={this.captionInputChange}
        />
        <UploadBox onImageDrop={this.onImageDrop} />
        <div>
          {this.state.uploadPhotoName === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <p>{this.state.uploadedFile.size}</p>
          </div>}
        </div>
        <button onClick={this.saveUpload}>Save</button>
        <button onClick={this.resetState}>Cancel</button>
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
