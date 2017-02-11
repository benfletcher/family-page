import React from 'react';

const GalleryZoomed = props => (
  <div className="galleryZoomed">
    <img onClick={props.onClick} className="xIcon" src="xIcon.png" alt="close" />
    <img className="familyPhoto" src={props.photoUrl} alt="large main" />
    <div className="zoomedNav">
      <img className="arrow" src="arrow.png" alt="left" />
      <img className="arrow" src="arrowRight.png" alt="right" />
    </div>
  </div>
);

GalleryZoomed.propTypes = {
  photoUrl: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default GalleryZoomed;
