import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../actions/messages';

class CommentNode extends Component {
  constructor(props) {
    super(props);

    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment() {
    console.log('deleting comment');
    this.props.dispatch(deleteComment(this.props.messageId, this.props.comment._id));
  }

  render() {
    return (
      <div className="commentParent">
        <div className="commentContainer">
          <div className="commentTextContainer">
            <div className="deleteComment" >
              {(this.props.comment.from === this.props.currentUser)
                ?
                  <i
                    onClick={this.deleteComment}
                    className="fa fa-trash-o deleteIcon"
                    aria-hidden="true"
                  />
                : null
              }
            </div>
            <img
              src={this.props.fromAvatar}
              alt="avatar"
              className="userIcon"
            />
            <p className="commentText">
              <span>{this.props.from}</span>: {this.props.comment.text}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

CommentNode.defaultProps = {
  fromAvatar: '',
  comment: {
    text: 'default prop comment',
    to: '',
    from: ''
  }
};

CommentNode.propTypes = {
  comment: React.PropTypes.object,
  messageId: React.PropTypes.string.isRequired,
  fromAvatar: React.PropTypes.string,
  from: React.PropTypes.string.isRequired,
  currentUser: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(CommentNode);
