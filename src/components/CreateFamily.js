import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { createFamily } from '../actions/family';
import Header from './Header';

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
      avatar: 'groupPlaceholder.jpg'
    };

    this.createFamily = this.createFamily.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  createFamily() {
    this.props.dispatch(createFamily({
      name: this.state.groupName,
      avatar: this.state.avatar
    }));
    this.resetState();
          // redirect to homepage for newly made family
    hashHistory.push('/families');
          // next make action for createFamily that sends info and then users
          // that new family id to navigate to the app page
  }

  handleInputChange(event) {
    const name = event.target.name;
    if (name === 'groupName') {
      this.setState({ groupName: event.target.value });
    }
  }

  resetState() {
    this.setState({
      groupName: '',
      memberEmail: ''
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{ paddingTop: '50px' }}>
          <div className="familyContainer">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSS7tLRutVL3cSVqtulqbDXwVdmpD3MCyJh2k2zWVogovBy1nC_"
              alt="avatar"
              style={{ maxWidth: '10%', borderRadius: '50%' }}
            />
            <div className="familyNamesContainer">
              <input
                name="groupName"
                type="text"
                placeholder="Name Your Family"
                value={this.state.groupName}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <input
            className="imageDescription"
            type="button"
            placeholder="email"
            value="Create Family"
            onClick={this.createFamily}
          />
        </div>
      </div>
    );
  }
}

CreateFamily.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(CreateFamily);
