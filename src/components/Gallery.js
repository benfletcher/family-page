import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showZoomed, hideZoomed } from '../actions/gallery';

import GalleryThumbnail from './GalleryThumbnail';
import GalleryZoomed from './GalleryZoomed';
import Header from './Header';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOn: false,
      filterId: '',
    };

    this.renderPhotos = this.renderPhotos.bind(this);
    this.openZoom = this.openZoom.bind(this);
    this.closeZoom = this.closeZoom.bind(this);
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
    this.filterPhotos = this.filterPhotos.bind(this);
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
    this.props.dispatch(showZoomed(this.props.photos[newIndex].url, newIndex));
  }

  goRight() {
    if (this.props.zoomedIndex === this.props.photos.length - 1) {
      return;
    }
    const newIndex = this.props.zoomedIndex + 1;
    this.props.dispatch(showZoomed(this.props.photos[newIndex].url, newIndex));
  }

  filterPhotos(id) {
    this.setState({ filterId: id });

    if (!this.state.filterOn) {
      this.setState({ filterOn: true });
    } else if (id === this.state.filterId) {
      this.setState({ filterOn: false });
    }
  }

  renderPhotos(photos) {
    const filteredPhotos = this.state.filterOn
      ? photos.filter(photo =>
          photo.userId === this.state.filterId)
      : photos;

    let previousMonth = '';
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const separatedPhotos = [];

    filteredPhotos.forEach((photo, i) => {
      const date = new Date(photo.date);
      const currentMonth = `${monthNames[date.getMonth()]} ${date.getYear() + 1900}`;

      if (previousMonth !== currentMonth) {
        previousMonth = currentMonth;
        separatedPhotos.push(
          <div className="gallerySeparator" key={currentMonth}>
            <p>
              {currentMonth}
            </p>
            <hr className="monthSeparatorHr" />
          </div>
        );
      }

      separatedPhotos.push(
        <GalleryThumbnail
          key={photo._id}
          photoIndex={i}
          photoUrl={photo.url}
          user={photo.userId}
          onClick={this.openZoom}
        />
      );
    });
    return separatedPhotos;
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
                onClick={() => this.filterPhotos(this.props.members[member]._id)}
              >
                <img
                  className="memberIconClickable"
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
          {this.renderPhotos(this.props.photos)}
        </div>
      </div>
    );
  }
}
Gallery.defaultProps = {
  zoomedPhoto: null,
  members: {}
};

Gallery.propTypes = {
  members: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  photos: React.PropTypes.array.isRequired,
  zoomed: React.PropTypes.bool.isRequired,
  zoomedIndex: React.PropTypes.number.isRequired,
  zoomedPhoto: React.PropTypes.string,
};

const mapStateToProps = state => ({
  photos: state.messages.messages
    .filter(message => message.contentType === 'photo'),
  members: state.family.currentMembers,
  zoomed: state.status.zoomed,
  zoomedPhoto: state.status.zoomedPhoto,
  zoomedIndex: state.status.zoomedIndex,
});

export default connect(mapStateToProps)(Gallery);
