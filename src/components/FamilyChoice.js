import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { fetchCurrentUser } from '../actions/current-user';
import { switchFamily } from '../actions/family';


class FamilyChoice extends Component {
  constructor(props) {
    super(props);

    this.selectFamily = this.selectFamily.bind(this);
    this.familyInput = this.familyInput.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
  }

  selectFamily(id) {
    this.props.dispatch(switchFamily(id));
    hashHistory.push('/app');
  }

  familyInput(event) {
    event.preventDefault();
    console.log('ready for form popout');
  }

  render() {
    return (
      <div>
        <div className="familiesContainer" style={{ listStyle: 'none' }}>
          {
      this.props.families.map(family => (
        <div
          className="familyContainer"
          key={family._id}
          onClick={() => this.selectFamily(family._id)}
        >
          <img
            src={family.avatar}
            alt="avatar"
            style={{ maxWidth: '10%', borderRadius: '50%' }}
          />
          <div className="familyNamesContainer">
            <div>
              {family.name}
            </div>
            <div>
              {family.members.map(member => <span>{`${member.nickname}, `}</span>)
            }
            </div>
          </div>
        </div>
      ))
    }
        </div>
        <button onClick={this.familyInput}>Create a Family</button>
      </div>
    );
  }
}

FamilyChoice.defaultProps = {
};

FamilyChoice.propTypes = {
  families: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  families: state.currentUser.families,
});

export default connect(mapStateToProps)(FamilyChoice);
