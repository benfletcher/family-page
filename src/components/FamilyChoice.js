import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser, switchFamily } from '../actions/current-user';

class FamilyIcons extends Component {
  constructor(props) {
    super(props);

    this.selectFamily = this.selectFamily.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
  }

  selectFamily(id) {
    this.props.dispatch(switchFamily(id));
  }

  render() {
    return (
      <ul className="userPhotoIcon" style={{ listStyle: 'none' }}>
        {
      Object.keys(this.props.families).map(family => (
        <li
          key={this.props.families[family]._id}
          onClick={() => this.selectFamily(this.props.families[family]._id)}
        >
          <img
            src={this.props.families[family].avatar}
            alt="avatar"
            style={{ maxWidth: '75%', borderRadius: '50%' }}
          />
          <span className="userPhotoName">
            {this.props.families[family].name}
          </span>
        </li>
      ))
    }
      </ul>
    );
  }
}

FamilyIcons.defaultProps = {
};

FamilyIcons.propTypes = {
  families: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  families: state.families.family,
});

export default connect(mapStateToProps)(FamilyIcons);
