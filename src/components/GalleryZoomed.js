import React from 'react';

const GalleryZoomed = (props) => {
	return (
   	<div className='galleryZoomed'>
	  	<img className="xIcon" src="xIcon.png" />
	    <img className="familyPhoto" src="familyphoto.gif" />
	    <div className="zoomedNav">
    		<img className="arrow" src="arrow.png" />
	    	<img className="arrow" src="arrowRight.png" />
	    </div>
	  </div>
		)
}

export default GalleryZoomed;