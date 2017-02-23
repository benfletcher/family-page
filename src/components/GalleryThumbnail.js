import React from 'react';

const GalleryThumbnail = (props) => {
  const onClick = () => {
    props.onClick(props);
  };

  return (
    <div className="galleryThumbnail">
      <img
        alt="thumbnail"
        src={
          (props.photoUrl.includes('cloudinary'))
           ? props.photoUrl.replace('image/upload', 'c_thumb,h_150,w_150')
           : props.photoUrl
        }
        onClick={onClick}
      />
    </div>
  );
};

GalleryThumbnail.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  photoUrl: React.PropTypes.string.isRequired,
};

export default GalleryThumbnail;
