import React from 'react';

const GalleryThumbnail = (props) => {
  // Either method here works. 'bind' is shorter, but the other is maybe more readable?
  // Leaving both until discussed.
  // const onClick = props.onClick.bind(null, props);
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
