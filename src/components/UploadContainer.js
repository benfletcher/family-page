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
      zoomedIn: true
    };
    this.cancelUpload = this.cancelUpload.bind(this);
    this.saveUpload = this.saveUpload.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    console.log(this.state.uploadedFile);
    this.handleImageUpload(files[0]);
  }

  saveUpload(event) {
    event.preventDefault();
    this.props.dispatch(postPhoto({
      url: this.state.uploadedFileCloudinaryUrl,
      userId: 'Jamie',
      caption: 'test'
    }));
    this.setState({ zoomedIn: false });
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
    console.log('this is a test');
    return (
      <div>
        <UploadBox onImageDrop={this.onImageDrop} />
        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <p>{this.state.uploadedFileCloudinaryUrl}</p>
            <img src={this.state.uploadedFile.preview} alt="upload preview" style={{ maxWidth: '150px' }} />
            <button onClick={this.saveUpload}>Save</button>
            <button onClick={this.cancelUpload}>Cancel</button>
          </div>}
        </div>
      </div>
    );
  }
}
export default connect()(UploadContainer);

UploadContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};
