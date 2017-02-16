import React, { Component } from 'react';
import { connect } from 'react-redux';
import GalleryThumbnail from './GalleryThumbnail';
import GalleryZoomed from './GalleryZoomed';
import Header from './Header';
import { fetchMessages } from '../actions/messages';
import { fetchMembers } from '../actions/members';
import { showZoomed, hideZoomed } from '../actions';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.openZoom = this.openZoom.bind(this);
    this.closeZoom = this.closeZoom.bind(this);
    this.closeZoom = this.closeZoom.bind(this);
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchMessages());
    this.props.dispatch(fetchMembers());
  }

  openZoom({ photoUrl, photoIndex }) {
    this.props.dispatch(showZoomed(photoUrl, photoIndex));
  }

  closeZoom() {
    this.props.dispatch(hideZoomed());
  }

  goLeft() {
    const currentIndex = this.props.zoomedIndex;
    const newIndex = currentIndex - 1;
    this.props.dispatch(showZoomed(this.props.messages[newIndex].url, newIndex));
  }

  goRight() {
    const currentIndex = this.props.zoomedIndex;
    const newIndex = currentIndex + 1;
    this.props.dispatch(showZoomed(this.props.messages[newIndex].url, newIndex));
  }

  render() {
    return (
      <div>
        <Header />
        {
          this.props.zoomed ?
            <GalleryZoomed
              zoom={this.closeZoom}
              goLeft={this.goLeft}
              goRight={this.goRight}
              photoUrl={this.props.zoomedPhoto}
            />
          : null
        }

        <div className="galleryContainer">
          {
            this.props.messages.map((photo, i) =>
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
  messages: [],
  members: {},
  zoomedPhoto: null,
};

Gallery.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  messages: React.PropTypes.arrayOf(React.PropTypes.object),
  zoomed: React.PropTypes.bool.isRequired,
  zoomedIndex: React.PropTypes.number.isRequired,
  zoomedPhoto: React.PropTypes.string,
};

const mapStateToProps = state => ({
  messages: state.messages.messages,
  members: state.members.members,
  zoomed: state.status.zoomed,
  zoomedPhoto: state.status.zoomedPhoto,
  zoomedIndex: state.status.zoomedIndex,
});

export default connect(mapStateToProps)(Gallery);
