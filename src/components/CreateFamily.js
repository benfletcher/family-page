import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

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
// generate group link
// make person who made group the admin
// post new group


class CreateFamily extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: ''
    };

    this.createFamily = this.createFamily.bind(this);
    this.captionInputChange = this.captionInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  createFamily(event) {
    event.preventDefault();
    // this.props.dispatch(addFamily())
    this.resetState();
    // redirect to homepage
    hashHistory.push('/app');
  }

  captionInputChange(event) {
    this.setState({ caption: event.target.value });
  }

  resetState() {
    this.setState({
      caption: '',
    });
  }

  render() {
    return (
      <div>
        <Header />
        <br />
        <br />

        <form onSubmit={this.createFamily}>
          <label>Name the group</label>
          <input
            className="imageDescription"
            type="text"
            placeholder="email"
            value={this.state.caption}
            onChange={this.captionInputChange}
          />
          <br />

          <label>Family Members email</label>
          <input
            className="imageDescription"
            type="text"
            placeholder="email"
            value={this.state.caption}
            onChange={this.captionInputChange}
          />

          <label>Upload Photo For the group</label>
          <button />
        </form>
      </div>
    );
  }
}

export default connect()(CreateFamily);
