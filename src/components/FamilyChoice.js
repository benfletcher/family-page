import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/current-user';
import { switchFamily } from '../actions/family';


class FamilyChoice extends Component {
  constructor(props) {
    super(props);

    this.selectFamily = this.selectFamily.bind(this);
    this.familyInput = this.familyInput.bind(this);
  }
  // componentDidMount() {
  //   this.props.dispatch(fetchCurrentUser());
  // }

  selectFamily(id) {
    this.props.dispatch(switchFamily(id));
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
      Object.keys(this.props.families).map(family => (
        <div
          className="familyContainer"
          key={this.props.families[family]._id}
          onClick={() => this.selectFamily(this.props.families[family]._id)}
        >
          <img
            src={this.props.families[family].avatar}
            alt="avatar"
            style={{ maxWidth: '10%', borderRadius: '50%' }}
          />
          <div className="familyNamesContainer">
            <div>
              {this.props.families[family].name}
            </div>
            <div>
              {this.props.families[family].members.map(member => <span>{`${member}, `}</span>)
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
  families: {
    1234: {
      _id: '1234',
      avatar: 'https://gravatar.com/avatar/56c6463a0e39da49cd1ce358f196a2df?s=512&d=https://codepen.io/assets/avatars/team-avatar-512x512-a1865fd24525fb17847bd2dc53d0cb033a60f69d519d018b4e1d396c397815b1.png',
      name: 'Thinkful',
      members: ['Jamie', 'Ben', 'Alex']
    },
    demoId: {
      _id: 'defaultId',
      avatar: 'http://veselchac.ru/ckfinder/userfiles/files/%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%20%D0%B4%D0%BB%D1%8F%20%D0%BF%D1%80%D0%B0%D0%B7%D0%B4%D0%BD%D0%B8%D0%BA%D0%B0.jpg',
      name: 'Demo',
      members: ['You', 'Person1', 'Person2']
    }
  }
};

FamilyChoice.propTypes = {
  families: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // families: state.families.family,
  families: state.families,

});

export default connect(mapStateToProps)(FamilyChoice);
