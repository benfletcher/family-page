import React from 'react';


const UserPhotoIcons = ({ members }) => (
  <ul className="userPhotoIcon" style={{ listStyle: 'none' }}>
    {
      Object.keys(members).map(memberId => (
        <li
          key={memberId}
        >
          <img
            src={members[memberId].avatar}
            alt="avatar"
            style={{ maxWidth: '75%', borderRadius: '50%' }}
          />
          <span className="userPhotoName">
            {members[memberId].nickname}
          </span>
        </li>
      ))
    }
  </ul>
);

UserPhotoIcons.defaultProps = {
};

UserPhotoIcons.propTypes = {
  members: React.PropTypes.object.isRequired,
};

export default UserPhotoIcons;
