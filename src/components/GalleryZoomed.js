import React from 'react';

const GalleryZoomed = props => (
  <div className="galleryZoomed">
    <div>
      <img onClick={props.zoom} className="xIcon" src="xIcon.png" alt="close" />
      <img className="zoomedPhoto" src={props.photoUrl} alt="large" />
    </div>
    <div className="zoomedNav">
      <i className="fa fa-3x white fa-arrow-left" onClick={props.goLeft} aria-hidden="true" />
      <i className="fa fa-3x white fa-arrow-right" onClick={props.goRight} aria-hidden="true" />
    </div>
  </div>
);

GalleryZoomed.propTypes = {
  photoUrl: React.PropTypes.string.isRequired,
  zoom: React.PropTypes.func.isRequired,
  goLeft: React.PropTypes.func.isRequired,
  goRight: React.PropTypes.func.isRequired,
};

export default GalleryZoomed;
