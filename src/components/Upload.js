import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postImg } from '../actions';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 'Jamie',
    };
    this.uploadSubmit = this.uploadSubmit.bind(this);
  }

  uploadSubmit(event) {
    // grabs text url and dispatches action to post to database
    event.preventDefault();
    const imageUrl = this.textInput.value;
    // need to dispatch function as an async actions that takes input og image url
    // this.state.userId will eventually come from this.props.userId coming from mapStateToProps
    this.props.postImg({ userId: this.state.userId, url: imageUrl });
    this.textInput.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.uploadSubmit}>
          <input
            type="text"
            placeholder="url to upload"
            ref={input => this.textInput = input}
          />
        </form>
      </div>
    );
  }
}

// Upload.defaultProps = {
//   textInput: 'textInput',
// };

// Upload.propTypes = {
//   textInput: React.PropTypes.string,
//   imgUrl: React.PropTypes.string,
// };

// eventualy will only get userId from mapStateToProps not the entire state
const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  postImg: uploadImg => dispatch(postImg(uploadImg))
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);

// export default connect(mapDispatchToProps)(Upload);
