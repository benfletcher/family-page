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
      {props.children}
    </Dropzone>
  </div>
    );

UploadBox.defaultProps = {
  children: null,
};
UploadBox.propTypes = {
  onImageDrop: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
};
export default UploadBox;
