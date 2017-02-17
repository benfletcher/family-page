import React from 'react';

const CommentInput = props => (
  <div className="galleryZoomed">
    <div className="flexZoomedContainer">
      <div className="zoomedPhotoContainer">
        <i onClick={props.zoom} className="xIcon fa fa-times" aria-hidden="true"alt="close" />
        <img className="zoomedPhoto" src={props.photoUrl} alt="large" />
      </div>
    </div>
  </div>
);

CommentInput.propTypes = {
  photoUrl: React.PropTypes.string.isRequired,
  zoom: React.PropTypes.func.isRequired,
};

export default CommentInput;
