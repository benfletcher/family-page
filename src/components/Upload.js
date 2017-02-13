import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { postPhoto } from '../actions/photos';
import UploadContainer from './UploadContainer';
import { Link } from 'react-router';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoUrl: '',
      caption: ''
    };

    this.uploadSubmit = this.uploadSubmit.bind(this);
    this.photoUrlInputChange = this.photoUrlInputChange.bind(this);
    this.captionInputChange = this.captionInputChange.bind(this);
  }

  uploadSubmit(event) {
    // grabs text url and dispatches action to post to database
    event.preventDefault();
    // TODO add to input validation
    if (this.state.photoUrl && this.state.caption) {
      this.props.dispatch(postPhoto({
        userId: this.props.userId,
        url: this.state.photoUrl,
        caption: this.state.caption
      }));
      this.setState({ photoUrl: '', caption: '' });
    } else if (!this.state.phototUrl || !this.state.caption) {
      alert('Both URL field and description need to be filled out'); // eslint-disable-line
    }
  }

  photoUrlInputChange(event) {
    this.setState({ photoUrl: event.target.value });
  }

  captionInputChange(event) {
    this.setState({ caption: event.target.value });
  }

  render() {
    return (
      <div>
        <Header />
        <div className='parent'>
          <div className='child'>
            <form onSubmit={this.uploadSubmit}>
              <input
                type="text"
                placeholder="url to upload"
                value={this.state.photoUrl}
                onChange={this.photoUrlInputChange}
              />
              <input
                type="text"
                placeholder="describe your picture"
                value={this.state.caption}
                onChange={this.captionInputChange}
              />
              <Link to="/">
                <button className="formButton" type="submit">Upload</button>
              </Link>
              <UploadContainer />  
            </form>

          </div>
        </div>
          <div className="uploadContainer">
            <form onSubmit={this.uploadSubmit}>
              <input
                type="text"
                placeholder="url to upload"
                value={this.state.photoUrl}
                onChange={this.photoUrlInputChange}
              />
              <input
                type="text"
                placeholder="describe your picture"
                value={this.state.caption}
                onChange={this.captionInputChange}
              />
              <Link to="/">
                <button className="formButton" type="submit">Upload</button>
              </Link>  
            </form>
            <UploadContainer />
          </div>
      </div>
    );
  }
}

Upload.propTypes = {
  userId: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.status.userId
});

export default connect(mapStateToProps)(Upload);
