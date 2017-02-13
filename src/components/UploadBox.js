import React from 'react';
import Dropzone from 'react-dropzone';

const UploadBox = props => (
  <div className="FileUpload">
    <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={props.onImageDrop}
    >
      <p>Drag and Drop an Image or click to select a file to upload</p>
    </Dropzone>
  </div>
    );

UploadBox.propTypes = {
  onImageDrop: React.PropTypes.func.isRequired
};
export default UploadBox;
