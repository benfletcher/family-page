import React from 'react';
import Dropzone from 'react-dropzone';

const UploadBox = props => (
  <div className="fileUpload">
    <Dropzone
      className="dropZoneBox"
      multiple={false}
      accept="image/*"
      onDrop={props.onImageDrop}
    >
      <i className="fa fa-cloud-upload fa-2x uploadIcon" aria-hidden="true" />
      <p className="imgDropText">Click to upload, or drag image</p>
    </Dropzone>
  </div>
    );

UploadBox.propTypes = {
  onImageDrop: React.PropTypes.func.isRequired
};
export default UploadBox;
