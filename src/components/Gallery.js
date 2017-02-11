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

  openZoom(photo) {
    this.props.dispatch(showZoomed(photo));
    console.log('yah', this.props.zoomedUrl);
  }
  closeZoom() {
    this.props.dispatch(hideZoomed());
  }
  // use LINK to wrap gallery thumbnail, with photo prop ???
  render() {
    return (
      <div>
        <Header />
        {
          this.props.zoomed ?
            <GalleryZoomed
              onClick={this.closeZoom}
              photoUrl={this.props.zoomedUrl.url}
            /> : ''
        }
        <div className="galleryContainer">
          {
            this.props.photos.map(photo =>
              <GalleryThumbnail
                user={photo.userId}
                photoUrl={photo.url}
                key={photo.userId + photo.url}
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
};

Gallery.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  photos: React.PropTypes.arrayOf(React.PropTypes.object),
  zoomed: React.PropTypes.bool.isRequired,
  zoomedUrl: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  members: state.members.members,
  zoomed: state.status.zoomed,
  zoomedUrl: state.status.zoomedUrl
});

export default connect(mapStateToProps)(Gallery);
