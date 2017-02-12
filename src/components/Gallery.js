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

  // use LINK to wrap gallery thumbnail, with photo prop ???
  render() {
    return (
      <div>
        <Header />
        {
          this.props.zoomed ?
            <GalleryZoomed
              onClick={this.closeZoom}
              photoUrl={this.props.zoomedUrl}
            /> : null
        }
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
  zoomedUrl: state.status.zoomedUrl,
});

export default connect(mapStateToProps)(Gallery);
