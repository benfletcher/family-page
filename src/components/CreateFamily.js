import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { createFamily } from '../actions/current-user';
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
      memberEmail: ''
    };

    this.createFamily = this.createFamily.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  createFamily() {
    console.log(this.state.groupName, this.state.memberEmail);
    this.props.dispatch(createFamily());
    this.resetState();
    // redirect to homepage for newly made family
    hashHistory.push('/app');
    // next make action for createFamily that sends info and then users
    // that new family id to navigate to the app page
  }

  handleInputChange(event) {
    const name = event.target.name;
    if (name === 'groupName') {
      this.setState({ groupName: event.target.value });
    } else if (name === 'memberEmail') {
      this.setState({ memberEmail: event.target.value });
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
        <br />
        <br />
        <div style={{ paddingTop: '50px' }}>
          <form>
            Name the group
            <input
              name="groupName"
              type="text"
              placeholder="Group Name"
              value={this.state.groupName}
              onChange={this.handleInputChange}
            />
            <br />

            Family Members email
            <input
              name="memberEmail"
              type="text"
              placeholder="email"
              value={this.state.memberEmail}
              onChange={this.handleInputChange}
            />
            <br />
            <br />

            <input
              className="imageDescription"
              type="button"
              placeholder="email"
              value="Submit"
              onClick={this.createFamily}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(CreateFamily);
