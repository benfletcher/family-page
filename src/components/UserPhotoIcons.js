import React from 'react';


const UserPhotoIcons = props => (
  <ul className="userPhotoIcon" style={{ listStyle: 'none' }}>
    {
      Object.keys(props.members).map(member => (
        <li
          key={props.members[member]._id}
        >
          <img
            src={props.members[member].avatar}
            alt="avatar"
            style={{ maxWidth: '50px', borderRadius: '50%' }}
          />
        </li>
      ))
    }
  </ul>
);

UserPhotoIcons.defaultProps = {
  members: {},
};

UserPhotoIcons.propTypes = {
  members: React.PropTypes.objectOf(React.PropTypes.object),
};

export default UserPhotoIcons;
