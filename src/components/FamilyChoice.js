import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { fetchCurrentUser } from '../actions/current-user';
import { switchFamily } from '../actions/family';
import { fetchMessages } from '../actions/messages';


const serverUrl = process.env.REACT_APP_SERVER_URL;

class FamilyChoice extends Component {
  constructor(props) {
    super(props);

    this.selectFamily = this.selectFamily.bind(this);
    this.createFamily = this.createFamily.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser());
  }

  selectFamily(familyId, familyMembers) {
    const membersObj = {};

    familyMembers.forEach((member) => {
      membersObj[member._id] = member;
    });

    this.props.dispatch(switchFamily(familyId, membersObj));
    this.props.dispatch(fetchMessages(familyId));
    hashHistory.push('/app');
  }

  createFamily() {
    console.log('ready for form popout');
  }

  render() {
    return (
      <div>
        <div className="navButton" >
          <p className="navTitle">
            <a href={`${serverUrl}/auth/logout`}>
              Logout
            </a>
          </p>
        </div>
        <div className="familiesContainer" >
          {
            this.props.families.map(family => (
              <div
                className="familyContainer"
                key={family._id}
                onClick={() => this.selectFamily(family._id, family.members)}
              >
                <img
                  src={family.avatar}
                  alt="avatar"
                  style={{ maxWidth: '5%', borderRadius: '50%' }}
                />
                <div className="familyNamesContainer">
                  <div>
                    {family.name}
                  </div>
                  <div>
                    {family.members.map(member => <span key={member._id}>{`${member.nickname}, `}</span>)
                  }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="familyContainer">
          <img
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSS7tLRutVL3cSVqtulqbDXwVdmpD3MCyJh2k2zWVogovBy1nC_"
            alt="avatar"
            style={{ maxWidth: '5%', borderRadius: '50%' }}
          />
          <div className="familyNamesContainer">
            <div onClick={this.createFamily}>
              Create a New Family
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FamilyChoice.defaultProps = {
};

FamilyChoice.propTypes = {
  families: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  families: state.currentUser.families,
});

export default connect(mapStateToProps)(FamilyChoice);
