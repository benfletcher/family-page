import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryThumbnail from './GalleryThumbnail';
import GalleryZoomed from './GalleryZoomed';
import Header from './Header';
import { fetchPhotos } from '../actions/photos';
import { fetchMembers } from '../actions/members';

class Gallery extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPhotos());
    this.props.dispatch(fetchMembers());
  }
  //use LINK to wrap gallery thumbnail, with photo prop ???
  render() {
    console.log('photos in gallery:', this.props.photos);
    return (
    	<div>
    	  <Header />
    	  <GalleryZoomed />
	      <div className="galleryContainer">
	        {
	          this.props.photos.map(photo =>
	            <GalleryThumbnail
	              user={photo.userId}
	              photo={photo.url}
	              key={photo.userId + photo.url}
	            />
	          )
	        }
	      </div>
	    </div>  
    );
  }
}

Gallery.defaultProps = {
  photos: [],
  members: {},
};

Gallery.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  photos: React.PropTypes.arrayOf(React.PropTypes.object),
  members: React.PropTypes.objectOf(React.PropTypes.string),
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  members: state.members.members,
});

export default connect(mapStateToProps)(Gallery);