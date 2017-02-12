import React from 'react';

const GalleryZoomed = props => (
   	<div className='galleryZoomed'>
	  	<img onClick={props.zoom} className="xIcon" src="xIcon.png" />
	    <img className="familyPhoto" src={props.photoUrl} />
	    <div className="zoomedNav">
    		<img onClick={props.goLeft} className="arrow" src="arrow.png" />
	    	<img onClick={props.goRight} className="arrow" src="arrowRight.png" />
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
