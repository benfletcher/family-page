import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class UploadBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="FileUpload">
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.props.onImageDrop}
        >
          <p>Drag and Drop an Image or click to select a file to upload</p>
        </Dropzone>
      </div>
    );
  }
}
export default UploadBox;
