import React from 'react';

const GalleryZoomed = props => (
  <div className="galleryZoomed">
    <div className="flexZoomedContainer">
      <div className="zoomedPhotoContainer">
        <i onClick={props.zoom} className="xIcon fa fa-times" aria-hidden="true"alt="close" />

        <img className="zoomedPhoto" src={props.photoUrl} alt="large" />
      </div>
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
