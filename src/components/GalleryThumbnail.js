import React from 'react';

const GalleryThumbnail = props => (
  // eslint-disable-next-line
  <div onClick={props.onClick}>
    <img alt="thumbnail" src={props.photoUrl} />
  </div>
);

GalleryThumbnail.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
};

export default GalleryThumbnail;
