import React from 'react';

const GalleryThumbnail = (props) => {
  const onClick = () => {
    props.onClick(props);
  };

  return (
    <div>
      <img
        alt="thumbnail"
        src={props.photoUrl}
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
