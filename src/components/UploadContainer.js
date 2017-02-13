import React, { Component } from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import UploadBox from './UploadBox';
import { postPhoto } from '../actions/photos';

const CLOUDINARY_UPLOAD_PRESET = 'jbrmwpgk';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/family/upload';

let placeholder = '';

class UploadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null,
      size: 0,
      previewUrl: '',
      uploadPhotoName: '',
      zoomedIn: true
    };
    this.resetState = this.resetState.bind(this);
    this.saveUpload = this.saveUpload.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
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
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      size: 0,
      previewUrl: '',
      uploadPhotoName: ''
    });
  }

  saveUpload(event) {
    event.preventDefault();
    console.log('saveUpload button clicked');
    this.handleImageUpload(this.state.uploadedFile);
    this.resetState();
  }

  handleImageUpload(file) {
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
          userId: this.props.userId,
          caption: 'test'
        }));
      }
    });
  }

  render() {
    if (!this.state.previewUrl) {
      placeholder = '.../public/photoPlaceholder';
    } else {
      placeholder = this.state.previewUrl;
    }

    return (
      <div>
        <img alt="preview" src={placeholder} style={{ maxWidth: '150px' }} />
        <input />
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
