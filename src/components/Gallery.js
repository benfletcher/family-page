import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions/messages';
import { fetchMembers } from '../actions/members';
import { showZoomed, hideZoomed } from '../actions';

import GalleryThumbnail from './GalleryThumbnail';
import GalleryZoomed from './GalleryZoomed';
import Header from './Header';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: this.props.messages.filter(message =>
        message.contentType === 'photo'
      ).sort((a, b) => {
        const c = new Date(a.date);
        const d = new Date(b.date);
        return c - d;
      }),
      filterOn: false,
      filterId: '58a79e7829e48da02c0bb22d',
    };

    this.renderPhotos = this.renderPhotos.bind(this);
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
    if (this.props.zoomedIndex === 0) {
      return;
    }
    const newIndex = this.props.zoomedIndex - 1;
    this.props.dispatch(showZoomed(this.state.photos[newIndex].url, newIndex));
  }

  goRight() {
    if (this.props.zoomedIndex === this.state.photos.length - 1) {
      return;
    }
    const newIndex = this.props.zoomedIndex + 1;
    this.props.dispatch(showZoomed(this.state.photos[newIndex].url, newIndex));
  }

  filterPhotos(id) {
    this.setState({ filterId: id });
    if (!this.state.filterOn) {
      return this.setState({ filterOn: true });
    }
    if (id === this.state.filterId) {
      return this.setState({ filterOn: false });
    }
  }

  renderPhotos(photos) {
    let filteredPhotos = photos;
    if (this.state.filterOn) {
      filteredPhotos = filteredPhotos.filter((photo) => {
        if (this.state.filterId !== photo.userId) {
          return false;
        }
        return photo;
      }); //
    }

    let previousMonth = '';
    const photos123 = [];
    filteredPhotos.forEach((photo, i) => {
      const date = new Date(photo.date);
      if (previousMonth !== `${date.getMonth()}-${date.getYear() + 1900}`) {
        previousMonth = `${date.getMonth()}-${date.getYear() + 1900}`;
        photos123.push(<div className="gallerySeparator">{previousMonth}</div>);
      }
      photos123.push(
        // sometimes get a div here, but not wrap it all in a div
        <GalleryThumbnail
          key={photo._id}
          photoIndex={i}
          photoUrl={photo.url}
          user={photo.userId}
          onClick={this.openZoom}
        />
      );
    });
    return photos123;
  }

  render() {
    return (
      <div>
        <Header />
        <ul className="userPhotoIcon" style={{ listStyle: 'none' }}>
          {
              Object.keys(this.props.members).map(member => (
                <li
                  key={this.props.members[member]._id}
                  onClick={this.filterPhotos.bind(
                    this, this.props.members[member]._id
                  )}
                >
                  <img
                    src={this.props.members[member].avatar}
                    alt="avatar"
                    style={{ maxWidth: '50px', borderRadius: '50%' }}
                  />
                </li>
              ))
            }
        </ul>
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
          {this.renderPhotos(this.state.photos)}
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
  members: React.PropTypes.objectOf(React.PropTypes.object),
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
