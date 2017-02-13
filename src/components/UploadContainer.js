import React, { Component } from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import UploadBox from './UploadBox';
import { postPhoto } from '../actions/photos';


const CLOUDINARY_UPLOAD_PRESET = 'jbrmwpgk';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/family/upload';

class UploadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      size: 0,
      previewUrl: '',
      uploadPhotoName: '',
      zoomedIn: true
    };
    this.cancelUpload = this.cancelUpload.bind(this);
    this.saveUpload = this.saveUpload.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    // this.updateUploadState = this.updateUploadState.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
    });
    // this.updateUploadState();
  }

  // updateUploadState() {
  //   this.setState({
  //     size: this.state.uploadedFile.size
  //   });
  // }

  saveUpload(event) {
    event.preventDefault();
    console.log('saveUpload button clicked');
    this.handleImageUpload(this.state.uploadedFile)
    .then(() => {
      this.props.dispatch(postPhoto({
        url: this.state.uploadedFileCloudinaryUrl,
        userId: this.props.userId,
        caption: 'test'
      })
  );
    });
    this.setState({
      zoomedIn: false,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      size: 0,
      previewUrl: '',
      uploadPhotoName: ''
    });
  }

  cancelUpload() {
    this.setState({ zoomedIn: false });
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
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    console.log(this.state.uploadedFile);
    return (
      <div>
        <img alt="preview" src={this.previewUrl} />
        <input />
        <UploadBox onImageDrop={this.onImageDrop} />
        <button onClick={this.saveUpload}>Save</button>
        <button onClick={this.cancelUpload}>Cancel</button>
        <p>{this.state.size}</p>
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
