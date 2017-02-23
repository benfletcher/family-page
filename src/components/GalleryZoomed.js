import React from 'react';

const GalleryZoomed = props => (
  <div className="galleryZoomed">
    <div className="flexZoomedContainer">
      <div className="zoomedPhotoContainer">
        <div className="zoomedNav">
          <i
            className="fa fa-3x white fa-arrow-left arrowLeft"
            onClick={props.goLeft}
            aria-hidden="true"
          />
          <i
            className="fa fa-3x white fa-arrow-right arrowRight"
            onClick={props.goRight}
            aria-hidden="true"
          />
        </div>
        <i
          className="xIcon fa fa-times"
          aria-hidden="true"
          alt="close"
          onClick={props.zoom}
        />
        <div>
          <img className="zoomedPhoto" src={props.photoUrl} alt="large" />
        </div>
      </div>
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
