import React from 'react';

const GalleryZoomed = (props) => {
	return (
   	<div className='galleryZoomed'>
	  	<img onClick={props.onClick} className="xIcon" src="xIcon.png" />
	    <img className="familyPhoto" src={props.photoUrl} />
	    <div className="zoomedNav">
    		<img className="arrow" src="arrow.png" />
	    	<img className="arrow" src="arrowRight.png" />
	    </div>
	  </div>
		)
}

export default GalleryZoomed;