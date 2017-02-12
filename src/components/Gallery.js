import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryThumbnail from './GalleryThumbnail';
import GalleryZoomed from './GalleryZoomed';
import Header from './Header';

import { fetchPhotos } from '../actions/photos';
import { fetchMembers } from '../actions/members';
import { showZoomed, hideZoomed } from '../actions';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.openZoom = this.openZoom.bind(this);
    this.closeZoom = this.closeZoom.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchPhotos());
    this.props.dispatch(fetchMembers());
  }
  openZoom({ photoUrl, photoIndex }) {
    this.props.dispatch(showZoomed(photoUrl, photoIndex));
  }
  closeZoom() {
    this.props.dispatch(hideZoomed());
  }
  goLeft() {
    let currentIndex = this.props.zoomedIndex;
    let newIndex = currentIndex - 1;
    this.props.dispatch(showZoomed(this.props.photos[newIndex].url, newIndex));
  }
  goRight() {
    let currentIndex = this.props.zoomedIndex;
    let newIndex = currentIndex + 1;
    this.props.dispatch(showZoomed(this.props.photos[newIndex].url, newIndex));

  }
  render() {
    return (
    	<div>
    	  <Header />
    	  {this.props.zoomed ? <GalleryZoomed 
          zoom={ this.closeZoom.bind(this) }
          goLeft={ this.goLeft.bind(this) }
          goRight={ this.goRight.bind(this) }
          photoUrl={ this.props.zoomedPhoto } /> : ''}	     
    
      <div className="galleryContainer">
	        {
            this.props.photos.map((photo, i) =>
              <GalleryThumbnail
                key={photo._id}
                photoIndex={i}
                photoUrl={photo.url}
                user={photo.userId}
                onClick={this.openZoom}
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
  zoomedUrl: null,
};

Gallery.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  photos: React.PropTypes.arrayOf(React.PropTypes.object),
  zoomed: React.PropTypes.bool.isRequired,
  zoomedUrl: React.PropTypes.string,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  members: state.members.members,
  zoomed: state.status.zoomed,
  zoomedPhoto: state.status.zoomedPhoto,
  zoomedIndex: state.status.zoomedIndex,
});

export default connect(mapStateToProps)(Gallery);
