import React from 'react';

const GalleryZoomed = (props) => {
	return (
   	<div className='galleryZoomed'>
	  	<img onClick={props.zoom} className="xIcon" src="xIcon.png" />
	    <img className="familyPhoto" src={props.photoUrl} />
	    <div className="zoomedNav">
    		<img onClick={props.goLeft} className="arrow" src="arrow.png" />
	    	<img onClick={props.goRight} className="arrow" src="arrowRight.png" />
	    </div>
	  </div>
		)
}

export default GalleryZoomed;