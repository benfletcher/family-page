import React from 'react';

const GalleryZoomed = props => (
  <div className="galleryZoomed">
    <div className="zoomedNav">
      <img onClick={props.goLeft} className="arrow" src="arrow.png" alt="go left" />
      <img onClick={props.goRight} className="arrow" src="arrowRight.png" alt="go right" />
    </div>
    <img onClick={props.zoom} className="xIcon" src="xIcon.png" alt="close" />
    <img className="familyPhoto" src={props.photoUrl} alt="large" />
  </div>
);

GalleryZoomed.propTypes = {
  photoUrl: React.PropTypes.string.isRequired,
  zoom: React.PropTypes.func.isRequired,
  goLeft: React.PropTypes.func.isRequired,
  goRight: React.PropTypes.func.isRequired,
};

export default GalleryZoomed;
