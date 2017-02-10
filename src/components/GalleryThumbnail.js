import React from 'react';

const GalleryThumbnail = (props) => (
  <div>
    <img alt="photo thumbnail" src={props.photoUrl} />
  </div>
);

export default GalleryThumbnail;