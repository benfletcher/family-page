import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryThumbnail from './GalleryThumbnail';
import GalleryZoomed from './GalleryZoomed';
import Header from './Header';
import { fetchPhotos } from '../actions/photos';
import { fetchMembers } from '../actions/members';
import { showZoomed } from '../actions';
import { hideZoomed } from '../actions';


class Gallery extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPhotos());
    this.props.dispatch(fetchMembers());
  }
  openZoom(photo) {
    this.props.dispatch(showZoomed(photo));
  }
  closeZoom() {
    this.props.dispatch(hideZoomed());
  }
  goLeft() {
    console.log(this.props.zoomedPhoto.id)
  }
  goRight() {

  }
  render() {
    return (
    	<div>
    	  <Header />
    	  {this.props.zoomed ? <GalleryZoomed 
          zoom={ this.closeZoom.bind(this) }
          goLeft={ this.goLeft.bind(this) }
          goRigh={ this.goRight.bind(this) }
          photoUrl={ this.props.zoomedPhoto.url } /> : ''}	     
    
      <div className="galleryContainer">
	        {
	          this.props.photos.map(photo =>
	            <GalleryThumbnail
	              user={photo.userId}
	              photoUrl={photo.url}
	              key={photo.userId + photo.url}
                onClick={this.openZoom.bind(this, photo)}
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
  zoomed: state.status.zoomed,
  zoomedPhoto: state.status.zoomedPhoto
});

export default connect(mapStateToProps)(Gallery);