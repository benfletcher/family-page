import React, { Component } from 'react';
import { connect } from 'react-redux';
import request from 'superagent';
import { postFamily } from '../actions/family';
import { fetchCurrentUser } from '../actions/current-user';
import UploadBox from './UploadBox';
// send link to family sudocode
// click create family - generate family link to group
// form to enter email to invite Users
// submit form sends link to form emails that when link clicked send them to app
// family member clicks link and either signs up for the app
// via google login and then can see the group
// or family member already has app and the group
// creation notification is sent to their app
// once user clicks link and views the group, they are added as a member to group

// take an email and name
// instead of input for email maybe allow users to select other family members
// if the family member is not there then generate a link to send that can be copied and pasted
// generate group link
// make person who made group the admin
// post new group

const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;


class CreateFamily extends Component {
  constructor(props) {
    super(props);

    this.state = {
      familyName: '',
      avatar: 'groupPlaceholder.jpg',
      uploadedFile: null,
      previewUrl: '',
    };

    this.saveFamily = this.saveFamily.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.dispatch(fetchCurrentUser());
    }
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
      uploadPhotoName: files[0].name,
      previewUrl: files[0].preview
    });
  }

  handleInputChange(event) {
    this.setState({ familyName: event.target.value });
  }

  handleImageUpload(file, familyName) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
                          .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                          .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.props.dispatch(postFamily({
          avatar: response.body.secure_url,
          name: `${familyName}`
        }));
      }
    });
  }

  saveFamily() {
    if (this.state.familyName.length) {
      if (this.state.previewUrl === '') {
        this.props.dispatch(postFamily({
          avatar: this.state.avatar,
          name: this.state.familyName
        }));
      } else {
        this.handleImageUpload(this.state.uploadedFile, this.state.familyName);
      }
    } else {
      alert('you must name your family');
    }
  }

  render() {
    return (
      <div className="panelContainer">
        <div className="panelExitContainer">
          <i
            className="panelExit fa fa-times"
            aria-hidden="true"
            alt="close"
            onClick={this.props.closeFamilyModal}
          />
        </div>

        <div className="createFamilyContainer">
          <UploadBox onImageDrop={this.onImageDrop}>
            <div
              className="createFamilyAvatar"
            >
              {
              this.state.previewUrl
              ?
                <img
                  src={this.state.previewUrl}
                  alt="avatar"
                />
              :
                <img
                  src={this.state.avatar}
                  alt="avatar"
                />
              }
            </div>
          </UploadBox>

          <div className="createFamilyName">
            <input
              type="text"
              placeholder="Name Your Family"
              value={this.state.familyName}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div>
          <button
            className="createFamilyButton"
            type="submit"
            onClick={this.saveFamily}
          >
            Create Family
            </button>
        </div>
      </div>
    );
  }
}

CreateFamily.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.string.isRequired,
  closeFamilyModal: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.currentUser.id,
});

export default connect(mapStateToProps)(CreateFamily);
