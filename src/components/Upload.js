import React, { Component } from 'react';

class Upload extends Component {
  constructor(props) {
    super(props);
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
