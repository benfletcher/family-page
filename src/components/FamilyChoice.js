import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import { fetchCurrentUser } from '../actions/current-user';
import { switchFamily } from '../actions/family';


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

  selectFamily(id) {
    this.props.dispatch(switchFamily(id));
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
                onClick={() => this.selectFamily(family._id)}
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
