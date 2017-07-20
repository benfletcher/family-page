import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage } from '../actions/messages';

import UploadContainer from './UploadContainer';

class CombinedPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      showUpload: false,
    };

    this.announcementSubmit = this.announcementSubmit.bind(this);
    this.textInputChange = this.textInputChange.bind(this);
    this.initiatePhotoUpload = this.initiatePhotoUpload.bind(this);
  }

  announcementSubmit(event) {
    event.preventDefault();
    if (this.state.text) {
      this.props.dispatch(postMessage({
        contentType: 'announcement',
        text: this.state.text,
        family: this.props.currentFamily
      }));
      this.setState({ text: '' });
    }
  }

  textInputChange(event) {
    this.setState({ text: event.target.value });
  }

  initiatePhotoUpload() {
    console.log('initiatePhotoUpload');
    this.setState({ showUpload: true });
  }

  render() {
    return (
      <div>
        <img
          alt="avatar"
          className="avatarPhoto"
          src={this.props.currentAvatar}
        />
        {
          this.state.showUpload
          ?
            <UploadContainer />
          :
            <form onSubmit={this.announcementSubmit}>
              <input
                className="announcementInput"
                placeholder={`${this.props.currentNickname}, say hi to the family`}
                value={this.state.text}
                onChange={this.textInputChange}
                onSubmit={this.announcementSubmit}
                type="text"
              />
              <button
                type="button"
                onClick={this.initiatePhotoUpload}
              >
              Upload Photo
              </button>
              <p
                onClick={this.announcementSubmit}
                className="announcementPost"
                style={{
                  visibility: (this.state.text.length)
                    ? 'visible'
                    : 'hidden'
                }}
              >
                Post{'\u00A0' /* non-breaking space unicode */}
                <i className="fa fa-bullhorn announcementPostIcon" aria-hidden="true" />
              </p>
            </form>
        }
      </div>
    );
  }

}

CombinedPost.defaultProps = {
  currentNickname: null,
  currentAvatar: '',
  currentFamily: ''
};

CombinedPost.propTypes = {
  currentNickname: React.PropTypes.string,
  currentAvatar: React.PropTypes.string,
  currentFamily: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired
};

export default connect()(CombinedPost);

// ammouncement component before changes
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { postMessage } from '../actions/messages';
//
// import UploadContainer from './UploadContainer';
//
// class Announcement extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       text: '',
//       showUpload: false,
//     };
//
//     this.announcementSubmit = this.announcementSubmit.bind(this);
//     this.textInputChange = this.textInputChange.bind(this);
//     this.initiatePhotoUpload = this.initiatePhotoUpload.bind(this);
//   }
//
//   announcementSubmit(event) {
//     event.preventDefault();
//     if (this.state.text) {
//       this.props.dispatch(postMessage({
//         contentType: 'announcement',
//         text: this.state.text,
//         family: this.props.currentFamily
//       }));
//       this.setState({ text: '' });
//     }
//   }
//
//   textInputChange(event) {
//     this.setState({ text: event.target.value });
//   }
//
//   initiatePhotoUpload() {
//     console.log('initiatePhotoUpload');
//     this.setState({ showUpload: true });
//   }
//
//   render() {
//     return (
//       <div className="announcementParent">
//         <div className="announcementContainer">
//           <div className="announcementHeader" />
//           <div className="announcementAvatar">
//             <img
//               alt="avatar"
//               className="avatarPhoto"
//               src={this.props.currentAvatar}
//             />
//           </div>
//           <div className="announcementInputBox">
//             {
//             this.state.showUpload ? <UploadContainer />
//           :
//             <form onSubmit={this.announcementSubmit}>
//               <input
//                 className="announcementInput"
//                 placeholder={`${this.props.currentNickname}, say hi to the family`}
//                 value={this.state.text}
//                 onChange={this.textInputChange}
//                 onSubmit={this.announcementSubmit}
//                 type="text"
//               />
//               <button
//                 type="button"
//                 onClick={this.initiatePhotoUpload}
//               >
//               Upload Photo
//               </button>
//             </form>
//             }
//           </div>
//           <div className="announcementFooter">
//             <div className="announcementBlueLine" />
//             <p
//               onClick={this.announcementSubmit}
//               className="announcementPost"
//               style={{
//                 visibility: (this.state.text.length)
//                   ? 'visible'
//                   : 'hidden'
//               }}
//             >
//               Post{'\u00A0' /* non-breaking space unicode */}
//               <i className="fa fa-bullhorn announcementPostIcon" aria-hidden="true" />
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
//
// Announcement.defaultProps = {
//   currentNickname: null,
//   currentAvatar: '',
//   currentFamily: ''
// };
//
// Announcement.propTypes = {
//   currentNickname: React.PropTypes.string,
//   currentAvatar: React.PropTypes.string,
//   currentFamily: React.PropTypes.string,
//   dispatch: React.PropTypes.func.isRequired
// };
//
// export default connect()(Announcement);
