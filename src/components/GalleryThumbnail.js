import React from 'react';

const GalleryThumbnail = (props) => (
  <div onClick={props.onClick}>
    <img alt="photo thumbnail" src={props.photoUrl} />
  </div>
);

export default GalleryThumbnail;