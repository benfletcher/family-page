import React, { Component } from 'react';
import { connect } from 'react-redux';
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


class CreateFamily extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
      avatar: 'groupPlaceholder.jpg',
      showUploadBox: false,
    };

    this.postFamily = this.postFamily.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.dispatch(fetchCurrentUser());
    }
  }

  postFamily() {
    if (this.state.groupName.length) {
      this.props.dispatch(postFamily({
        name: this.state.groupName,
        avatar: this.state.avatar
      }));
    }
  }

  handleInputChange(event) {
    this.setState({ groupName: event.target.value });
  }

  handleImageUpload() {
    this.setState({ showUploadBox: true });
    console.log('upload file clicked');
    console.log(this.state.showUploadBox);
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
          <UploadBox onDrop={() => console.log('something')}>
            <div
              className="createFamilyAvatar"
              onClick={this.handleImageUpload}
            >
              <img
                src={this.state.avatar}
                alt="avatar"
              />
            </div>
          </UploadBox>

          <div className="createFamilyName">
            <input
              name="groupName"
              type="text"
              placeholder="Name Your Family"
              value={this.state.groupName}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div>
          <button
            className="createFamilyButton"
            type="submit"
            name="createGroupButton"
            onClick={this.postFamily}
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
