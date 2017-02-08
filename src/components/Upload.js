import React, { Component } from 'react';

class Upload extends Component {
  constructor(props) {
    super(props);
  }

  urlInput(event) {
    event.preventDefault();
    // need to create this dispatch function as an async actions
    this.props.postImg(this.props.userId, this.props.imgDescription);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="url to upload"
          onChange={this.urlInput}
        />
      </div>
    );
  }
}

export default Upload;
